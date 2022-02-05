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
exports.NavigationTargetResolver = void 0;
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
/**
 * Resolves `NavigationTargets` to element ids.
 *
 * If the `NavigationTarget` doesn't have element ids itself, this resolver queries the server via a
 * `ResolveNavigationTargetAction` for element ids.
 */
let NavigationTargetResolver = class NavigationTargetResolver {
    async resolve(navigationTarget) {
        const contextService = await this.editorContextService();
        const sourceUri = await contextService.getSourceUri();
        return this.resolveWithSourceUri(sourceUri, navigationTarget);
    }
    async resolveWithSourceUri(sourceUri, target) {
        const targetUri = decodeURIComponent(target.uri);
        if (sourceUri && sourceUri !== targetUri && `file://${sourceUri}` !== targetUri) {
            // different URI, so we can't resolve it locally
            this.logger.info("Source and Target URI are different. Can't resolve locally.", sourceUri, targetUri);
            return undefined;
        }
        if (protocol_1.NavigationTarget.getElementIds(target).length > 0) {
            return new protocol_1.SetResolvedNavigationTargetAction(protocol_1.NavigationTarget.getElementIds(target));
        }
        const response = await this.requestResolution(target);
        if (protocol_1.isSetResolvedNavigationTargets(response)) {
            return response;
        }
        return undefined;
    }
    requestResolution(target) {
        return this.dispatcher.request(new protocol_1.ResolveNavigationTargetAction(target));
    }
};
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IEditorContextServiceProvider),
    __metadata("design:type", Function)
], NavigationTargetResolver.prototype, "editorContextService", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcher),
    __metadata("design:type", Object)
], NavigationTargetResolver.prototype, "dispatcher", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ILogger),
    __metadata("design:type", Object)
], NavigationTargetResolver.prototype, "logger", void 0);
NavigationTargetResolver = __decorate([
    inversify_1.injectable()
], NavigationTargetResolver);
exports.NavigationTargetResolver = NavigationTargetResolver;
//# sourceMappingURL=navigation-target-resolver.js.map