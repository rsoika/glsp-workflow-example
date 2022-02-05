"use strict";
/********************************************************************************
 * Copyright (c) 2021 EclipseSource and others.
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
exports.isChangeContainerOperation = exports.ChangeContainerOperation = exports.isChangeBoundsOperation = exports.ChangeBoundsOperation = void 0;
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
/**
 * Triggers the position or size change of elements. This action concerns only the element's graphical size and position.
 * Whether an element can be resized or repositioned may be specified by the server with a `TypeHint` to allow for immediate user feedback
 * before resizing or repositioning.
 */
class ChangeBoundsOperation {
    constructor(newBounds, kind = ChangeBoundsOperation.KIND) {
        this.newBounds = newBounds;
        this.kind = kind;
    }
}
exports.ChangeBoundsOperation = ChangeBoundsOperation;
ChangeBoundsOperation.KIND = 'changeBounds';
function isChangeBoundsOperation(action) {
    return base_protocol_1.isActionKind(action, ChangeBoundsOperation.KIND) && typeguard_util_1.isArray(action, 'newBounds');
}
exports.isChangeBoundsOperation = isChangeBoundsOperation;
/**
 * The client sends a `ChangeContainerOperation` to the server to request the execution of a changeContainer operation.
 */
class ChangeContainerOperation {
    constructor(elementId, targetContainerId, location, kind = ChangeContainerOperation.KIND) {
        this.elementId = elementId;
        this.targetContainerId = targetContainerId;
        this.location = location;
        this.kind = kind;
    }
}
exports.ChangeContainerOperation = ChangeContainerOperation;
ChangeContainerOperation.KIND = 'changeContainer';
function isChangeContainerOperation(action) {
    return base_protocol_1.isActionKind(action, ChangeContainerOperation.KIND) && typeguard_util_1.isString(action, 'elementId') && typeguard_util_1.isString(action, 'targetContainerId');
}
exports.isChangeContainerOperation = isChangeContainerOperation;
//# sourceMappingURL=node-modification.js.map