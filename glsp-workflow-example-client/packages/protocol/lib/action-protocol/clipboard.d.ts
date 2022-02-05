/********************************************************************************
 * Copyright (c) 2021 STMicroelectronics and others.
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
import { Operation, RequestAction, ResponseAction } from './base-protocol';
import { EditorContext } from './types';
/**
 * Requests the clipboard data for the current editor context, i.e., the selected elements, in a clipboard-compatible format.
 */
export declare class RequestClipboardDataAction implements RequestAction<SetClipboardDataAction> {
    readonly editorContext: EditorContext;
    readonly requestId: string;
    readonly kind: string;
    static readonly KIND = "requestClipboardData";
    constructor(editorContext: EditorContext, requestId?: string, kind?: string);
    static create(editorContext: EditorContext): RequestAction<SetClipboardDataAction>;
}
export declare function isRequestClipboardDataAction(action: any): action is RequestClipboardDataAction;
/**
 * Server response to a {@link RequestClipboardDataAction} containing the selected elements as clipboard-compatible format.
 */
export declare class SetClipboardDataAction implements ResponseAction {
    readonly clipboardData: ClipboardData;
    readonly responseId: string;
    readonly kind: string;
    static readonly KIND = "setClipboardData";
    constructor(clipboardData: ClipboardData, responseId?: string, kind?: string);
}
export declare function isSetClipboardDataAction(action: any): action is SetClipboardDataAction;
/**
 * Requests a cut operation from the server, i.e., deleting the selected elements from the model. Before submitting a `CutOperation`
 * a client should ensure that the cut elements are put into the clipboard.
 */
export declare class CutOperation implements Operation {
    readonly editorContext: EditorContext;
    readonly kind: string;
    static readonly KIND = "cut";
    constructor(editorContext: EditorContext, kind?: string);
}
export declare function isCutOperation(action: any): action is CutOperation;
/**
 * Requests a paste operation from the server by providing the current clipboard data. Typically this means that elements should be created
 *  based on the data in the clipboard.
 */
export declare class PasteOperation implements Operation {
    readonly clipboardData: ClipboardData;
    readonly editorContext: EditorContext;
    readonly kind: string;
    static readonly KIND = "paste";
    constructor(clipboardData: ClipboardData, editorContext: EditorContext, kind?: string);
}
export declare function isPasteOperation(action: any): action is PasteOperation;
export interface ClipboardData {
    [format: string]: string;
}
//# sourceMappingURL=clipboard.d.ts.map