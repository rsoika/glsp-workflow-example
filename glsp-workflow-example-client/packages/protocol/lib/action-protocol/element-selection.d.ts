import { Action } from './base-protocol';
/**
 * Triggered when the user changes the selection, e.g. by clicking on a selectable element. The action should trigger a change in the
 * selected state accordingly, so the elements can be rendered differently. The server can send such an action to the client in order to
 *  change the selection remotely.
 */
export declare class SelectAction implements Action {
    readonly selectedElementsIDs: string[];
    readonly deselectedElementsIDs: string[];
    static readonly KIND = "elementSelected";
    kind: string;
    constructor(selectedElementsIDs?: string[], deselectedElementsIDs?: string[]);
}
export declare function isSelectAction(action: any): action is SelectAction;
/**
 * Programmatic action for selecting or deselecting all elements.
 */
export declare class SelectAllAction implements Action {
    readonly select: boolean;
    static readonly KIND = "allSelected";
    kind: string;
    /**
     * If `select` is true, all elements are selected, otherwise they are deselected.
     */
    constructor(select?: boolean);
}
export declare function isSelectAllAction(action: any): action is SelectAllAction;
//# sourceMappingURL=element-selection.d.ts.map