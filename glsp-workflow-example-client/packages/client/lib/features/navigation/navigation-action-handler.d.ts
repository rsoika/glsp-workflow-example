/********************************************************************************
 * Copyright (c) 2020-2021 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
import { Action, Args, NavigateToExternalTargetAction, NavigateToTargetAction, NavigationTarget, SetResolvedNavigationTargetAction } from '@eclipse-glsp/protocol';
import { ActionHandlerRegistry, IActionDispatcher, IActionHandler, ICommand, ILogger } from 'sprotty';
import { EditorContextServiceProvider } from '../../base/editor-context-service';
import { NavigationTargetResolver } from './navigation-target-resolver';
/**
 * Action for triggering a navigation of a certain target type.
 *
 * Examples for target types could be `documentation`, `implementation`, etc.
 * but this is up to the domain-specific diagram implementation to decide.
 * Such an action will eventually trigger a `RequestNavigationTargetsAction`
 * (see `NavigationActionHandler`) in order to request the navigation targets
 * from the server.
 *
 * This action is typically triggered by a user action.
 */
export declare class NavigateAction implements Action {
    readonly targetTypeId: string;
    readonly args?: Args | undefined;
    static readonly KIND = "navigate";
    readonly kind = "navigate";
    constructor(targetTypeId: string, args?: Args | undefined);
}
export declare function isNavigateAction(action: Action): action is NavigateAction;
/** Action to trigger the processing of additional navigation arguments.
 *
 * The resolution of a `NavigationTarget` may entail additional arguments. In this case, this action is
 * triggered allowing the client to react to those arguments. The default `NavigationActionHandler` will
 * only process the arguments' keys `info`, `warning`, and `error` to present them to the user.
 * Customizations, however, may add domain-specific arguments and register custom handler to also process
 * other arguments and trigger some additional behavior (e.g. update other views, etc.).
 */
export declare class ProcessNavigationArgumentsAction implements Action {
    readonly args: Args;
    static readonly KIND = "processNavigationArguments";
    readonly kind = "processNavigationArguments";
    constructor(args: Args);
}
export declare function isProcessNavigationArgumentsAction(action: Action): action is ProcessNavigationArgumentsAction;
/**
 * Default handler for all actions that are related to the navigation.
 *
 * For a `NavigateAction` this handler triggers a `RequestNavigationTargetAction` to obtain the actual
 * navigation targets for the navigation type that is specified in the `NavigateAction`.
 * Once the navigation targets are available, it will trigger a `NavigateToTargetAction` to actually
 * perform the navigation.
 *
 * In other scenarios, clients may also trigger the `NavigateToTargetAction` directly, e.g. when opening
 * the diagram.
 *
 * Depending on the URI and arguments of the navigation target we may encounter three cases:
 *   *(a)* the navigation target already specifies element IDs, in which case this action handler navigates
 *         to the specified elements directly, by the selecting them and centering them in the viewport.
 *   *(b)* the arguments of the navigation targets don't contain element IDs, but other arguments, the
 *         navigation target needs to be resolved into actual elment IDs by the `NavigationTargetResolver`.
 *         This can for instance be useful, if the navigation deals with queries or some other more complex
 *         logic that can't be dealt with on the client.
 *  *(c)* the target isn't resolved by the `NavigationTargetResolver`, e.g. because the `uri` doesn't match
 *        the URI of the current diagram. In this case, the navigation request is forwarded by dispatching
 *        a `NavigateToExternalTargetAction`.
 */
export declare class NavigationActionHandler implements IActionHandler {
    readonly notificationTimeout = 5000;
    protected logger: ILogger;
    protected dispatcher: IActionDispatcher;
    protected actionHandlerRegistryProvider: () => Promise<ActionHandlerRegistry>;
    protected editorContextService: EditorContextServiceProvider;
    protected resolver: NavigationTargetResolver;
    handle(action: Action): ICommand | Action | void;
    protected handleNavigateAction(action: NavigateAction): Promise<void>;
    protected handleNavigateToTarget(action: NavigateToTargetAction): Promise<void>;
    protected resolveElements(action: NavigateToTargetAction): Promise<SetResolvedNavigationTargetAction | undefined>;
    protected containsElementIdsOrArguments(target: SetResolvedNavigationTargetAction | undefined): target is SetResolvedNavigationTargetAction;
    protected containsElementIds(elementIds: string[] | undefined): elementIds is string[];
    protected containsArguments(args: Args | undefined): args is Args;
    protected navigateTo(target: SetResolvedNavigationTargetAction): void;
    protected handleResolutionArguments(target: SetResolvedNavigationTargetAction): void;
    protected navigateToExternal(target: NavigationTarget): Promise<void>;
    protected processNavigationArguments(args: Args): void;
    protected handleNavigateToExternalTarget(action: NavigateToExternalTargetAction): Promise<void>;
    protected warnAboutFailedNavigation(msg: string, target?: NavigationTarget): void;
    private notify;
}
//# sourceMappingURL=navigation-action-handler.d.ts.map