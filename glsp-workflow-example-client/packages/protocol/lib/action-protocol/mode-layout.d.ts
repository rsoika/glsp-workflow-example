import { Operation, RequestAction, ResponseAction } from './base-protocol';
import { SModelRootSchema } from './model-structure';
import { ElementAndAlignment, ElementAndBounds } from './types';
/** Sent from the server to the client to request bounds for the given model. The model is rendered invisibly so the bounds can
 * derived from the DOM. The response is a ComputedBoundsAction. This hidden rendering round-trip is necessary if the client is responsible
 * for parts of the layout.
 */
export declare class RequestBoundsAction implements RequestAction<ComputedBoundsAction> {
    readonly newRoot: SModelRootSchema;
    readonly requestId: string;
    static readonly KIND: string;
    readonly kind: string;
    constructor(newRoot: SModelRootSchema, requestId?: string);
    /** Factory function to dispatch a request with the `IActionDispatcher` */
    static create(newRoot: SModelRootSchema): RequestAction<ComputedBoundsAction>;
}
export declare function isRequestBoundsAction(action: any): action is RequestBoundsAction;
/**
 * Sent from the client to the server to transmit the result of bounds computation as a response to a RequestBoundsAction. If the server is
 *  responsible for parts of the layout, it can do so after applying the computed bounds received with this action. Otherwise there is no
 * need to send the computed bounds to the server, so they can be processed locally by the client.
 */
export declare class ComputedBoundsAction implements ResponseAction {
    readonly bounds: ElementAndBounds[];
    readonly revision?: number | undefined;
    readonly alignments?: ElementAndAlignment[] | undefined;
    readonly responseId: string;
    static readonly KIND = "computedBounds";
    readonly kind = "computedBounds";
    constructor(bounds: ElementAndBounds[], revision?: number | undefined, alignments?: ElementAndAlignment[] | undefined, responseId?: string);
}
export declare function isComputedBoundsAction(action: any): action is ComputedBoundsAction;
/**
 * Request a layout of the diagram or the selected elements only.
 */
export declare class LayoutOperation implements Operation {
    readonly elementIds: string[];
    readonly kind: string;
    static readonly KIND = "layout";
    constructor(elementIds: string[], kind?: string);
}
export declare function isLayoutOperation(action: any): action is LayoutOperation;
//# sourceMappingURL=mode-layout.d.ts.map