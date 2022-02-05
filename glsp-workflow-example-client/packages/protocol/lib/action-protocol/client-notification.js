"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isServerMessageAction = exports.ServerMessageAction = exports.isGLSPServerStatusAction = exports.GLSPServerStatusAction = void 0;
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
 * This action is typically sent by the server to signal a state change. This action extends the corresponding Sprotty action to include
 * a timeout. If a timeout is given the respective status should disappear after the timeout is reached.
 */
class GLSPServerStatusAction {
    constructor(severity, message, timeout = -1, kind = GLSPServerStatusAction.KIND) {
        this.severity = severity;
        this.message = message;
        this.timeout = timeout;
        this.kind = kind;
    }
}
exports.GLSPServerStatusAction = GLSPServerStatusAction;
GLSPServerStatusAction.KIND = 'serverStatus';
function isGLSPServerStatusAction(action) {
    return (base_protocol_1.isActionKind(action, GLSPServerStatusAction.KIND) &&
        typeguard_util_1.isString(action, 'severity') &&
        typeguard_util_1.isString(action, 'message') &&
        typeguard_util_1.isNumber(action, 'timeout'));
}
exports.isGLSPServerStatusAction = isGLSPServerStatusAction;
/**
 * This action is typically sent by the server to notify the user about something of interest.
 */
class ServerMessageAction {
    constructor(severity, message, details, timeout = -1, kind = ServerMessageAction.KIND) {
        this.severity = severity;
        this.message = message;
        this.details = details;
        this.timeout = timeout;
        this.kind = kind;
    }
}
exports.ServerMessageAction = ServerMessageAction;
ServerMessageAction.KIND = 'serverMessage';
function isServerMessageAction(action) {
    return (base_protocol_1.isActionKind(action, ServerMessageAction.KIND) &&
        typeguard_util_1.isString(action, 'severity') &&
        typeguard_util_1.isString(action, 'message') &&
        typeguard_util_1.isNumber(action, 'timeout'));
}
exports.isServerMessageAction = isServerMessageAction;
//# sourceMappingURL=client-notification.js.map