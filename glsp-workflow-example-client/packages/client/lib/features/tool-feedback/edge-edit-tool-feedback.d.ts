/********************************************************************************
 * Copyright (c) 2019-2021 EclipseSource and others.
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
import { Action, Point } from '@eclipse-glsp/protocol';
import { VNode } from 'snabbdom';
import { AnchorComputerRegistry, CommandExecutionContext, CommandReturn, EdgeRouterRegistry, MouseListener, SConnectableElement, SModelElement, SRoutingHandle, SwitchEditModeAction, SwitchEditModeCommand } from 'sprotty';
import { FeedbackEdgeEndMovingMouseListener } from './creation-tool-feedback';
import { FeedbackCommand } from './model';
/**
 * RECONNECT HANDLES FEEDBACK
 */
export declare class ShowEdgeReconnectHandlesFeedbackAction implements Action {
    readonly elementId?: string | undefined;
    readonly kind: string;
    constructor(elementId?: string | undefined, kind?: string);
}
export declare class HideEdgeReconnectHandlesFeedbackAction implements Action {
    readonly kind: string;
    constructor(kind?: string);
}
export declare class ShowEdgeReconnectHandlesFeedbackCommand extends FeedbackCommand {
    protected action: ShowEdgeReconnectHandlesFeedbackAction;
    static readonly KIND = "showReconnectHandlesFeedback";
    constructor(action: ShowEdgeReconnectHandlesFeedbackAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
export declare class HideEdgeReconnectHandlesFeedbackCommand extends FeedbackCommand {
    protected action: HideEdgeReconnectHandlesFeedbackAction;
    static readonly KIND = "hideReconnectHandlesFeedback";
    constructor(action: HideEdgeReconnectHandlesFeedbackAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
/**
 * ROUTING FEEDBACK
 */
export declare class SwitchRoutingModeAction extends SwitchEditModeAction {
    readonly elementsToActivate: string[];
    readonly elementsToDeactivate: string[];
    readonly kind: string;
    constructor(elementsToActivate?: string[], elementsToDeactivate?: string[], kind?: string);
}
export declare class SwitchRoutingModeCommand extends SwitchEditModeCommand {
    static KIND: string;
    constructor(action: SwitchRoutingModeAction);
}
/**
 * SOURCE AND TARGET EDGE FEEDBACK
 */
export declare class DrawFeedbackEdgeSourceAction implements Action {
    readonly elementTypeId: string;
    readonly targetId: string;
    readonly kind: string;
    constructor(elementTypeId: string, targetId: string, kind?: string);
}
export declare class DrawFeedbackEdgeSourceCommand extends FeedbackCommand {
    protected action: DrawFeedbackEdgeSourceAction;
    static readonly KIND = "drawFeedbackEdgeSource";
    constructor(action: DrawFeedbackEdgeSourceAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
/**
 * SOURCE AND TARGET MOUSE MOVE LISTENER
 */
export declare class FeedbackEdgeTargetMovingMouseListener extends FeedbackEdgeEndMovingMouseListener {
    protected anchorRegistry: AnchorComputerRegistry;
    constructor(anchorRegistry: AnchorComputerRegistry);
}
export declare class FeedbackEdgeSourceMovingMouseListener extends MouseListener {
    protected anchorRegistry: AnchorComputerRegistry;
    constructor(anchorRegistry: AnchorComputerRegistry);
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    protected computeAbsoluteAnchor(element: SConnectableElement, referencePoint: Point, offset?: number): Point;
}
export declare class FeedbackEdgeRouteMovingMouseListener extends MouseListener {
    protected edgeRouterRegistry?: EdgeRouterRegistry | undefined;
    protected hasDragged: boolean;
    protected lastDragPosition: Point | undefined;
    constructor(edgeRouterRegistry?: EdgeRouterRegistry | undefined);
    mouseDown(target: SModelElement, event: MouseEvent): Action[];
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    protected getHandlePosition(handle: SRoutingHandle): Point | undefined;
    mouseEnter(target: SModelElement, event: MouseEvent): Action[];
    mouseUp(_target: SModelElement, event: MouseEvent): Action[];
    decorate(vnode: VNode, _element: SModelElement): VNode;
}
//# sourceMappingURL=edge-edit-tool-feedback.d.ts.map