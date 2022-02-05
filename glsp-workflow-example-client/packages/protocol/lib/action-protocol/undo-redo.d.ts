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
import { Operation } from './base-protocol';
/**
 * Trigger an undo of the latest executed command.
 */
export declare class UndoOperation implements Operation {
    readonly kind: string;
    static readonly KIND = "glspUndo";
    constructor(kind?: string);
}
export declare function isUndoOperation(action: any): action is UndoOperation;
/**
 * Trigger a redo of the latest undone command.
 */
export declare class RedoOperation implements Operation {
    readonly kind: string;
    static readonly KIND = "glspRedo";
    constructor(kind?: string);
}
export declare function isRedoOperation(action: any): action is RedoOperation;
//# sourceMappingURL=undo-redo.d.ts.map