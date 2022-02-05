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
import { Action, Bounds, Point } from '@eclipse-glsp/protocol';
import { BoundsAware, Dimension, EdgeRouterRegistry, ElementAndBounds, ISnapper, MouseListener, SModelElement, SModelRoot, SParentElement } from 'sprotty';
import { DragAwareMouseListener } from '../../base/drag-aware-mouse-listener';
import { WriteablePoint } from '../../utils/layout-utils';
import { Resizable, SResizeHandle } from '../change-bounds/model';
import { IMovementRestrictor } from '../change-bounds/movement-restrictor';
import { SelectionListener, SelectionService } from '../select/selection-service';
import { BaseGLSPTool } from './base-glsp-tool';
/**
 * The change bounds tool has the license to move multiple elements or resize a single element by implementing the ChangeBounds operation.
 * In contrast to Sprotty's implementation this tool only sends a `ChangeBoundsOperationAction` when an operation has finished and does not
 * provide client-side live updates to improve performance.
 *
 * | Operation | Client Update    | Server Update
 * +-----------+------------------+----------------------------
 * | Move      | MoveAction       | ChangeBoundsOperationAction
 * | Resize    | SetBoundsAction  | ChangeBoundsOperationAction
 *
 * To provide a visual client updates during move we install the `FeedbackMoveMouseListener` and to provide visual client updates during
 * resize and send the server updates we install the `ChangeBoundsListener`.
 */
export declare class ChangeBoundsTool extends BaseGLSPTool {
    static ID: string;
    protected selectionService: SelectionService;
    readonly edgeRouterRegistry?: EdgeRouterRegistry;
    readonly snapper?: ISnapper;
    readonly movementRestrictor?: IMovementRestrictor;
    protected feedbackMoveMouseListener: MouseListener;
    protected changeBoundsListener: MouseListener & SelectionListener;
    get id(): string;
    enable(): void;
    protected createMoveMouseListener(): MouseListener;
    protected createChangeBoundsListener(): MouseListener & SelectionListener;
    disable(): void;
}
export declare class ChangeBoundsListener extends DragAwareMouseListener implements SelectionListener {
    protected tool: ChangeBoundsTool;
    static readonly CSS_CLASS_ACTIVE = "active";
    protected initialBounds: Bounds | undefined;
    protected lastDragPosition?: Point;
    protected positionDelta: WriteablePoint;
    protected activeResizeElement?: SModelElement;
    protected activeResizeHandle?: SResizeHandle;
    constructor(tool: ChangeBoundsTool);
    mouseDown(target: SModelElement, event: MouseEvent): Action[];
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    draggingMouseUp(target: SModelElement, event: MouseEvent): Action[];
    protected handleMoveOnServer(target: SModelElement): Action[];
    protected handleMoveElementsOnServer(target: SModelElement): Action[];
    protected isChildOfSelected(selectedElements: Set<SModelElement>, element: SModelElement): boolean;
    protected handleMoveRoutingPointsOnServer(target: SModelElement): Action[];
    protected handleResize(activeResizeHandle: SResizeHandle): Action[];
    selectionChanged(root: SModelRoot, selectedElements: string[]): void;
    protected setActiveResizeElement(target: SModelElement): boolean;
    protected isActiveResizeElement(element?: SModelElement): element is SParentElement & BoundsAware;
    protected initPosition(event: MouseEvent): void;
    protected updatePosition(target: SModelElement, event: MouseEvent): Point | undefined;
    protected reset(): void;
    protected resetPosition(): void;
    protected handleResizeOnClient(positionUpdate: Point): Action[];
    protected handleTopLeftResize(resizeElement: SParentElement & Resizable, positionUpdate: Point): Action[];
    protected handleTopRightResize(resizeElement: SParentElement & Resizable, positionUpdate: Point): Action[];
    protected handleBottomLeftResize(resizeElement: SParentElement & Resizable, positionUpdate: Point): Action[];
    protected handleBottomRightResize(resizeElement: SParentElement & Resizable, positionUpdate: Point): Action[];
    protected createChangeBoundsAction(element: SModelElement & BoundsAware): Action[];
    protected createElementAndBounds(element: SModelElement & BoundsAware): ElementAndBounds[];
    protected createSetBoundsAction(element: SModelElement & BoundsAware, x: number, y: number, width: number, height: number): Action[];
    protected snap(position: Point, element: SModelElement, isSnap: boolean): Point;
    protected isValidBoundChange(element: SModelElement & BoundsAware, newPosition: Point, newSize: Dimension): boolean;
    protected isValidSize(element: SModelElement & BoundsAware, size: Dimension): boolean;
    protected isValidMove(element: SModelElement & BoundsAware, newPosition: Point): boolean;
}
//# sourceMappingURL=change-bounds-tool.d.ts.map