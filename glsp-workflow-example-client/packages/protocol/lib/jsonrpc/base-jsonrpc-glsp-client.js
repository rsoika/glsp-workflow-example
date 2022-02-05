"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseJsonrpcGLSPClient = void 0;
const glsp_client_1 = require("../glsp-client");
const glsp_jsonrpc_client_1 = require("./glsp-jsonrpc-client");
class BaseJsonrpcGLSPClient {
    constructor(options) {
        Object.assign(this, options);
        this.state = glsp_client_1.ClientState.Initial;
    }
    shutdownServer() {
        if (this.checkConnectionState()) {
            this.resolvedConnection.sendNotification(glsp_jsonrpc_client_1.JsonrpcGLSPClient.ShutdownNotification);
        }
    }
    initializeServer(params) {
        if (this.checkConnectionState()) {
            return this.resolvedConnection.sendRequest(glsp_jsonrpc_client_1.JsonrpcGLSPClient.InitializeRequest, params);
        }
        return Promise.reject(glsp_jsonrpc_client_1.JsonrpcGLSPClient.ClientNotReadyMsg);
    }
    initializeClientSession(params) {
        if (this.checkConnectionState()) {
            return this.resolvedConnection.sendRequest(glsp_jsonrpc_client_1.JsonrpcGLSPClient.InitializeClientSessionRequest, params);
        }
        return Promise.reject(glsp_jsonrpc_client_1.JsonrpcGLSPClient.ClientNotReadyMsg);
    }
    disposeClientSession(params) {
        if (this.checkConnectionState()) {
            return this.resolvedConnection.sendRequest(glsp_jsonrpc_client_1.JsonrpcGLSPClient.DisposeClientSessionRequest, params);
        }
        return Promise.reject(glsp_jsonrpc_client_1.JsonrpcGLSPClient.ClientNotReadyMsg);
    }
    onActionMessage(handler) {
        if (this.checkConnectionState()) {
            this.resolvedConnection.onNotification(glsp_jsonrpc_client_1.JsonrpcGLSPClient.ActionMessageNotification, handler);
        }
    }
    sendActionMessage(message) {
        if (this.checkConnectionState()) {
            this.resolvedConnection.sendNotification(glsp_jsonrpc_client_1.JsonrpcGLSPClient.ActionMessageNotification, message);
        }
    }
    checkConnectionState() {
        if (!this.isConnectionActive()) {
            throw new Error(glsp_jsonrpc_client_1.JsonrpcGLSPClient.ClientNotReadyMsg);
        }
        return true;
    }
    async start() {
        try {
            this.state = glsp_client_1.ClientState.Starting;
            const connection = await this.resolveConnection();
            connection.listen();
            this.resolvedConnection = connection;
            this.state = glsp_client_1.ClientState.Running;
        }
        catch (error) {
            glsp_jsonrpc_client_1.JsonrpcGLSPClient.error('Failed to start connection to server', error);
            this.state = glsp_client_1.ClientState.StartFailed;
        }
    }
    stop() {
        if (!this.connectionPromise) {
            this.state = glsp_client_1.ClientState.Stopped;
            return Promise.resolve();
        }
        if (this.state === glsp_client_1.ClientState.Stopping && this.onStop) {
            return this.onStop;
        }
        this.state = glsp_client_1.ClientState.Stopping;
        return (this.onStop = this.resolveConnection().then(connection => {
            connection.dispose();
            this.state = glsp_client_1.ClientState.Stopped;
            this.onStop = undefined;
            this.connectionPromise = undefined;
            this.resolvedConnection = undefined;
        }));
    }
    resolveConnection() {
        if (!this.connectionPromise) {
            this.connectionPromise = this.doCreateConnection();
        }
        return this.connectionPromise;
    }
    async doCreateConnection() {
        const connection = typeof this.connectionProvider === 'function' ? await this.connectionProvider() : this.connectionProvider;
        connection.onError((data) => this.handleConnectionError(data[0], data[1], data[2]));
        connection.onClose(() => this.handleConnectionClosed());
        return connection;
    }
    handleConnectionError(error, message, count) {
        glsp_jsonrpc_client_1.JsonrpcGLSPClient.error('Connection to server is erroring. Shutting down server.', error);
        this.stop();
        this.state = glsp_client_1.ClientState.ServerError;
    }
    handleConnectionClosed() {
        if (this.state === glsp_client_1.ClientState.Stopping || this.state === glsp_client_1.ClientState.Stopped) {
            return;
        }
        try {
            if (this.resolvedConnection) {
                this.resolvedConnection.dispose();
                this.connectionPromise = undefined;
                this.resolvedConnection = undefined;
            }
        }
        catch (error) {
            // Disposing a connection could fail if error cases.
        }
        glsp_jsonrpc_client_1.JsonrpcGLSPClient.error('Connection to server got closed. Server will not be restarted.');
        this.state = glsp_client_1.ClientState.ServerError;
    }
    isConnectionActive() {
        return this.state === glsp_client_1.ClientState.Running && !!this.resolvedConnection;
    }
    get currentState() {
        return this.state;
    }
}
exports.BaseJsonrpcGLSPClient = BaseJsonrpcGLSPClient;
//# sourceMappingURL=base-jsonrpc-glsp-client.js.map