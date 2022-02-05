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
exports.ServerCommandPaletteActionProvider = exports.ServerCommandPalette = void 0;
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
const action_dispatcher_1 = require("../../base/action-dispatcher");
const editor_context_service_1 = require("../../base/editor-context-service");
var ServerCommandPalette;
(function (ServerCommandPalette) {
    ServerCommandPalette.CONTEXT_ID = 'command-palette';
    ServerCommandPalette.TEXT = 'text';
    ServerCommandPalette.INDEX = 'index';
})(ServerCommandPalette = exports.ServerCommandPalette || (exports.ServerCommandPalette = {}));
let ServerCommandPaletteActionProvider = class ServerCommandPaletteActionProvider {
    getActions(_root, text, _lastMousePosition, index) {
        const requestAction = new protocol_1.RequestContextActions(ServerCommandPalette.CONTEXT_ID, this.editorContext.get({
            [ServerCommandPalette.TEXT]: text,
            [ServerCommandPalette.INDEX]: index ? index : 0
        }));
        return this.actionDispatcher.requestUntil(requestAction).then(response => this.getPaletteActionsFromResponse(response));
    }
    getPaletteActionsFromResponse(action) {
        if (protocol_1.isSetContextActionsAction(action)) {
            return action.actions;
        }
        return [];
    }
};
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcher),
    __metadata("design:type", action_dispatcher_1.GLSPActionDispatcher)
], ServerCommandPaletteActionProvider.prototype, "actionDispatcher", void 0);
__decorate([
    inversify_1.inject(editor_context_service_1.EditorContextService),
    __metadata("design:type", editor_context_service_1.EditorContextService)
], ServerCommandPaletteActionProvider.prototype, "editorContext", void 0);
ServerCommandPaletteActionProvider = __decorate([
    inversify_1.injectable()
], ServerCommandPaletteActionProvider);
exports.ServerCommandPaletteActionProvider = ServerCommandPaletteActionProvider;
//# sourceMappingURL=server-command-palette-provider.js.map