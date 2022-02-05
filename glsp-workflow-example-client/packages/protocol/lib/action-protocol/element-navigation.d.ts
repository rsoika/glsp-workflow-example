import { Action, RequestAction, ResponseAction } from './base-protocol';
import { Args, EditorContext } from './types';
/**
 *  A NavigationTarget identifies the object we want to navigate to via its uri and may further provide a label to display for the client.
 */
export interface NavigationTarget {
    uri: string;
    label?: string;
    args?: Args;
}
export declare namespace NavigationTarget {
    const ELEMENT_IDS = "elementIds";
    const ELEMENT_IDS_SEPARATOR = "&";
    const TEXT_LINE = "line";
    const TEXT_COLUMN = "column";
    interface TextPosition {
        line: number;
        character: number;
    }
    function hasArguments(target: NavigationTarget): boolean;
    function addArgument(target: NavigationTarget, key: string, value: string | number | boolean): void;
    function getElementIds(target: NavigationTarget): string[];
    function setElementIds(target: NavigationTarget, elementIds: string[]): string;
    function setTextPosition(target: NavigationTarget, position: TextPosition | undefined): void;
    function getTextPosition(target: NavigationTarget): TextPosition | undefined;
}
/**
 * Action that is usually sent from the client to the server to request navigation targets for a specific navigation type such as
 * documentation or implementation in the given editor context.
 */
export declare class RequestNavigationTargetsAction implements RequestAction<SetNavigationTargetsAction> {
    readonly targetTypeId: string;
    readonly editorContext: EditorContext;
    readonly requestId: string;
    static readonly KIND = "requestNavigationTargets";
    kind: string;
    constructor(targetTypeId: string, editorContext: EditorContext, requestId?: string);
}
export declare function isRequestNavigationTargetsAction(action: any): action is RequestNavigationTargetsAction;
/**
 * Response action from the server following a {@link RequestNavigationTargetsAction}. It contains all available navigation targets for the
 * queried target type in the provided editor context. The server may also provide additional information using the arguments, e.g.,
 *  warnings, that can be interpreted by the client.
 */
export declare class SetNavigationTargetsAction implements ResponseAction {
    readonly targets: NavigationTarget[];
    readonly responseId: string;
    readonly args?: Args | undefined;
    static readonly KIND = "setNavigationTargets";
    kind: string;
    constructor(targets: NavigationTarget[], responseId?: string, args?: Args | undefined);
}
export declare function isSetNavigationTargetsAction(action: any): action is SetNavigationTargetsAction;
/** Action that triggers the navigation to a particular navigation target, such as element IDs, queries, etc.. */
export declare class NavigateToTargetAction implements Action {
    readonly target: NavigationTarget;
    static readonly KIND = "navigateToTarget";
    readonly kind = "navigateToTarget";
    constructor(target: NavigationTarget);
}
export declare function isNavigateToTargetAction(action: any): action is NavigateToTargetAction;
/**
 * If a client cannot navigate to a target directly, a {@link ResolveNavigationTargetAction} may be sent to the server to resolve the
 * navigation target to one or more model elements. This may be useful in cases where the resolution of each target is expensive or the
 * client architecture requires an indirection.
 */
export declare class ResolveNavigationTargetAction implements RequestAction<SetResolvedNavigationTargetAction> {
    readonly navigationTarget: NavigationTarget;
    readonly requestId: string;
    static readonly KIND = "resolveNavigationTarget";
    kind: string;
    constructor(navigationTarget: NavigationTarget, requestId?: string);
}
export declare function isResolveNavigationTargetAction(action: any): action is ResolveNavigationTargetAction;
/**
 * An action sent from the server in response to a {@link ResolveNavigationTargetAction}. The response contains the resolved element ids
 * for the given target and may contain additional information in the args property.
 */
export declare class SetResolvedNavigationTargetAction implements ResponseAction {
    readonly elementIds: string[];
    readonly args?: Args | undefined;
    readonly responseId: string;
    static readonly KIND = "setResolvedNavigationTarget";
    kind: string;
    constructor(elementIds?: string[], args?: Args | undefined, responseId?: string);
}
export declare function isSetResolvedNavigationTargets(action: any): action is SetResolvedNavigationTargetAction;
/**
 * If a {@link NavigationTarget} cannot be resolved or the resolved target is something that is not part of our model source, e.g.,
 * a separate documentation file, a {@link NavigateToExternalTargetAction} may be sent. Since the target it outside of the model scope such
 * an action would be typically handled by an integration layer (such as the surrounding IDE).
 */
export declare class NavigateToExternalTargetAction implements Action {
    readonly target: NavigationTarget;
    static readonly KIND = "navigateToExternalTarget";
    readonly kind = "navigateToExternalTarget";
    constructor(target: NavigationTarget);
}
export declare function isNavigateToExternalTargetAction(action: any): action is NavigateToExternalTargetAction;
//# sourceMappingURL=element-navigation.d.ts.map