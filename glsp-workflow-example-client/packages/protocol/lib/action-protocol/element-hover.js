"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSetPopupModelAction = exports.SetPopupModelAction = exports.isRequestPopupModelAction = exports.RequestPopupModelAction = void 0;
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
 * Triggered when the user hovers the mouse pointer over an element to get a popup with details on that element.
 * This action is sent from the client to the server. The response is a `SetPopupModelAction`.
 */
class RequestPopupModelAction {
    constructor(elementId, bounds, requestId = '') {
        this.elementId = elementId;
        this.bounds = bounds;
        this.requestId = requestId;
        this.kind = RequestPopupModelAction.KIND;
    }
    /** Factory function to dispatch a request with the `IActionDispatcher` */
    static create(elementId, bounds) {
        return new RequestPopupModelAction(elementId, bounds, base_protocol_1.generateRequestId());
    }
}
exports.RequestPopupModelAction = RequestPopupModelAction;
RequestPopupModelAction.KIND = 'requestPopupModel';
function isRequestPopupModelAction(action) {
    return (base_protocol_1.isActionKind(action, RequestPopupModelAction.KIND) &&
        typeguard_util_1.isString(action, 'elementId') &&
        typeguard_util_1.isObject(action, 'bounds') &&
        typeguard_util_1.isString(action, 'requestId'));
}
exports.isRequestPopupModelAction = isRequestPopupModelAction;
/**
 * Sent from the server to the client to display a popup in response to a RequestPopupModelAction. This action can also be used to remove
 * any existing popup by choosing EMPTY_ROOT as root element.
 */
class SetPopupModelAction {
    constructor(newRoot, responseId = '') {
        this.newRoot = newRoot;
        this.responseId = responseId;
        this.kind = SetPopupModelAction.KIND;
    }
}
exports.SetPopupModelAction = SetPopupModelAction;
SetPopupModelAction.KIND = 'setPopupModel';
function isSetPopupModelAction(action) {
    return base_protocol_1.isActionKind(action, SetPopupModelAction.KIND) && typeguard_util_1.isObject(action, 'newRoot') && typeguard_util_1.isString(action, 'responseId');
}
exports.isSetPopupModelAction = isSetPopupModelAction;
//# sourceMappingURL=element-hover.js.map