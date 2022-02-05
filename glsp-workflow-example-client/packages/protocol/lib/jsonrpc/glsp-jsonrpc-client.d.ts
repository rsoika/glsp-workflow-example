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
import { ActionMessage } from 'sprotty';
import { MessageConnection, NotificationType, RequestType } from 'vscode-jsonrpc';
import { Logger, NotificationType0 } from 'vscode-ws-jsonrpc';
import { DisposeClientSessionParameters, GLSPClient, InitializeClientSessionParameters, InitializeParameters, InitializeResult } from '../glsp-client';
export declare type MaybePromise<T> = T | Promise<T> | PromiseLike<T>;
export declare type ConnectionProvider = MessageConnection | (() => MaybePromise<MessageConnection>);
export declare namespace JsonrpcGLSPClient {
    interface Options extends GLSPClient.Options {
        connectionProvider: ConnectionProvider;
    }
    function isOptions(object: any): object is Options;
    const ActionMessageNotification: NotificationType<ActionMessage, void>;
    const InitializeRequest: RequestType<InitializeParameters, InitializeResult, void, void>;
    const InitializeClientSessionRequest: RequestType<InitializeClientSessionParameters, void, void, void>;
    const DisposeClientSessionRequest: RequestType<DisposeClientSessionParameters, void, void, void>;
    const ShutdownNotification: NotificationType0<void>;
    const ClientNotReadyMsg = "JsonrpcGLSPClient is not ready yet";
    function createWebsocketConnectionProvider(websocket: WebSocket, logger?: Logger): ConnectionProvider;
    function error(message: string, ...optionalParams: any[]): void;
}
//# sourceMappingURL=glsp-jsonrpc-client.d.ts.map