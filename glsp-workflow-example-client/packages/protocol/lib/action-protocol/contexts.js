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
exports.isSetContextActionsAction = exports.SetContextActions = exports.isRequestContextActions = exports.RequestContextActions = void 0;
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
/**
 * The `RequestContextActions` is sent from the client to the server to request the available actions for the context with id contextId.
 */
class RequestContextActions {
    constructor(contextId, editorContext, requestId = base_protocol_1.generateRequestId(), kind = RequestContextActions.KIND) {
        this.contextId = contextId;
        this.editorContext = editorContext;
        this.requestId = requestId;
        this.kind = kind;
    }
}
exports.RequestContextActions = RequestContextActions;
RequestContextActions.KIND = 'requestContextActions';
function isRequestContextActions(action) {
    return (base_protocol_1.isActionKind(action, RequestContextActions.KIND) &&
        typeguard_util_1.isString(action, 'contextId') &&
        typeguard_util_1.isObject(action, 'editorContext') &&
        typeguard_util_1.isString(action, 'requestId'));
}
exports.isRequestContextActions = isRequestContextActions;
/**
 * The `SetContextActions` is the response to a {@link RequestContextActions} containing all actions for the queried context.
 */
class SetContextActions {
    constructor(actions, responseId = '', args, kind = SetContextActions.KIND) {
        this.actions = actions;
        this.responseId = responseId;
        this.args = args;
        this.kind = kind;
    }
}
exports.SetContextActions = SetContextActions;
SetContextActions.KIND = 'setContextActions';
function isSetContextActionsAction(action) {
    return base_protocol_1.isActionKind(action, SetContextActions.KIND) && typeguard_util_1.isArray(action, 'actions') && typeguard_util_1.isString(action, 'responseId');
}
exports.isSetContextActionsAction = isSetContextActionsAction;
//# sourceMappingURL=contexts.js.map