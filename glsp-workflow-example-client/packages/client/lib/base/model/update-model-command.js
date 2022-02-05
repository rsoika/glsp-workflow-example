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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackAwareUpdateModelCommand = exports.SetModelActionHandler = void 0;
/********************************************************************************
 * Copyright (c) 2019-2021 EclipseSource and others.
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
const model_1 = require("../../features/tool-feedback/model");
const types_1 = require("../types");
/* ActionHandler that transforms a SetModelAction into an (feedback-aware) UpdateModelAction. This can be done because in sprotty
 *  UpdateModel behaves the same as SetModel if no model is present yet.*/
let SetModelActionHandler = class SetModelActionHandler {
    handle(action) {
        if (protocol_1.isSetModelAction(action)) {
            return new protocol_1.UpdateModelAction(action.newRoot, false);
        }
    }
};
SetModelActionHandler = __decorate([
    inversify_1.injectable()
], SetModelActionHandler);
exports.SetModelActionHandler = SetModelActionHandler;
/**
 * A special`UpdateModelCommand` that retrieves all registered `actions` from the `IFeedbackActionDispatcher` (if present) and applies their
 * feedback to the `newRoot` before performing the update
 */
let FeedbackAwareUpdateModelCommand = class FeedbackAwareUpdateModelCommand extends sprotty_1.UpdateModelCommand {
    constructor(action) {
        super(action);
        this.modelRootListeners = [];
    }
    initialize() {
        this.actionHandlerRegistryProvider().then(registry => (this.actionHandlerRegistry = registry));
    }
    performUpdate(oldRoot, newRoot, context) {
        if (this.feedbackActionDispatcher && this.actionHandlerRegistry) {
            // Create a temporary context wich defines the `newRoot` as `root`
            // This way we do not corrupt the redo/undo behavior of the super class
            const tempContext = {
                root: newRoot,
                duration: context.duration,
                logger: context.logger,
                modelChanged: context.modelChanged,
                modelFactory: context.modelFactory,
                syncer: context.syncer
            };
            const feedbackCommands = this.getFeedbackCommands(this.actionHandlerRegistry);
            feedbackCommands.forEach(command => command.execute(tempContext));
        }
        this.modelRootListeners.forEach(listener => listener.modelRootChanged(newRoot));
        return super.performUpdate(oldRoot, newRoot, context);
    }
    getFeedbackCommands(registry) {
        const result = [];
        this.feedbackActionDispatcher.getRegisteredFeedback().forEach(action => {
            const handler = registry.get(action.kind).find(h => h instanceof sprotty_1.CommandActionHandler);
            if (handler instanceof sprotty_1.CommandActionHandler) {
                result.push(handler.handle(action));
            }
        });
        // sort commands descanding by priority
        return result.sort((a, b) => getPriority(b) - getPriority(a));
    }
};
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ILogger),
    __metadata("design:type", Object)
], FeedbackAwareUpdateModelCommand.prototype, "logger", void 0);
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher),
    inversify_1.optional(),
    __metadata("design:type", Object)
], FeedbackAwareUpdateModelCommand.prototype, "feedbackActionDispatcher", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ActionHandlerRegistryProvider),
    __metadata("design:type", Function)
], FeedbackAwareUpdateModelCommand.prototype, "actionHandlerRegistryProvider", void 0);
__decorate([
    inversify_1.multiInject(types_1.GLSP_TYPES.SModelRootListener),
    inversify_1.optional(),
    __metadata("design:type", Array)
], FeedbackAwareUpdateModelCommand.prototype, "modelRootListeners", void 0);
__decorate([
    inversify_1.postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FeedbackAwareUpdateModelCommand.prototype, "initialize", null);
FeedbackAwareUpdateModelCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [protocol_1.UpdateModelAction])
], FeedbackAwareUpdateModelCommand);
exports.FeedbackAwareUpdateModelCommand = FeedbackAwareUpdateModelCommand;
function getPriority(command) {
    if (command instanceof model_1.FeedbackCommand) {
        return command.priority;
    }
    return 0;
}
//# sourceMappingURL=update-model-command.js.map