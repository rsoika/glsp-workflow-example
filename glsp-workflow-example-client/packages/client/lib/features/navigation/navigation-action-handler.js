"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavigationActionHandler = exports.isProcessNavigationArgumentsAction = exports.ProcessNavigationArgumentsAction = exports.isNavigateAction = exports.NavigateAction = void 0;
/********************************************************************************
 * Copyright (c) 2020-2021 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
const protocol_1 = require("@eclipse-glsp/protocol");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const types_1 = require("../../base/types");
const navigation_target_resolver_1 = require("./navigation-target-resolver");
/**
 * Action for triggering a navigation of a certain target type.
 *
 * Examples for target types could be `documentation`, `implementation`, etc.
 * but this is up to the domain-specific diagram implementation to decide.
 * Such an action will eventually trigger a `RequestNavigationTargetsAction`
 * (see `NavigationActionHandler`) in order to request the navigation targets
 * from the server.
 *
 * This action is typically triggered by a user action.
 */
class NavigateAction {
    constructor(targetTypeId, args) {
        this.targetTypeId = targetTypeId;
        this.args = args;
        this.kind = NavigateAction.KIND;
    }
}
exports.NavigateAction = NavigateAction;
NavigateAction.KIND = 'navigate';
function isNavigateAction(action) {
    return action !== undefined && action.kind === NavigateAction.KIND && action.targetTypeId !== undefined;
}
exports.isNavigateAction = isNavigateAction;
/** Action to trigger the processing of additional navigation arguments.
 *
 * The resolution of a `NavigationTarget` may entail additional arguments. In this case, this action is
 * triggered allowing the client to react to those arguments. The default `NavigationActionHandler` will
 * only process the arguments' keys `info`, `warning`, and `error` to present them to the user.
 * Customizations, however, may add domain-specific arguments and register custom handler to also process
 * other arguments and trigger some additional behavior (e.g. update other views, etc.).
 */
class ProcessNavigationArgumentsAction {
    constructor(args) {
        this.args = args;
        this.kind = ProcessNavigationArgumentsAction.KIND;
    }
}
exports.ProcessNavigationArgumentsAction = ProcessNavigationArgumentsAction;
ProcessNavigationArgumentsAction.KIND = 'processNavigationArguments';
function isProcessNavigationArgumentsAction(action) {
    return (action !== undefined &&
        action.kind === ProcessNavigationArgumentsAction.KIND &&
        action.args !== undefined);
}
exports.isProcessNavigationArgumentsAction = isProcessNavigationArgumentsAction;
/**
 * Default handler for all actions that are related to the navigation.
 *
 * For a `NavigateAction` this handler triggers a `RequestNavigationTargetAction` to obtain the actual
 * navigation targets for the navigation type that is specified in the `NavigateAction`.
 * Once the navigation targets are available, it will trigger a `NavigateToTargetAction` to actually
 * perform the navigation.
 *
 * In other scenarios, clients may also trigger the `NavigateToTargetAction` directly, e.g. when opening
 * the diagram.
 *
 * Depending on the URI and arguments of the navigation target we may encounter three cases:
 *   *(a)* the navigation target already specifies element IDs, in which case this action handler navigates
 *         to the specified elements directly, by the selecting them and centering them in the viewport.
 *   *(b)* the arguments of the navigation targets don't contain element IDs, but other arguments, the
 *         navigation target needs to be resolved into actual elment IDs by the `NavigationTargetResolver`.
 *         This can for instance be useful, if the navigation deals with queries or some other more complex
 *         logic that can't be dealt with on the client.
 *  *(c)* the target isn't resolved by the `NavigationTargetResolver`, e.g. because the `uri` doesn't match
 *        the URI of the current diagram. In this case, the navigation request is forwarded by dispatching
 *        a `NavigateToExternalTargetAction`.
 */
