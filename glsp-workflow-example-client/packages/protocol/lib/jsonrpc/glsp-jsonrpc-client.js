"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonrpcGLSPClient = void 0;
const vscode_jsonrpc_1 = require("vscode-jsonrpc");
const vscode_ws_jsonrpc_1 = require("vscode-ws-jsonrpc");
const glsp_client_1 = require("../glsp-client");
var JsonrpcGLSPClient;
(function (JsonrpcGLSPClient) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function isOptions(object) {
        return glsp_client_1.GLSPClient.isOptions(object) && 'connectionProvider' in object;
    }
    JsonrpcGLSPClient.isOptions = isOptions;
    JsonrpcGLSPClient.ActionMessageNotification = new vscode_jsonrpc_1.NotificationType('process');
    JsonrpcGLSPClient.InitializeRequest = new vscode_jsonrpc_1.RequestType('initialize');
    JsonrpcGLSPClient.InitializeClientSessionRequest = new vscode_jsonrpc_1.RequestType('initializeClientSession');
    JsonrpcGLSPClient.DisposeClientSessionRequest = new vscode_jsonrpc_1.RequestType('disposeClientSession');
    JsonrpcGLSPClient.ShutdownNotification = new vscode_ws_jsonrpc_1.NotificationType0('shutdown');
    JsonrpcGLSPClient.ClientNotReadyMsg = 'JsonrpcGLSPClient is not ready yet';
    function createWebsocketConnectionProvider(websocket, logger) {
        const socket = vscode_ws_jsonrpc_1.toSocket(websocket);
        const reader = new vscode_ws_jsonrpc_1.WebSocketMessageReader(socket);
        const writer = new vscode_ws_jsonrpc_1.WebSocketMessageWriter(socket);
        return vscode_ws_jsonrpc_1.createMessageConnection(reader, writer, logger);
    }
    JsonrpcGLSPClient.createWebsocketConnectionProvider = createWebsocketConnectionProvider;
    function error(message, ...optionalParams) {
        console.error(`[JsonrpcGLSPClient] ${message}`, optionalParams);
    }
    JsonrpcGLSPClient.error = error;
})(JsonrpcGLSPClient = exports.JsonrpcGLSPClient || (exports.JsonrpcGLSPClient = {}));
//# sourceMappingURL=glsp-jsonrpc-client.js.map