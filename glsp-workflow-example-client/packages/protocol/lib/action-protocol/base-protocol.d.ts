/**
 * A general message serves as an envelope carrying an action to be transmitted between the client and the server via a DiagramServer.
 */
export interface ActionMessage<A extends Action = Action> {
    /**
     * Used to identify a specific client session.
     */
    clientId: string;
    /**
     * The action to execute.
     */
    action: A;
}
export declare function isActionMessage(object: any): object is ActionMessage;
export declare function isActionMessageOfType<A extends Action>(object: any, guard: (action: any) => action is A): object is ActionMessage<A>;
/**
 * An action is a declarative description of a behavior that shall be invoked by the receiver upon receipt of the action.
 * It is a plain data structure, and as such transferable between server and client. An action must never contain actual
 * SModelElement instances, but either refer to them via their ids or contain serializable schema for model elements.
 */
export interface Action {
    /**
     * Unique identifier specifying the kind of action to process.
     */
    readonly kind: string;
}
export declare function isAction(action: any): action is Action;
export declare function isActionKind(action: any, kind: string): action is Action;
/**
 * A request action is tied to the expectation of receiving a corresponding response action. The requestId property is used to match the
 * received response with the original request.
 */
export interface RequestAction<Res extends ResponseAction> extends Action {
    /**
     * Unique id for this request. In order to match a response to this request, the response needs to have the same id.
     */
    readonly requestId: string;
}
export declare function isRequestAction(action?: any): action is RequestAction<ResponseAction>;
export declare function generateRequestId(): string;
/**
 * A response action is sent to respond to a request action. The responseId must match the requestId of the preceding request.
 * In case the responseId is empty or undefined, the action is handled as standalone, i.e. it was fired without a preceding request.
 */
export interface ResponseAction extends Action {
    /**
     * Id corresponding to the request this action responds to.
     */
    readonly responseId: string;
}
export declare function isResponseAction(action?: any): action is ResponseAction;
/**
 * A reject action is a response fired to indicate that a request must be rejected.
 */
export declare class RejectAction implements ResponseAction {
    readonly message: string;
    readonly responseId: string;
    readonly detail?: string | number | boolean | import("./types").Args | import("./types").JsonArray | null | undefined;
    static readonly KIND = "rejectRequest";
    readonly kind = "rejectRequest";
    constructor(message: string, responseId: string, detail?: string | number | boolean | import("./types").Args | import("./types").JsonArray | null | undefined);
}
export declare function isRejectAction(action: any): action is RejectAction;
/**
 * Operations are actions that denote requests from the client to _modify_ the model. Model modifications are always performed by the
 * server. After a successful modification, the server sends the updated model back to the client using the `UpdateModelAction`.
 */
export interface Operation extends Action {
}
/**
 * An operation that executes a list of sub-operations.
 */
export declare class CompoundOperation implements Operation {
    operationList: Operation[];
    readonly kind: string;
    static readonly KIND = "compound";
    constructor(operationList: Operation[], kind?: string);
}
export declare function isCompoundOperation(operation?: any): operation is CompoundOperation;
//# sourceMappingURL=base-protocol.d.ts.map