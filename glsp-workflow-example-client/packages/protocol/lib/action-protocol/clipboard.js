"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isPasteOperation = exports.PasteOperation = exports.isCutOperation = exports.CutOperation = exports.isSetClipboardDataAction = exports.SetClipboardDataAction = exports.isRequestClipboardDataAction = exports.RequestClipboardDataAction = void 0;
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
/**
 * Requests the clipboard data for the current editor context, i.e., the selected elements, in a clipboard-compatible format.
 */
class RequestClipboardDataAction {
    constructor(editorContext, requestId = base_protocol_1.generateRequestId(), kind = RequestClipboardDataAction.KIND) {
        this.editorContext = editorContext;
        this.requestId = requestId;
        this.kind = kind;
    }
    static create(editorContext) {
        return new RequestClipboardDataAction(editorContext);
    }
}
exports.RequestClipboardDataAction = RequestClipboardDataAction;
RequestClipboardDataAction.KIND = 'requestClipboardData';
function isRequestClipboardDataAction(action) {
    return base_protocol_1.isActionKind(action, RequestClipboardDataAction.KIND) && typeguard_util_1.isObject(action, 'editorContext') && typeguard_util_1.isString(action, 'requestId');
}
exports.isRequestClipboardDataAction = isRequestClipboardDataAction;
/**
 * Server response to a {@link RequestClipboardDataAction} containing the selected elements as clipboard-compatible format.
 */
class SetClipboardDataAction {
    constructor(clipboardData, responseId = '', kind = SetClipboardDataAction.KIND) {
        this.clipboardData = clipboardData;
        this.responseId = responseId;
        this.kind = kind;
    }
}
exports.SetClipboardDataAction = SetClipboardDataAction;
SetClipboardDataAction.KIND = 'setClipboardData';
function isSetClipboardDataAction(action) {
    return base_protocol_1.isActionKind(action, SetClipboardDataAction.KIND) && typeguard_util_1.isObject(action, 'clipboardData') && typeguard_util_1.isString(action, 'responseId');
}
exports.isSetClipboardDataAction = isSetClipboardDataAction;
/**
 * Requests a cut operation from the server, i.e., deleting the selected elements from the model. Before submitting a `CutOperation`
 * a client should ensure that the cut elements are put into the clipboard.
 */
class CutOperation {
    constructor(editorContext, kind = CutOperation.KIND) {
        this.editorContext = editorContext;
        this.kind = kind;
    }
}
exports.CutOperation = CutOperation;
CutOperation.KIND = 'cut';
function isCutOperation(action) {
    return base_protocol_1.isActionKind(action, CutOperation.KIND) && typeguard_util_1.isObject(action, 'editorContext');
}
exports.isCutOperation = isCutOperation;
/**
 * Requests a paste operation from the server by providing the current clipboard data. Typically this means that elements should be created
 *  based on the data in the clipboard.
 */
class PasteOperation {
    constructor(clipboardData, editorContext, kind = PasteOperation.KIND) {
        this.clipboardData = clipboardData;
        this.editorContext = editorContext;
        this.kind = kind;
    }
}
exports.PasteOperation = PasteOperation;
PasteOperation.KIND = 'paste';
function isPasteOperation(action) {
    return base_protocol_1.isActionKind(action, PasteOperation.KIND) && typeguard_util_1.isObject(action, 'clipboardData') && typeguard_util_1.isObject(action, 'editorContext');
}
exports.isPasteOperation = isPasteOperation;
//# sourceMappingURL=clipboard.js.map