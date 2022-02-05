"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalloonLabelValidationDecorator = exports.ServerEditLabelValidator = exports.ValidateLabelEditAction = exports.LabelEditValidation = void 0;
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
const protocol_1 = require("@eclipse-glsp/protocol");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const action_dispatcher_1 = require("../../base/action-dispatcher");
var LabelEditValidation;
(function (LabelEditValidation) {
    LabelEditValidation.CONTEXT_ID = 'label-edit';
    function toEditLabelValidationResult(status) {
        const message = status.message;
        let severity = 'ok';
        if (protocol_1.ValidationStatus.isError(status)) {
            severity = 'error';
        }
        else if (protocol_1.ValidationStatus.isWarning(status)) {
            severity = 'warning';
        }
        return { message, severity };
    }
    LabelEditValidation.toEditLabelValidationResult = toEditLabelValidationResult;
})(LabelEditValidation = exports.LabelEditValidation || (exports.LabelEditValidation = {}));
class ValidateLabelEditAction extends protocol_1.RequestEditValidationAction {
    constructor(value, labelId) {
        super(LabelEditValidation.CONTEXT_ID, labelId, value);
    }
}
exports.ValidateLabelEditAction = ValidateLabelEditAction;
let ServerEditLabelValidator = class ServerEditLabelValidator {
    validate(value, label) {
        const action = new ValidateLabelEditAction(value, label.id);
        return this.actionDispatcher.requestUntil(action).then(response => this.getValidationResultFromResponse(response));
    }
    getValidationResultFromResponse(action) {
        if (protocol_1.isSetEditValidationResultAction(action)) {
            return LabelEditValidation.toEditLabelValidationResult(action.status);
        }
        return { severity: 'ok' };
    }
};
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcher),
    __metadata("design:type", action_dispatcher_1.GLSPActionDispatcher)
], ServerEditLabelValidator.prototype, "actionDispatcher", void 0);
ServerEditLabelValidator = __decorate([
    inversify_1.injectable()
], ServerEditLabelValidator);
exports.ServerEditLabelValidator = ServerEditLabelValidator;
let BalloonLabelValidationDecorator = class BalloonLabelValidationDecorator {
    decorate(input, result) {
        const containerElement = input.parentElement;
        if (!containerElement) {
            return;
        }
        if (result.message) {
            containerElement.setAttribute('data-balloon', result.message);
            containerElement.setAttribute('data-balloon-pos', 'up-left');
            containerElement.setAttribute('data-balloon-visible', 'true');
        }
        switch (result.severity) {
            case 'ok':
                containerElement.classList.add('validation-ok');
                break;
            case 'warning':
                containerElement.classList.add('validation-warning');
                break;
            case 'error':
                containerElement.classList.add('validation-error');
                break;
        }
    }
    dispose(input) {
        const containerElement = input.parentElement;
        if (containerElement) {
            containerElement.removeAttribute('data-balloon');
            containerElement.removeAttribute('data-balloon-pos');
            containerElement.removeAttribute('data-balloon-visible');
            containerElement.classList.remove('validation-ok', 'validation-warning', 'validation-error');
        }
    }
};
BalloonLabelValidationDecorator = __decorate([
    inversify_1.injectable()
], BalloonLabelValidationDecorator);
exports.BalloonLabelValidationDecorator = BalloonLabelValidationDecorator;
//# sourceMappingURL=edit-label-validator.js.map