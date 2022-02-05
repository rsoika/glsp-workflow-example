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
import { RequestEditValidationAction, ValidationStatus } from '@eclipse-glsp/protocol';
import { Action, EditableLabel, EditLabelValidationResult, IEditLabelValidationDecorator, IEditLabelValidator, SModelElement } from 'sprotty';
import { GLSPActionDispatcher } from '../../base/action-dispatcher';
export declare namespace LabelEditValidation {
    const CONTEXT_ID = "label-edit";
    function toEditLabelValidationResult(status: ValidationStatus): EditLabelValidationResult;
}
export declare class ValidateLabelEditAction extends RequestEditValidationAction {
    constructor(value: string, labelId: string);
}
export declare class ServerEditLabelValidator implements IEditLabelValidator {
    protected actionDispatcher: GLSPActionDispatcher;
    validate(value: string, label: EditableLabel & SModelElement): Promise<EditLabelValidationResult>;
    getValidationResultFromResponse(action: Action): EditLabelValidationResult;
}
export declare class BalloonLabelValidationDecorator implements IEditLabelValidationDecorator {
    decorate(input: HTMLInputElement, result: EditLabelValidationResult): void;
    dispose(input: HTMLInputElement): void;
}
//# sourceMappingURL=edit-label-validator.d.ts.map