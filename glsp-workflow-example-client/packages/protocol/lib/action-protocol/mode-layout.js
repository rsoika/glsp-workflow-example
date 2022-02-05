"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLayoutOperation = exports.LayoutOperation = exports.isComputedBoundsAction = exports.ComputedBoundsAction = exports.isRequestBoundsAction = exports.RequestBoundsAction = void 0;
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
/** Sent from the server to the client to request bounds for the given model. The model is rendered invisibly so the bounds can
 * derived from the DOM. The response is a ComputedBoundsAction. This hidden rendering round-trip is necessary if the client is responsible
 * for parts of the layout.
 */
class RequestBoundsAction {
    constructor(newRoot, requestId = '') {
        this.newRoot = newRoot;
        this.requestId = requestId;
        this.kind = RequestBoundsAction.KIND;
    }
    /** Factory function to dispatch a request with the `IActionDispatcher` */
    static create(newRoot) {
        return new RequestBoundsAction(newRoot, base_protocol_1.generateRequestId());
    }
}
exports.RequestBoundsAction = RequestBoundsAction;
RequestBoundsAction.KIND = 'requestBounds';
function isRequestBoundsAction(action) {
    return base_protocol_1.isActionKind(action, RequestBoundsAction.KIND) && typeguard_util_1.isObject(action, 'newRoot') && typeguard_util_1.isString(action, 'requestId');
}
exports.isRequestBoundsAction = isRequestBoundsAction;
/**
 * Sent from the client to the server to transmit the result of bounds computation as a response to a RequestBoundsAction. If the server is
 *  responsible for parts of the layout, it can do so after applying the computed bounds received with this action. Otherwise there is no
 * need to send the computed bounds to the server, so they can be processed locally by the client.
 */
class ComputedBoundsAction {
    constructor(bounds, revision, alignments, responseId = '') {
        this.bounds = bounds;
        this.revision = revision;
        this.alignments = alignments;
        this.responseId = responseId;
        this.kind = ComputedBoundsAction.KIND;
    }
}
exports.ComputedBoundsAction = ComputedBoundsAction;
ComputedBoundsAction.KIND = 'computedBounds';
function isComputedBoundsAction(action) {
    return base_protocol_1.isActionKind(action, ComputedBoundsAction.KIND) && typeguard_util_1.isArray(action, 'bounds') && typeguard_util_1.isString(action, 'responseId');
}
exports.isComputedBoundsAction = isComputedBoundsAction;
/**
 * Request a layout of the diagram or the selected elements only.
 */
class LayoutOperation {
    constructor(elementIds, kind = LayoutOperation.KIND) {
        this.elementIds = elementIds;
        this.kind = kind;
    }
}
exports.LayoutOperation = LayoutOperation;
LayoutOperation.KIND = 'layout';
function isLayoutOperation(action) {
    return base_protocol_1.isActionKind(action, LayoutOperation.KIND) && typeguard_util_1.isArray(action, 'elementIds');
}
exports.isLayoutOperation = isLayoutOperation;
//# sourceMappingURL=mode-layout.js.map