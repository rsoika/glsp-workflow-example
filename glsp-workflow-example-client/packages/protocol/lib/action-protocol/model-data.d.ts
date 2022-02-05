import { Action, RequestAction, ResponseAction } from './base-protocol';
import { SModelRootSchema } from './model-structure';
import { JsonPrimitive } from './types';
/**
 * Sent from the server to the client in order to set the model. If a model is already present, it is replaced.
 */
export declare class RequestModelAction implements RequestAction<SetModelAction> {
    readonly options?: {
        [key: string]: JsonPrimitive;
    } | undefined;
    readonly requestId: string;
    static readonly KIND = "requestModel";
    readonly kind = "requestModel";
    constructor(options?: {
        [key: string]: JsonPrimitive;
    } | undefined, requestId?: string);
    /** Factory function to dispatch a request with the `IActionDispatcher` */
    static create(options?: {
        [key: string]: JsonPrimitive;
    }): RequestAction<SetModelAction>;
}
export declare function isRequestModelAction(action: any): action is RequestModelAction;
/**
 * Sent from the model source to the client in order to set the model. If a model is already present, it is replaced.
 */
export declare class SetModelAction implements ResponseAction {
    readonly newRoot: SModelRootSchema;
    readonly responseId: string;
    static readonly KIND = "setModel";
    readonly kind = "setModel";
    constructor(newRoot: SModelRootSchema, responseId?: string);
}
export declare function isSetModelAction(action: any): action is SetModelAction;
/**
 * Sent from the server to the client in order to update the model. If no model is present yet, this behaves the same as a SetModelAction.
 * The transition from the old model to the new one can be animated.
 */
export declare class UpdateModelAction implements Action {
    readonly newRoot: SModelRootSchema;
    readonly animate: boolean;
    static readonly KIND = "updateModel";
    readonly kind = "updateModel";
    constructor(newRoot: SModelRootSchema, animate?: boolean);
}
export declare function isUpdateModelAction(action: any): action is UpdateModelAction;
export declare class ModelSourceChangedAction implements Action {
    readonly modelSourceName: string;
    static KIND: string;
    readonly kind: string;
    constructor(modelSourceName: string);
}
export declare function isModelSourceChangedAction(action?: any): action is ModelSourceChangedAction;
//# sourceMappingURL=model-data.d.ts.map