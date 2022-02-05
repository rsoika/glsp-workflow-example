import { Action } from './base-protocol';
/**
 * Centers the viewport on the elements with the given identifiers. It changes the scroll setting of the viewport accordingly and resets
 * the zoom to its default. This action can also be created on the client but it can also be sent by the server in order to perform such
 *  a viewport change remotely.
 */
export declare class CenterAction implements Action {
    readonly elementIds: string[];
    readonly animate: boolean;
    readonly retainZoom: boolean;
    static readonly KIND = "center";
    readonly kind = "center";
    constructor(elementIds: string[], animate?: boolean, retainZoom?: boolean);
}
export declare function isCenterAction(action: any): action is CenterAction;
export declare class FitToScreenAction implements Action {
    readonly elementIds: string[];
    readonly padding?: number | undefined;
    readonly maxZoom?: number | undefined;
    readonly animate: boolean;
    static readonly KIND = "fit";
    readonly kind = "fit";
    constructor(elementIds: string[], padding?: number | undefined, maxZoom?: number | undefined, animate?: boolean);
}
export declare function isFitToScreenAction(action: any): action is FitToScreenAction;
//# sourceMappingURL=viewport.d.ts.map