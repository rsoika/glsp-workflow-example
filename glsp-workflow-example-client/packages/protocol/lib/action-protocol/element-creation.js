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
exports.isDeleteElementOperation = exports.DeleteElementOperation = exports.isCreateEdgeOperation = exports.CreateEdgeOperation = exports.isCreateNodeOperation = exports.CreateNodeOperation = exports.isCreateOperation = void 0;
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
function isCreateOperation(action) {
    return base_protocol_1.isAction(action) && typeguard_util_1.isString(action, 'elementTypeId');
}
exports.isCreateOperation = isCreateOperation;
/**
 * In order to create a node in the model the client can send a CreateNodeOperation with the necessary information to create that node.
 */
class CreateNodeOperation {
    constructor(elementTypeId, location, containerId, args, kind = CreateNodeOperation.KIND) {
        this.elementTypeId = elementTypeId;
        this.location = location;
        this.containerId = containerId;
        this.args = args;
        this.kind = kind;
    }
}
exports.CreateNodeOperation = CreateNodeOperation;
CreateNodeOperation.KIND = 'createNode';
function isCreateNodeOperation(action) {
    return base_protocol_1.isActionKind(action, CreateNodeOperation.KIND) && typeguard_util_1.isString(action, 'elementTypeId');
}
exports.isCreateNodeOperation = isCreateNodeOperation;
/**
 * In order to create an edge in the model the client can send a `CreateEdgeOperation` with the necessary information to create that edge.
 */
class CreateEdgeOperation {
    constructor(elementTypeId, sourceElementId, targetElementId, args, kind = CreateEdgeOperation.KIND) {
        this.elementTypeId = elementTypeId;
        this.sourceElementId = sourceElementId;
        this.targetElementId = targetElementId;
        this.args = args;
        this.kind = kind;
    }
}
exports.CreateEdgeOperation = CreateEdgeOperation;
CreateEdgeOperation.KIND = 'createEdge';
function isCreateEdgeOperation(action) {
    return (base_protocol_1.isActionKind(action, CreateEdgeOperation.KIND) &&
        typeguard_util_1.isString(action, 'elementTypeId') &&
        typeguard_util_1.isString(action, 'sourceElementId') &&
        typeguard_util_1.isString(action, 'targetElementId'));
}
exports.isCreateEdgeOperation = isCreateEdgeOperation;
/**
 * The client sends a `DeleteElementOperation` to the server to request the deletion of an element from the model.
 */
class DeleteElementOperation {
    constructor(elementIds, kind = DeleteElementOperation.KIND) {
        this.elementIds = elementIds;
        this.kind = kind;
    }
}
exports.DeleteElementOperation = DeleteElementOperation;
DeleteElementOperation.KIND = 'deleteElement';
function isDeleteElementOperation(action) {
    return base_protocol_1.isActionKind(action, DeleteElementOperation.KIND) && typeguard_util_1.isArray(action, 'elementIds');
}
exports.isDeleteElementOperation = isDeleteElementOperation;
//# sourceMappingURL=element-creation.js.map