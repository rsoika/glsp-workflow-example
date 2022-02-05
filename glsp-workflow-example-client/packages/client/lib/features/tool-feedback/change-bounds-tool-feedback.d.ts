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
import { CommandExecutionContext, CommandReturn, MouseListener, MoveAction, SModelElement, SModelRoot } from 'sprotty';
import { ChangeBoundsTool } from '../tools/change-bounds-tool';
import { FeedbackCommand } from './model';
export declare class ShowChangeBoundsToolResizeFeedbackAction implements Action {
    readonly elementId?: string | undefined;
    readonly kind: string;
    constructor(elementId?: string | undefined, kind?: string);
}
export declare class HideChangeBoundsToolResizeFeedbackAction implements Action {
    readonly kind: string;
    constructor(kind?: string);
}
export declare class ShowChangeBoundsToolResizeFeedbackCommand extends FeedbackCommand {
    static readonly KIND = "showChangeBoundsToolResizeFeedback";
    protected action: ShowChangeBoundsToolResizeFeedbackAction;
    execute(context: CommandExecutionContext): CommandReturn;
}
export declare class HideChangeBoundsToolResizeFeedbackCommand extends FeedbackCommand {
    static readonly KIND = "hideChangeBoundsToolResizeFeedback";
    protected action: HideChangeBoundsToolResizeFeedbackAction;
    execute(context: CommandExecutionContext): CommandReturn;
}
/**
 * This mouse listener provides visual feedback for moving by sending client-side
 * `MoveAction`s while elements are selected and dragged. This will also update
 * their bounds, which is important, as it is not only required for rendering
 * the visual feedback but also the basis for sending the change to the server
 * (see also `tools/MoveTool`).
 */
export declare class FeedbackMoveMouseListener extends MouseListener {
    protected tool: ChangeBoundsTool;
    protected hasDragged: boolean;
    protected startDragPosition: Point | undefined;
    protected elementId2startPos: Map<string, Point>;
    constructor(tool: ChangeBoundsTool);
    mouseDown(target: SModelElement, event: MouseEvent): Action[];
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    protected collectStartPositions(root: SModelRoot): void;
    protected isChildOfSelected(selectedElements: Set<SModelElement>, element: SModelElement): boolean;
    protected getElementMoves(target: SModelElement, event: MouseEvent, isFinished: boolean): MoveAction | undefined;
    protected validateMove(startPostion: Point, toPosition: Point, element: SModelElement, isFinished: boolean): Point;
    protected snap(position: Point, element: SModelElement, isSnap: boolean): Point;
    mouseEnter(target: SModelElement, event: MouseEvent): Action[];
    mouseUp(target: SModelElement, event: MouseEvent): Action[];
    decorate(vnode: VNode, _element: SModelElement): VNode;
}
//# sourceMappingURL=change-bounds-tool-feedback.d.ts.map