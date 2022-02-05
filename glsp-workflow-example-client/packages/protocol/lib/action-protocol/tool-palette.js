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
exports.isTriggerEdgeCreationAction = exports.TriggerEdgeCreationAction = exports.isTriggerNodeCreationAction = exports.TriggerNodeCreationAction = exports.isTriggerElementTypeCreationAction = exports.TriggerElementCreationAction = void 0;
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
class TriggerElementCreationAction {
    constructor(elementTypeId, args, kind = 'unknown') {
        this.elementTypeId = elementTypeId;
        this.args = args;
        this.kind = kind;
    }
}
exports.TriggerElementCreationAction = TriggerElementCreationAction;
function isTriggerElementTypeCreationAction(action) {
    return base_protocol_1.isAction(action) && typeguard_util_1.isString(action, 'elementTypeId');
}
exports.isTriggerElementTypeCreationAction = isTriggerElementTypeCreationAction;
/**
 * Triggers the enablement of the tool that is responsible for creating nodes and initializes it with the creation of nodes of the given
 * `elementTypeId`.
 */
class TriggerNodeCreationAction extends TriggerElementCreationAction {
    constructor(elementTypeId, args, kind = TriggerNodeCreationAction.KIND) {
        super(elementTypeId, args, kind);
        this.elementTypeId = elementTypeId;
        this.args = args;
        this.kind = kind;
    }
}
exports.TriggerNodeCreationAction = TriggerNodeCreationAction;
TriggerNodeCreationAction.KIND = 'triggerNodeCreation';
function isTriggerNodeCreationAction(action) {
    return isTriggerElementTypeCreationAction(action) && action.kind === TriggerNodeCreationAction.KIND;
}
exports.isTriggerNodeCreationAction = isTriggerNodeCreationAction;
/**
 * Triggers the enablement of the tool that is responsible for creating edges and initializes it with the creation of edges of the given
 * `elementTypeId`.
 */
class TriggerEdgeCreationAction extends TriggerElementCreationAction {
    constructor(elementTypeId, args, kind = TriggerEdgeCreationAction.KIND) {
        super(elementTypeId, args, kind);
        this.elementTypeId = elementTypeId;
        this.args = args;
        this.kind = kind;
    }
}
exports.TriggerEdgeCreationAction = TriggerEdgeCreationAction;
TriggerEdgeCreationAction.KIND = 'triggerEdgeCreation';
function isTriggerEdgeCreationAction(action) {
    return isTriggerElementTypeCreationAction(action) && action.kind === TriggerEdgeCreationAction.KIND;
}
exports.isTriggerEdgeCreationAction = isTriggerEdgeCreationAction;
//# sourceMappingURL=tool-palette.js.map