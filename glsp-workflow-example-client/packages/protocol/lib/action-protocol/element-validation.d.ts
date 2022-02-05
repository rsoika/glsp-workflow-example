import { RequestAction, ResponseAction } from '.';
import { Action } from './base-protocol';
/**
 * Validation in GLSP is performed by using validation markers. A marker represents the validation result for a single model element
 */
export interface Marker {
    /**
     * Short label describing this marker message, e.g., short validation message
     */
    readonly label: string;
    /**
     * Full description of this marker, e.g., full validation message
     */
    readonly description: string;
    /**
     * Id of the model element this marker refers to
     */
    readonly elementId: string;
    /**
     * Marker kind, e.g., info, warning, error or custom kind
     */
    readonly kind: string;
}
export declare namespace MarkerKind {
    const INFO = "info";
    const WARNING = "warning";
    const ERROR = "error";
}
/**
 * Action to retrieve markers for the specified model elements. Sent from the client to the server.
 */
export declare class RequestMarkersAction implements RequestAction<SetMarkersAction> {
    readonly elementsIDs: string[];
    readonly requestId: string;
    readonly kind: string;
    static readonly KIND = "requestMarkers";
    constructor(elementsIDs?: string[], requestId?: string, kind?: string);
}
export declare function isRequestMarkersAction(action: any): action is RequestMarkersAction;
/**
 * Response to the {@link RequestMarkersAction} containing all validation markers. Sent from the server to the client.
 */
export declare class SetMarkersAction implements ResponseAction {
    readonly markers: Marker[];
    readonly responseId: string;
    readonly kind: string;
    static readonly KIND = "setMarkers";
    constructor(markers: Marker[], responseId?: string, kind?: string);
}
export declare function isSetMarkersAction(action: any): action is SetMarkersAction;
/**
 * Action for clearing makers of a model
 */
export declare class DeleteMarkersAction implements Action {
    readonly markers: Marker[];
    readonly kind: string;
    static readonly KIND = "deleteMarkers";
    constructor(markers: Marker[], kind?: string);
}
export declare function isDeleteMarkersAction(action: any): action is DeleteMarkersAction;
//# sourceMappingURL=element-validation.d.ts.map