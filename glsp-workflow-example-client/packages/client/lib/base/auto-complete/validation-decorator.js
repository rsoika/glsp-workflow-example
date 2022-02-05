"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationDecorator = exports.IValidationDecorator = void 0;
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
const codicon_1 = require("sprotty/lib/utils/codicon");
const protocol_1 = require("@eclipse-glsp/protocol");
var IValidationDecorator;
(function (IValidationDecorator) {
    IValidationDecorator.NO_DECORATION = {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        decorateValidationResult(_status) { },
        isValidatedOk() {
            return false;
        },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        invalidate() { },
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        dispose() { }
    };
})(IValidationDecorator = exports.IValidationDecorator || (exports.IValidationDecorator = {}));
class ValidationDecorator {
    constructor(containerElement) {
        this.containerElement = containerElement;
        this.warningClasses = ['warning'];
        this.warningIconClasses = codicon_1.codiconCSSString('warning');
        this.errorClasses = ['error'];
        this.errorIconClasses = codicon_1.codiconCSSString('error');
        this.isValidated = false;
        this.hasValidationError = false;
    }
    decorateValidationResult(status) {
        if (protocol_1.ValidationStatus.isError(status)) {
            this.hasValidationError = true;
            this.decorateError(status.message ? status.message : 'Error');
        }
        else if (protocol_1.ValidationStatus.isWarning(status)) {
            this.hasValidationError = false;
            this.decorateWarning(status.message ? status.message : 'Warning');
        }
        else {
            this.hasValidationError = false;
            this.dispose();
        }
        this.isValidated = true;
    }
    decorateError(message) {
        this.switchCssClasses(this.containerElement, this.errorClasses);
        const div = this.createDecorationDiv();
        this.switchCssClasses(div, this.errorClasses);
        div.innerHTML = `<span class="${this.errorIconClasses}"></span> ${message}`;
        this.adjustPosition();
    }
    decorateWarning(message) {
        this.switchCssClasses(this.containerElement, this.warningClasses);
        const div = this.createDecorationDiv();
        this.switchCssClasses(div, this.warningClasses);
        div.innerHTML = `<span class="${this.warningIconClasses}"></span> ${message}`;
        this.adjustPosition();
    }
    switchCssClasses(element, cssClasses) {
        element.classList.remove(...this.errorClasses, ...this.warningClasses);
        element.classList.add(...cssClasses);
    }
    createDecorationDiv() {
        if (!this.decorationDiv) {
            this.containerElement.classList.add('validation');
            this.decorationDiv = document.createElement('div');
            this.decorationDiv.style.width = `${this.decorationContainerWidth()}px`;
            this.decorationDiv.classList.add('validation-decorator');
            this.containerElement.appendChild(this.decorationDiv);
        }
        return this.decorationDiv;
    }
    decorationContainerWidth() {
        return this.containerElement.clientWidth - 5;
    }
    adjustPosition() {
        if (this.decorationDiv) {
            const height = this.decorationDiv.clientHeight + 2;
            this.decorationDiv.style.top = `-${height}px`;
        }
    }
    isValidatedOk() {
        return this.isValidated && !this.hasValidationError;
    }
    invalidate() {
        this.isValidated = false;
    }
    dispose() {
        this.hasValidationError = false;
        this.isValidated = false;
        if (this.decorationDiv && this.containerElement && this.containerElement.contains(this.decorationDiv)) {
            this.containerElement.removeChild(this.decorationDiv);
            this.switchCssClasses(this.containerElement, []);
            this.decorationDiv = undefined;
        }
    }
}
exports.ValidationDecorator = ValidationDecorator;
//# sourceMappingURL=validation-decorator.js.map