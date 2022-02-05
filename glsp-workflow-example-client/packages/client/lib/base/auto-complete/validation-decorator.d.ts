import { ValidationStatus } from '@eclipse-glsp/protocol';
export interface IValidationDecorator {
    decorateValidationResult(status: ValidationStatus): void;
    isValidatedOk(): boolean;
    invalidate(): void;
    dispose(): void;
}
export declare namespace IValidationDecorator {
    const NO_DECORATION: IValidationDecorator;
}
export declare class ValidationDecorator implements IValidationDecorator {
    protected containerElement: HTMLElement;
    warningClasses: string[];
    warningIconClasses: string;
    errorClasses: string[];
    errorIconClasses: string;
    isValidated: boolean;
    hasValidationError: boolean;
    protected decorationDiv?: HTMLDivElement;
    constructor(containerElement: HTMLElement);
    decorateValidationResult(status: ValidationStatus): void;
    protected decorateError(message: string): void;
    protected decorateWarning(message: string): void;
    protected switchCssClasses(element: HTMLElement, cssClasses: string[]): void;
    protected createDecorationDiv(): HTMLDivElement;
    protected decorationContainerWidth(): number;
    protected adjustPosition(): void;
    isValidatedOk(): boolean;
    invalidate(): void;
    dispose(): void;
}
//# sourceMappingURL=validation-decorator.d.ts.map