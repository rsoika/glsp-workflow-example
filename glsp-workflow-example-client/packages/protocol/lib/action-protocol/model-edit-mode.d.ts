import { Action } from 'sprotty';
export declare class SetEditModeAction implements Action {
    readonly editMode: string;
    readonly kind: string;
    static readonly KIND = "setEditMode";
    constructor(editMode?: string, kind?: string);
}
export declare function isSetEditModeAction(action: Action): action is SetEditModeAction;
export declare namespace EditMode {
    const READONLY = "readonly";
    const EDITABLE = "editable";
}
//# sourceMappingURL=model-edit-mode.d.ts.map