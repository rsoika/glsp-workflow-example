"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationStatus = exports.isApplyLabelEditOperation = exports.ApplyLabelEditOperation = exports.isSetEditValidationResultAction = exports.SetEditValidationResultAction = exports.isRequestEditValidationAction = exports.RequestEditValidationAction = void 0;
/********************************************************************************
 * Copyright (c) 2020-2021 EclipseSource and others.
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
 * Requests the validation of the given text in the context of the provided model element. Typically sent from the client to the server.
 */
class RequestEditValidationAction {
    constructor(contextId, modelElementId, text, requestId = base_protocol_1.generateRequestId(), kind = RequestEditValidationAction.KIND) {
        this.contextId = contextId;
        this.modelElementId = modelElementId;
        this.text = text;
        this.requestId = requestId;
        this.kind = kind;
    }
}
exports.RequestEditValidationAction = RequestEditValidationAction;
RequestEditValidationAction.KIND = 'requestEditValidation';
function isRequestEditValidationAction(action) {
    return (base_protocol_1.isRequestAction(action) &&
        action.kind === RequestEditValidationAction.KIND &&
        typeguard_util_1.isString(action, 'contextId') &&
        typeguard_util_1.isString(action, 'modelElementId') &&
        typeguard_util_1.isString(action, 'text'));
}
exports.isRequestEditValidationAction = isRequestEditValidationAction;
/**
 * Response to a {@link RequestEditValidationAction} containing the validation result for applying a text on a certain model element.
 */
class SetEditValidationResultAction {
    constructor(status, responseId = '', args, kind = SetEditValidationResultAction.KIND) {
        this.status = status;
        this.responseId = responseId;
        this.args = args;
        this.kind = kind;
    }
}
exports.SetEditValidationResultAction = SetEditValidationResultAction;
SetEditValidationResultAction.KIND = 'setEditValidationResult';
function isSetEditValidationResultAction(action) {
    return base_protocol_1.isActionKind(action, SetEditValidationResultAction.KIND) && typeguard_util_1.isObject(action, 'status') && typeguard_util_1.isString(action, 'responseId');
}
exports.isSetEditValidationResultAction = isSetEditValidationResultAction;
class ApplyLabelEditOperation {
    constructor(labelId, text) {
        this.labelId = labelId;
        this.text = text;
        this.kind = ApplyLabelEditOperation.KIND;
    }
}
exports.ApplyLabelEditOperation = ApplyLabelEditOperation;
ApplyLabelEditOperation.KIND = 'applyLabelEdit';
function isApplyLabelEditOperation(action) {
    return base_protocol_1.isActionKind(action, ApplyLabelEditOperation.KIND) && typeguard_util_1.isString(action, 'labelId') && typeguard_util_1.isString(action, 'text');
}
exports.isApplyLabelEditOperation = isApplyLabelEditOperation;
var ValidationStatus;
(function (ValidationStatus) {
    // eslint-disable-next-line no-shadow
    let Severity;
    (function (Severity) {
        Severity[Severity["FATAL"] = 0] = "FATAL";
        Severity[Severity["ERROR"] = 1] = "ERROR";
        Severity[Severity["WARNING"] = 2] = "WARNING";
        Severity[Severity["INFO"] = 3] = "INFO";
        Severity[Severity["OK"] = 4] = "OK";
        // eslint-disable-next-line no-shadow
        Severity[Severity["NONE"] = 5] = "NONE";
    })(Severity = ValidationStatus.Severity || (ValidationStatus.Severity = {}));
    ValidationStatus.NONE = {
        severity: Severity.NONE,
        message: '',
        error: { code: -1, message: '', data: {} }
    };
    function isOk(validationStatus) {
        return (validationStatus.severity === Severity.OK ||
            validationStatus.severity === Severity.INFO ||
            validationStatus.severity === Severity.NONE);
    }
    ValidationStatus.isOk = isOk;
    function isWarning(validationStatus) {
        return validationStatus.severity === Severity.WARNING;
    }
    ValidationStatus.isWarning = isWarning;
    function isError(validationStatus) {
        return validationStatus.severity === Severity.ERROR || validationStatus.severity === Severity.FATAL;
    }
    ValidationStatus.isError = isError;
})(ValidationStatus = exports.ValidationStatus || (exports.ValidationStatus = {}));
//# sourceMappingURL=element-text-editing.js.map