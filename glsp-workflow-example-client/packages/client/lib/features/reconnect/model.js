"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SReconnectHandle = exports.createReconnectHandle = exports.isTargetRoutingHandle = exports.isSourceRoutingHandle = exports.removeReconnectHandles = exports.addReconnectHandles = exports.isReconnectHandle = exports.isReconnectable = exports.reconnectFeature = void 0;
/********************************************************************************
 * Copyright (c) 2019-2021 EclipseSource and others.
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
const sprotty_1 = require("sprotty");
exports.reconnectFeature = Symbol('reconnectFeature');
function isReconnectable(element) {
    return element instanceof sprotty_1.SRoutableElement && element.hasFeature(exports.reconnectFeature);
}
exports.isReconnectable = isReconnectable;
const ROUTING_HANDLE_SOURCE_INDEX = -2;
function isReconnectHandle(element) {
    return element !== undefined && element instanceof SReconnectHandle;
}
exports.isReconnectHandle = isReconnectHandle;
function addReconnectHandles(element) {
    removeReconnectHandles(element);
    createReconnectHandle(element, 'source', ROUTING_HANDLE_SOURCE_INDEX);
    createReconnectHandle(element, 'target', element.routingPoints.length);
}
exports.addReconnectHandles = addReconnectHandles;
function removeReconnectHandles(element) {
    element.removeAll(child => child instanceof SReconnectHandle);
}
exports.removeReconnectHandles = removeReconnectHandles;
function isSourceRoutingHandle(edge, routingHandle) {
    return routingHandle.pointIndex === ROUTING_HANDLE_SOURCE_INDEX;
}
exports.isSourceRoutingHandle = isSourceRoutingHandle;
function isTargetRoutingHandle(edge, routingHandle) {
    return routingHandle.pointIndex === edge.routingPoints.length;
}
exports.isTargetRoutingHandle = isTargetRoutingHandle;
function createReconnectHandle(edge, kind, routingPointIndex) {
    const handle = new SReconnectHandle();
    handle.kind = kind;
    handle.pointIndex = routingPointIndex;
    handle.type = 'routing-point';
    if (kind === 'target' && edge.id === sprotty_1.edgeInProgressID) {
        handle.id = sprotty_1.edgeInProgressTargetHandleID;
    }
    edge.add(handle);
    return handle;
}
exports.createReconnectHandle = createReconnectHandle;
class SReconnectHandle extends sprotty_1.SRoutingHandle {
    hasFeature(feature) {
        return feature !== sprotty_1.selectFeature && super.hasFeature(feature);
    }
}
exports.SReconnectHandle = SReconnectHandle;
//# sourceMappingURL=model.js.map