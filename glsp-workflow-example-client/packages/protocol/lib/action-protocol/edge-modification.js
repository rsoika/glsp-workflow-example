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
exports.isChangeRoutingsPointsOperation = exports.ChangeRoutingPointsOperation = exports.isReconnectEdgeOperation = exports.ReconnectEdgeOperation = void 0;
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
/**
 * If the source and/or target element of an edge should be adapted, the client can send a `ReconnectEdgeOperation` to the server.
 */
class ReconnectEdgeOperation {
    constructor(edgeElementId, sourceElementId, targetElementId, kind = ReconnectEdgeOperation.KIND) {
        this.edgeElementId = edgeElementId;
        this.sourceElementId = sourceElementId;
        this.targetElementId = targetElementId;
        this.kind = kind;
    }
}
exports.ReconnectEdgeOperation = ReconnectEdgeOperation;
ReconnectEdgeOperation.KIND = 'reconnectEdge';
function isReconnectEdgeOperation(action) {
    return (base_protocol_1.isActionKind(action, ReconnectEdgeOperation.KIND) &&
        typeguard_util_1.isString(action, 'edgeElementId') &&
        typeguard_util_1.isString(action, 'sourceElementId') &&
        typeguard_util_1.isString(action, 'targetElementId'));
}
exports.isReconnectEdgeOperation = isReconnectEdgeOperation;
/**
 * An edge may have zero or more routing points that "re-direct" the edge between the source and the target element. In order to set these
 * routing points the client may send a `ChangeRoutingPointsOperation`.
 */
class ChangeRoutingPointsOperation {
    constructor(newRoutingPoints, kind = ChangeRoutingPointsOperation.KIND) {
        this.newRoutingPoints = newRoutingPoints;
        this.kind = kind;
    }
}
exports.ChangeRoutingPointsOperation = ChangeRoutingPointsOperation;
ChangeRoutingPointsOperation.KIND = 'changeRoutingPoints';
function isChangeRoutingsPointsOperation(action) {
    return base_protocol_1.isActionKind(action, ChangeRoutingPointsOperation.KIND) && typeguard_util_1.isArray(action, 'newRoutingPoints');
}
exports.isChangeRoutingsPointsOperation = isChangeRoutingsPointsOperation;
//# sourceMappingURL=edge-modification.js.map