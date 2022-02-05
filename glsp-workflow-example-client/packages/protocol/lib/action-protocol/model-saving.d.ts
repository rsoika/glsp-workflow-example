import { Action, ResponseAction } from './base-protocol';
export declare class SaveModelAction implements Action {
    readonly fileUri?: string | undefined;
    readonly kind: string;
    static readonly KIND = "saveModel";
    constructor(fileUri?: string | undefined, kind?: string);
}
export declare function isSaveModelAction(action?: any): action is SaveModelAction;
export declare class SetDirtyStateAction implements Action {
    readonly isDirty: boolean;
    readonly reason?: string | undefined;
    readonly kind: string;
    static readonly KIND = "setDirtyState";
    constructor(isDirty: boolean, reason?: string | undefined, kind?: string);
}
export declare namespace DirtyStateChangeReason {
    const OPERATION = "operation";
    const UNDO = "undo";
    const REDO = "redo";
    const SAVE = "save";
    const EXTERNAL = "external";
}
export declare function isSetDirtyStateAction(action?: any): action is SetDirtyStateAction;
export declare class ExportSvgAction implements ResponseAction {
    readonly svg: string;
    readonly responseId: string;
    static KIND: string;
    kind: string;
    constructor(svg: string, responseId?: string);
}
export declare function isExportSvgAction(action?: any): action is ExportSvgAction;
//# sourceMappingURL=model-saving.d.ts.map