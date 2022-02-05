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
import { Action, ComputedBoundsAction, GLSPClient, ServerMessageAction, SetEditModeAction } from '@eclipse-glsp/protocol';
import { ActionHandlerRegistry, ActionMessage, DiagramServer, ICommand } from 'sprotty';
import { SourceUriAware } from '../base/source-uri-aware';
export declare class GLSPDiagramServer extends DiagramServer implements SourceUriAware {
    protected _sourceUri: string;
    protected _glspClient?: GLSPClient;
    protected ready: boolean;
    connect(client: GLSPClient): Promise<GLSPClient>;
    get glspClient(): GLSPClient | undefined;
    protected sendMessage(message: ActionMessage): void;
    initialize(registry: ActionHandlerRegistry): void;
    handle(action: Action): void | ICommand | Action;
    handleLocally(action: Action): boolean;
    protected handleServerMessageAction(action: ServerMessageAction): boolean;
    protected handleComputedBounds(_action: ComputedBoundsAction): boolean;
    protected handleSetEditModeAction(action: SetEditModeAction): boolean;
    getSourceURI(): string;
}
export declare function isReceivedFromServer(action: Action): boolean;
export declare function registerDefaultGLSPServerActions(registry: ActionHandlerRegistry, diagramServer: DiagramServer): void;
//# sourceMappingURL=glsp-diagram-server.d.ts.map