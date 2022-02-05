"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerDefaultGLSPServerActions = exports.isReceivedFromServer = exports.GLSPDiagramServer = void 0;
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
const receivedFromServerProperty = '__receivedFromServer';
let GLSPDiagramServer = class GLSPDiagramServer extends sprotty_1.DiagramServer {
    constructor() {
        super(...arguments);
        this.ready = false;
    }
    async connect(client) {
        await client.start();
        client.onActionMessage(message => this.messageReceived(message));
        this._glspClient = client;
        return this._glspClient;
    }
    get glspClient() {
        return this._glspClient;
    }
    sendMessage(message) {
        if (this.glspClient) {
            this.glspClient.sendActionMessage(message);
        }
        else {
            throw new Error('GLSPClient is not connected');
        }
    }
    initialize(registry) {
        registerDefaultGLSPServerActions(registry, this);
        if (!this.clientId) {
            this.clientId = this.viewerOptions.baseDiv;
        }
    }
    handle(action) {
        if (protocol_1.isRequestModelAction(action) && action.options) {
            this._sourceUri = action.options.sourceUri;
        }
        return super.handle(action);
    }
    handleLocally(action) {
        if (protocol_1.isServerMessageAction(action)) {
            return this.handleServerMessageAction(action);
        }
        if (protocol_1.isSetEditModeAction(action)) {
            return this.handleSetEditModeAction(action);
        }
        return super.handleLocally(action);
    }
    handleServerMessageAction(action) {
        this.logger.log('GLSPDiagramServer', `[${action.severity}] -${action.message}`);
        return false;
    }
    handleComputedBounds(_action) {
        return true;
    }
    handleSetEditModeAction(action) {
        return !isReceivedFromServer(action);
    }
    getSourceURI() {
        return this._sourceUri;
    }
};
GLSPDiagramServer = __decorate([
    inversify_1.injectable()
], GLSPDiagramServer);
exports.GLSPDiagramServer = GLSPDiagramServer;
function isReceivedFromServer(action) {
    return action[receivedFromServerProperty] === true;
}
exports.isReceivedFromServer = isReceivedFromServer;
function registerDefaultGLSPServerActions(registry, diagramServer) {
    registry.register(protocol_1.ServerMessageAction.KIND, diagramServer);
    registry.register(sprotty_1.ServerStatusAction.KIND, diagramServer);
    registry.register(protocol_1.ExportSvgAction.KIND, diagramServer);
    // Register an empty handler for SwitchEditMode, to avoid runtime exceptions.
    // We don't support SwitchEditMode, but Sprotty still sends those actions, so ignore them.
    registry.register(sprotty_1.SwitchEditModeCommand.KIND, { handle: action => undefined });
}
exports.registerDefaultGLSPServerActions = registerDefaultGLSPServerActions;
//# sourceMappingURL=glsp-diagram-server.js.map