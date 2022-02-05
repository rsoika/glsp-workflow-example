"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSelectAllAction = exports.SelectAllAction = exports.isSelectAction = exports.SelectAction = void 0;
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
/**
 * Triggered when the user changes the selection, e.g. by clicking on a selectable element. The action should trigger a change in the
 * selected state accordingly, so the elements can be rendered differently. The server can send such an action to the client in order to
 *  change the selection remotely.
 */
class SelectAction {
    constructor(selectedElementsIDs = [], deselectedElementsIDs = []) {
        this.selectedElementsIDs = selectedElementsIDs;
        this.deselectedElementsIDs = deselectedElementsIDs;
        this.kind = SelectAction.KIND;
    }
}
exports.SelectAction = SelectAction;
SelectAction.KIND = 'elementSelected';
function isSelectAction(action) {
    return base_protocol_1.isActionKind(action, SelectAction.KIND) && typeguard_util_1.isArray(action, 'selectedElementsIDs') && typeguard_util_1.isArray(action, 'deselectedElementsIDs');
}
exports.isSelectAction = isSelectAction;
/**
 * Programmatic action for selecting or deselecting all elements.
 */
class SelectAllAction {
    /**
     * If `select` is true, all elements are selected, otherwise they are deselected.
     */
    constructor(select = true) {
        this.select = select;
        this.kind = SelectAllAction.KIND;
    }
}
exports.SelectAllAction = SelectAllAction;
SelectAllAction.KIND = 'allSelected';
function isSelectAllAction(action) {
    return base_protocol_1.isActionKind(action, SelectAllAction.KIND) && typeguard_util_1.isBoolean(action, 'select');
}
exports.isSelectAllAction = isSelectAllAction;
//# sourceMappingURL=element-selection.js.map