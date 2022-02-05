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
import { ClipboardData } from '@eclipse-glsp/protocol';
import { ViewerOptions } from 'sprotty';
import { GLSPActionDispatcher } from '../../base/action-dispatcher';
import { EditorContextService } from '../../base/editor-context-service';
export interface ICopyPasteHandler {
    handleCopy(event: ClipboardEvent): void;
    handleCut(event: ClipboardEvent): void;
    handlePaste(event: ClipboardEvent): void;
}
export interface IAsyncClipboardService {
    clear(): void;
    put(data: ClipboardData, id?: string): void;
    get(id?: string): ClipboardData | undefined;
}
/**
 * A local implementation of the async clipboard interface.
 *
 * This implementation just stores the clipboard data in memory, but not in the clipboard.
 * This implementation can be used if you don't need to support cross-widget/browser/application
 * data transfer and you would like to avoid to require the permission of the user for accessing the
 * system clipboard asynchronously.
 *
 * In order to detect whether the user copied something else since we recorded the clipboard data
 * we put a uuid into the system clipboard synchronously. If on paste this ID has changed or is not
 * available anymore, we know that the user copied in another application or context, so we shouldn't
 * paste what we have stored locally and just return undefined.
 *
 * Real async clipboard service implementations can just ignore the ID that is passed and rely on the
 * system clipboard's content instead.
 */
export declare class LocalClipboardService implements IAsyncClipboardService {
    protected currentId?: string;
    protected data?: ClipboardData;
    clear(): void;
    put(data: ClipboardData, id: string): void;
    get(id?: string): ClipboardData | undefined;
}
export declare class ServerCopyPasteHandler implements ICopyPasteHandler {
    protected actionDispatcher: GLSPActionDispatcher;
    protected viewerOptions: ViewerOptions;
    protected clipboadService: IAsyncClipboardService;
    protected editorContext: EditorContextService;
    handleCopy(event: ClipboardEvent): void;
    handleCut(event: ClipboardEvent): void;
    handlePaste(event: ClipboardEvent): void;
    protected shouldCopy(_event: ClipboardEvent): boolean | null;
    protected shouldPaste(_event: ClipboardEvent): boolean | null;
    private isDiagramActive;
}
//# sourceMappingURL=copy-paste-handler.d.ts.map