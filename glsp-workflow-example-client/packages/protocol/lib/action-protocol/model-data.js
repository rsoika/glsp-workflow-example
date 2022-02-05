"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isModelSourceChangedAction = exports.ModelSourceChangedAction = exports.isUpdateModelAction = exports.UpdateModelAction = exports.isSetModelAction = exports.SetModelAction = exports.isRequestModelAction = exports.RequestModelAction = void 0;
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
 * Sent from the server to the client in order to set the model. If a model is already present, it is replaced.
 */
class RequestModelAction {
    constructor(options, requestId = '') {
        this.options = options;
        this.requestId = requestId;
        this.kind = RequestModelAction.KIND;
    }
    /** Factory function to dispatch a request with the `IActionDispatcher` */
    static create(options) {
        return new RequestModelAction(options, base_protocol_1.generateRequestId());
    }
}
exports.RequestModelAction = RequestModelAction;
RequestModelAction.KIND = 'requestModel';
function isRequestModelAction(action) {
    return base_protocol_1.isActionKind(action, RequestModelAction.KIND);
}
exports.isRequestModelAction = isRequestModelAction;
/**
 * Sent from the model source to the client in order to set the model. If a model is already present, it is replaced.
 */
class SetModelAction {
    constructor(newRoot, responseId = '') {
        this.newRoot = newRoot;
        this.responseId = responseId;
        this.kind = SetModelAction.KIND;
    }
}
exports.SetModelAction = SetModelAction;
SetModelAction.KIND = 'setModel';
function isSetModelAction(action) {
    return base_protocol_1.isActionKind(action, SetModelAction.KIND) && typeguard_util_1.isObject(action, 'newRoot');
}
exports.isSetModelAction = isSetModelAction;
/**
 * Sent from the server to the client in order to update the model. If no model is present yet, this behaves the same as a SetModelAction.
 * The transition from the old model to the new one can be animated.
 */
class UpdateModelAction {
    constructor(newRoot, animate = true) {
        this.newRoot = newRoot;
        this.animate = animate;
        this.kind = UpdateModelAction.KIND;
    }
}
exports.UpdateModelAction = UpdateModelAction;
UpdateModelAction.KIND = 'updateModel';
function isUpdateModelAction(action) {
    return base_protocol_1.isActionKind(action, UpdateModelAction.KIND) && typeguard_util_1.isObject(action, 'newRoot') && typeguard_util_1.isBoolean(action, 'animate');
}
exports.isUpdateModelAction = isUpdateModelAction;
class ModelSourceChangedAction {
    constructor(modelSourceName) {
        this.modelSourceName = modelSourceName;
        this.kind = ModelSourceChangedAction.KIND;
    }
}
exports.ModelSourceChangedAction = ModelSourceChangedAction;
ModelSourceChangedAction.KIND = 'modelSourceChanged';
function isModelSourceChangedAction(action) {
    return base_protocol_1.isActionKind(action, ModelSourceChangedAction.KIND) && typeguard_util_1.isString(action, 'modelSourceName');
}
exports.isModelSourceChangedAction = isModelSourceChangedAction;
//# sourceMappingURL=model-data.js.map