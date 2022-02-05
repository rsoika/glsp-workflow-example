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
import { ActionMessage } from 'sprotty';
import { Message, MessageConnection } from 'vscode-ws-jsonrpc';
import { ActionMessageHandler, ClientState, DisposeClientSessionParameters, GLSPClient, InitializeClientSessionParameters, InitializeParameters, InitializeResult } from '../glsp-client';
import { ConnectionProvider, JsonrpcGLSPClient } from './glsp-jsonrpc-client';
export declare class BaseJsonrpcGLSPClient implements GLSPClient {
    readonly id: string;
    protected readonly connectionProvider: ConnectionProvider;
    protected connectionPromise?: Promise<MessageConnection>;
    protected resolvedConnection?: MessageConnection;
    protected state: ClientState;
    protected onStop?: Promise<void>;
    constructor(options: JsonrpcGLSPClient.Options);
    shutdownServer(): void;
    initializeServer(params: InitializeParameters): Promise<InitializeResult>;
    initializeClientSession(params: InitializeClientSessionParameters): Promise<void>;
    disposeClientSession(params: DisposeClientSessionParameters): Promise<void>;
    onActionMessage(handler: ActionMessageHandler): void;
    sendActionMessage(message: ActionMessage): void;
    protected checkConnectionState(): boolean;
    start(): Promise<void>;
    stop(): Promise<void>;
    private resolveConnection;
    protected doCreateConnection(): Promise<MessageConnection>;
    protected handleConnectionError(error: Error, message: Message, count: number): void;
    protected handleConnectionClosed(): void;
    protected isConnectionActive(): boolean;
    get currentState(): ClientState;
}
//# sourceMappingURL=base-jsonrpc-glsp-client.d.ts.map