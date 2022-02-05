"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCompoundOperation = exports.CompoundOperation = exports.isRejectAction = exports.RejectAction = exports.isResponseAction = exports.generateRequestId = exports.isRequestAction = exports.isActionKind = exports.isAction = exports.isActionMessageOfType = exports.isActionMessage = void 0;
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
const uuid = require("uuid");
const typeguard_util_1 = require("../utils/typeguard-util");
function isActionMessage(object) {
    return object !== undefined && typeguard_util_1.isString(object, 'clientId') && isAction(object['action']);
}
exports.isActionMessage = isActionMessage;
function isActionMessageOfType(object, guard) {
    return isActionMessage(object) && guard(object.action);
}
exports.isActionMessageOfType = isActionMessageOfType;
function isAction(action) {
    return action !== undefined && typeguard_util_1.isString(action, 'kind');
}
exports.isAction = isAction;
function isActionKind(action, kind) {
    return isAction(action) && action.kind === kind;
}
exports.isActionKind = isActionKind;
function isRequestAction(action) {
    return isAction(action) && typeguard_util_1.isString(action, 'requestId');
}
exports.isRequestAction = isRequestAction;
function generateRequestId() {
    return uuid.v4();
}
exports.generateRequestId = generateRequestId;
function isResponseAction(action) {
    return isAction(action) && 'responseId' in action && typeof action['responseId'] === 'string' && action['responseId'] !== '';
}
exports.isResponseAction = isResponseAction;
/**
 * A reject action is a response fired to indicate that a request must be rejected.
 */
class RejectAction {
    constructor(message, responseId, detail) {
        this.message = message;
        this.responseId = responseId;
        this.detail = detail;
        this.kind = RejectAction.KIND;
    }
}
exports.RejectAction = RejectAction;
RejectAction.KIND = 'rejectRequest';
function isRejectAction(action) {
    return isResponseAction(action) && action.kind === RejectAction.KIND && typeguard_util_1.isString(action, 'message');
}
exports.isRejectAction = isRejectAction;
/**
 * An operation that executes a list of sub-operations.
 */
class CompoundOperation {
    constructor(operationList, kind = CompoundOperation.KIND) {
        this.operationList = operationList;
        this.kind = kind;
    }
}
exports.CompoundOperation = CompoundOperation;
CompoundOperation.KIND = 'compound';
function isCompoundOperation(operation) {
    return isActionKind(operation, CompoundOperation.KIND) && typeguard_util_1.isArray(operation, 'operationList');
}
exports.isCompoundOperation = isCompoundOperation;
//# sourceMappingURL=base-protocol.js.map