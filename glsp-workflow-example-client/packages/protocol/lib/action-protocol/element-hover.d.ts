import { RequestAction, ResponseAction } from './base-protocol';
import { SModelRootSchema } from './model-structure';
import { Bounds } from './types';
/**
 * Triggered when the user hovers the mouse pointer over an element to get a popup with details on that element.
 * This action is sent from the client to the server. The response is a `SetPopupModelAction`.
 */
export declare class RequestPopupModelAction implements RequestAction<SetPopupModelAction> {
    readonly elementId: string;
    readonly bounds: Bounds;
    readonly requestId: string;
    static readonly KIND = "requestPopupModel";
    readonly kind = "requestPopupModel";
    constructor(elementId: string, bounds: Bounds, requestId?: string);
    /** Factory function to dispatch a request with the `IActionDispatcher` */
    static create(elementId: string, bounds: Bounds): RequestAction<SetPopupModelAction>;
}
export declare function isRequestPopupModelAction(action: any): action is RequestPopupModelAction;
/**
 * Sent from the server to the client to display a popup in response to a RequestPopupModelAction. This action can also be used to remove
 * any existing popup by choosing EMPTY_ROOT as root element.
 */
export declare class SetPopupModelAction implements ResponseAction {
    readonly newRoot: SModelRootSchema;
    readonly responseId: string;
    static readonly KIND = "setPopupModel";
    readonly kind = "setPopupModel";
    constructor(newRoot: SModelRootSchema, responseId?: string);
}
export declare function isSetPopupModelAction(action: any): action is SetPopupModelAction;
//# sourceMappingURL=element-hover.d.ts.map