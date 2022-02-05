"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isExportSvgAction = exports.ExportSvgAction = exports.isSetDirtyStateAction = exports.DirtyStateChangeReason = exports.SetDirtyStateAction = exports.isSaveModelAction = exports.SaveModelAction = void 0;
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
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
class SaveModelAction {
    constructor(fileUri, kind = SaveModelAction.KIND) {
        this.fileUri = fileUri;
        this.kind = kind;
    }
}
exports.SaveModelAction = SaveModelAction;
SaveModelAction.KIND = 'saveModel';
function isSaveModelAction(action) {
    return base_protocol_1.isActionKind(action, SaveModelAction.KIND);
}
exports.isSaveModelAction = isSaveModelAction;
class SetDirtyStateAction {
    constructor(isDirty, reason, kind = SetDirtyStateAction.KIND) {
        this.isDirty = isDirty;
        this.reason = reason;
        this.kind = kind;
    }
}
exports.SetDirtyStateAction = SetDirtyStateAction;
SetDirtyStateAction.KIND = 'setDirtyState';
var DirtyStateChangeReason;
(function (DirtyStateChangeReason) {
    DirtyStateChangeReason.OPERATION = 'operation';
    DirtyStateChangeReason.UNDO = 'undo';
    DirtyStateChangeReason.REDO = 'redo';
    DirtyStateChangeReason.SAVE = 'save';
    DirtyStateChangeReason.EXTERNAL = 'external';
})(DirtyStateChangeReason = exports.DirtyStateChangeReason || (exports.DirtyStateChangeReason = {}));
function isSetDirtyStateAction(action) {
    return base_protocol_1.isActionKind(action, SetDirtyStateAction.KIND) && typeguard_util_1.isBoolean(action, 'isDirty');
}
exports.isSetDirtyStateAction = isSetDirtyStateAction;
class ExportSvgAction {
    constructor(svg, responseId = '') {
        this.svg = svg;
        this.responseId = responseId;
        this.kind = ExportSvgAction.KIND;
    }
}
exports.ExportSvgAction = ExportSvgAction;
ExportSvgAction.KIND = 'exportSvg';
function isExportSvgAction(action) {
    return base_protocol_1.isActionKind(action, ExportSvgAction.KIND) && typeguard_util_1.isString(action, 'svg');
}
exports.isExportSvgAction = isExportSvgAction;
//# sourceMappingURL=model-saving.js.map