let NavigationActionHandler = class NavigationActionHandler {
    constructor() {
        this.notificationTimeout = 5000;
    }
    handle(action) {
        if (isNavigateAction(action)) {
            this.handleNavigateAction(action);
        }
        else if (protocol_1.isNavigateToTargetAction(action)) {
            this.handleNavigateToTarget(action);
        }
        else if (isProcessNavigationArgumentsAction(action)) {
            this.processNavigationArguments(action.args);
        }
        else if (protocol_1.isNavigateToExternalTargetAction(action)) {
            this.handleNavigateToExternalTarget(action);
        }
    }
    async handleNavigateAction(action) {
        try {
            const editorContextService = await this.editorContextService();
            const context = editorContextService.get(action.args);
            const response = await this.dispatcher.request(new protocol_1.RequestNavigationTargetsAction(action.targetTypeId, context));
            if (protocol_1.isSetNavigationTargetsAction(response) && response.targets && response.targets.length === 1) {
                if (response.targets.length > 1) {
                    this.logger.warn(this, 'Processing of multiple targets is not supported yet. ' + 'Only the first is being processed.', response.targets);
                }
                return this.dispatcher.dispatch(new protocol_1.NavigateToTargetAction(response.targets[0]));
            }
            this.warnAboutFailedNavigation('No valid navigation target found');
        }
        catch (reason) {
            this.logger.error(this, 'Failed to obtain navigation target', reason, action);
        }
    }
    async handleNavigateToTarget(action) {
        try {
            const resolvedElements = await this.resolveElements(action);
            if (this.containsElementIdsOrArguments(resolvedElements)) {
                this.navigateTo(resolvedElements);
                this.handleResolutionArguments(resolvedElements);
                return;
            }
            else {
                this.navigateToExternal(action.target);
                return;
            }
        }
        catch (reason) {
            this.logger.error(this, 'Failed to navigate', reason, action);
        }
    }
    resolveElements(action) {
        return this.resolver.resolve(action.target);
    }
    containsElementIdsOrArguments(target) {
        return target !== undefined && (this.containsElementIds(target.elementIds) || this.containsArguments(target.args));
    }
    containsElementIds(elementIds) {
        return elementIds !== undefined && elementIds.length > 0;
    }
    containsArguments(args) {
        return args !== undefined && args !== undefined && Object.keys(args).length > 0;
    }
    navigateTo(target) {
        const elementIds = target.elementIds;
        if (!this.containsElementIds(elementIds)) {
            return;
        }
        this.dispatcher.dispatchAll([new protocol_1.SelectAllAction(false), new protocol_1.SelectAction(elementIds), new protocol_1.CenterAction(elementIds)]);
    }
    handleResolutionArguments(target) {
        const args = target.args;
        if (!this.containsArguments(args)) {
            return;
        }
        this.dispatcher.dispatch(new ProcessNavigationArgumentsAction(args));
    }
    navigateToExternal(target) {
        return this.dispatcher.dispatch(new protocol_1.NavigateToExternalTargetAction(target));
    }
    processNavigationArguments(args) {
        if (args.info && args.info.toString().length > 0) {
            this.notify('INFO', args.info.toString());
        }
        if (args.warning && args.warning.toString().length > 0) {
            this.notify('WARNING', args.warning.toString());
        }
        if (args.error && args.error.toString().length > 0) {
            this.notify('ERROR', args.error.toString());
        }
    }
    async handleNavigateToExternalTarget(action) {
        const registry = await this.actionHandlerRegistryProvider();
        const handlers = registry.get(protocol_1.NavigateToExternalTargetAction.KIND);
        if (handlers.length === 1) {
            // we are the only handler so we know nobody took care of it
            this.warnAboutFailedNavigation('Could not resolve or navigate to target', action.target);
        }
    }
    warnAboutFailedNavigation(msg, target) {
        const message = `${msg}` + (target ? `: '${target.uri}' (arguments: ${JSON.stringify(target.args)})` : '');
        this.logger.warn(this, msg, target);
        this.notify('WARNING', message);
    }
    notify(severity, message) {
        const timeout = this.notificationTimeout;
        this.dispatcher.dispatchAll([
            { kind: protocol_1.GLSPServerStatusAction.KIND, severity, timeout, message },
            { kind: protocol_1.ServerMessageAction.KIND, severity, timeout, message }
        ]);
    }
};
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ILogger),
    __metadata("design:type", Object)
], NavigationActionHandler.prototype, "logger", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcher),
    __metadata("design:type", Object)
], NavigationActionHandler.prototype, "dispatcher", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ActionHandlerRegistryProvider),
    __metadata("design:type", Function)
], NavigationActionHandler.prototype, "actionHandlerRegistryProvider", void 0);
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IEditorContextServiceProvider),
    __metadata("design:type", Function)
], NavigationActionHandler.prototype, "editorContextService", void 0);
__decorate([
    inversify_1.inject(navigation_target_resolver_1.NavigationTargetResolver),
    __metadata("design:type", navigation_target_resolver_1.NavigationTargetResolver)
], NavigationActionHandler.prototype, "resolver", void 0);
NavigationActionHandler = __decorate([
    inversify_1.injectable()
], NavigationActionHandler);
exports.NavigationActionHandler = NavigationActionHandler;
//# sourceMappingURL=navigation-action-handler.js.map