"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const client_1 = require("@eclipse-glsp/client");
const protocol_1 = require("@eclipse-glsp/protocol");
const path_1 = require("path");
const sprotty_1 = require("sprotty");
const di_config_1 = require("./di.config");
const port = 8081;
const id = 'workflow';
const diagramType = 'workflow-diagram';
const websocket = new WebSocket(`ws://localhost:${port}/${id}`);
const loc = window.location.pathname;
const currentDir = loc.substring(0, loc.lastIndexOf('/'));
const examplePath = path_1.resolve(path_1.join(currentDir, '..', 'app', 'example1.wf'));
const clientId = protocol_1.ApplicationIdProvider.get() + '_' + examplePath;
const container = di_config_1.default();
const diagramServer = container.get(sprotty_1.TYPES.ModelSource);
diagramServer.clientId = clientId;
websocket.onopen = () => {
    const connectionProvider = protocol_1.JsonrpcGLSPClient.createWebsocketConnectionProvider(websocket);
    const glspClient = new protocol_1.BaseJsonrpcGLSPClient({ id, connectionProvider });
    initialize(glspClient);
};
async function initialize(client) {
    await diagramServer.connect(client);
    const result = await client.initializeServer({
        applicationId: protocol_1.ApplicationIdProvider.get(),
        protocolVersion: protocol_1.GLSPClient.protocolVersion
    });
    await client_1.configureServerActions(result, diagramType, container);
    const actionDispatcher = container.get(sprotty_1.TYPES.IActionDispatcher);
    await client.initializeClientSession({ clientSessionId: diagramServer.clientId, diagramType });
    actionDispatcher.dispatch(new sprotty_1.RequestModelAction({
        sourceUri: `file://${examplePath}`,
        diagramType
    }));
    actionDispatcher.dispatch(new client_1.RequestTypeHintsAction());
    actionDispatcher.dispatch(new client_1.EnableToolPaletteAction());
}
websocket.onerror = ev => alert('Connection to server errored. Please make sure that the server is running');
//# sourceMappingURL=app.js.map