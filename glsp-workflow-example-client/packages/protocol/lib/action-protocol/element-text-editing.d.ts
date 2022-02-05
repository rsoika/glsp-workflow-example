import { Action, Operation, RequestAction, ResponseAction } from './base-protocol';
import { Args } from './types';
/**
 * Requests the validation of the given text in the context of the provided model element. Typically sent from the client to the server.
 */
export declare class RequestEditValidationAction implements RequestAction<SetEditValidationResultAction> {
    readonly contextId: string;
    readonly modelElementId: string;
    readonly text: string;
    readonly requestId: string;
    readonly kind: string;
    static readonly KIND = "requestEditValidation";
    constructor(contextId: string, modelElementId: string, text: string, requestId?: string, kind?: string);
}
export declare function isRequestEditValidationAction(action: any): action is RequestEditValidationAction;
/**
 * Response to a {@link RequestEditValidationAction} containing the validation result for applying a text on a certain model element.
 */
export declare class SetEditValidationResultAction implements ResponseAction {
    readonly status: ValidationStatus;
    readonly responseId: string;
    readonly args?: Args | undefined;
    readonly kind: string;
    static readonly KIND = "setEditValidationResult";
    constructor(status: ValidationStatus, responseId?: string, args?: Args | undefined, kind?: string);
}
export declare function isSetEditValidationResultAction(action: Action): action is SetEditValidationResultAction;
export declare class ApplyLabelEditOperation implements Operation {
    readonly labelId: string;
    readonly text: string;
    static KIND: string;
    kind: string;
    constructor(labelId: string, text: string);
}
export declare function isApplyLabelEditOperation(action: any): action is ApplyLabelEditOperation;
export interface ValidationStatus {
    /**
     * The severity of the validation returned by the server.
     */
    readonly severity: ValidationStatus.Severity;
    /**
     * The validation status message which may be rendered in the view.
     */
    readonly message?: string;
    /**
     * A potential error that encodes more details.
     */
    readonly error?: ResponseError;
}
export interface ResponseError {
    /**
     * Code identifying the error kind.
     */
    readonly code: number;
    /**
     * Error message.
     */
    readonly message: string;
    /**
     * Additional custom data, e.g., a serialized stacktrace.
     */
    readonly data: Record<string, any>;
}
export declare namespace ValidationStatus {
    enum Severity {
        FATAL = 0,
        ERROR = 1,
        WARNING = 2,
        INFO = 3,
        OK = 4,
        NONE = 5
    }
    const NONE: ValidationStatus;
    function isOk(validationStatus: ValidationStatus): boolean;
    function isWarning(validationStatus: ValidationStatus): boolean;
    function isError(validationStatus: ValidationStatus): boolean;
}
//# sourceMappingURL=element-text-editing.d.ts.map