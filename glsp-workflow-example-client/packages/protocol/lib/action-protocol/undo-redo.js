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
exports.isRedoOperation = exports.RedoOperation = exports.isUndoOperation = exports.UndoOperation = void 0;
const base_protocol_1 = require("./base-protocol");
/**
 * Trigger an undo of the latest executed command.
 */
class UndoOperation {
    constructor(kind = UndoOperation.KIND) {
        this.kind = kind;
    }
}
exports.UndoOperation = UndoOperation;
UndoOperation.KIND = 'glspUndo';
function isUndoOperation(action) {
    return base_protocol_1.isActionKind(action, UndoOperation.KIND);
}
exports.isUndoOperation = isUndoOperation;
/**
 * Trigger a redo of the latest undone command.
 */
class RedoOperation {
    constructor(kind = RedoOperation.KIND) {
        this.kind = kind;
    }
}
exports.RedoOperation = RedoOperation;
RedoOperation.KIND = 'glspRedo';
function isRedoOperation(action) {
    return base_protocol_1.isActionKind(action, RedoOperation.KIND);
}
exports.isRedoOperation = isRedoOperation;
//# sourceMappingURL=undo-redo.js.map