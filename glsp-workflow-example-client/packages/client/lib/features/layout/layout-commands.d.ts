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
import { Action, ElementAndBounds } from '@eclipse-glsp/protocol';
import { Command, CommandExecutionContext, CommandReturn, ElementMove, IActionDispatcher, SModelElement } from 'sprotty';
import { WriteableElementAndBounds, WriteableElementMove } from '../../utils/layout-utils';
import { BoundsAwareModelElement } from '../../utils/smodel-util';
import { IMovementRestrictor } from '../change-bounds/movement-restrictor';
import { SelectionService } from '../select/selection-service';
export declare enum ResizeDimension {
    Width = 0,
    Height = 1,
    Width_And_Height = 2
}
export declare namespace Reduce {
    function min(...values: number[]): number;
    function max(...values: number[]): number;
    function avg(...values: number[]): number;
    function first(...values: number[]): number;
    function last(...values: number[]): number;
}
export declare class ResizeElementsAction implements Action {
    /**
     * IDs of the elements that should be resized. If no IDs are given, the selected elements will be resized.
     */
    readonly elementIds: string[];
    /**
     * Resize dimension.
     */
    readonly dimension: ResizeDimension;
    /**
     * Function to reduce the dimension to a target dimension value, see Reduce.* for potential functions.
     */
    readonly reductionFunction: (...values: number[]) => number;
    readonly kind: string;
    constructor(
    /**
     * IDs of the elements that should be resized. If no IDs are given, the selected elements will be resized.
     */
    elementIds: string[], 
    /**
     * Resize dimension.
     */
    dimension: ResizeDimension, 
    /**
     * Function to reduce the dimension to a target dimension value, see Reduce.* for potential functions.
     */
    reductionFunction: (...values: number[]) => number, kind?: string);
}
export declare enum Alignment {
    Left = 0,
    Center = 1,
    Right = 2,
    Top = 3,
    Middle = 4,
    Bottom = 5
}
export declare namespace Select {
    function all(elements: BoundsAwareModelElement[]): BoundsAwareModelElement[];
    function first(elements: BoundsAwareModelElement[]): BoundsAwareModelElement[];
    function last(elements: BoundsAwareModelElement[]): BoundsAwareModelElement[];
}
export declare class AlignElementsAction implements Action {
    /**
     * IDs of the elements that should be aligned. If no IDs are given, the selected elements will be aligned.
     */
    readonly elementIds: string[];
    /**
     * Alignment direction.
     */
    readonly alignment: Alignment;
    /**
     * Function to selected elements that are considered during alignment calculation, see Select.* for potential functions.
     */
    readonly selectionFunction: (elements: BoundsAwareModelElement[]) => BoundsAwareModelElement[];
    readonly kind: string;
    constructor(
    /**
     * IDs of the elements that should be aligned. If no IDs are given, the selected elements will be aligned.
     */
    elementIds?: string[], 
    /**
     * Alignment direction.
     */
    alignment?: Alignment, 
    /**
     * Function to selected elements that are considered during alignment calculation, see Select.* for potential functions.
     */
    selectionFunction?: (elements: BoundsAwareModelElement[]) => BoundsAwareModelElement[], kind?: string);
}
declare abstract class LayoutElementsCommand extends Command {
    protected action: ResizeElementsAction | AlignElementsAction;
    protected actionDispatcher: IActionDispatcher;
    protected selectionService: SelectionService;
    readonly movementRestrictor?: IMovementRestrictor | undefined;
    constructor(action: ResizeElementsAction | AlignElementsAction, actionDispatcher: IActionDispatcher, selectionService: SelectionService, movementRestrictor?: IMovementRestrictor | undefined);
    getActionElements(context: CommandExecutionContext): BoundsAwareModelElement[];
    protected abstract isActionElement(element: SModelElement): element is BoundsAwareModelElement;
    dispatchAction(action: Action): void;
    dispatchActions(actions: Action[]): void;
}
export declare class ResizeElementsCommand extends LayoutElementsCommand {
    protected action: ResizeElementsAction;
    protected actionDispatcher: IActionDispatcher;
    protected selectionService: SelectionService;
    readonly movementRestrictor?: IMovementRestrictor | undefined;
    static readonly KIND = "layout:resize";
    constructor(action: ResizeElementsAction, actionDispatcher: IActionDispatcher, selectionService: SelectionService, movementRestrictor?: IMovementRestrictor | undefined);
    protected isActionElement(element: SModelElement): element is BoundsAwareModelElement;
    execute(context: CommandExecutionContext): CommandReturn;
    resizeWidth(elements: BoundsAwareModelElement[]): void;
    resizeHeight(elements: BoundsAwareModelElement[]): void;
    resizeWidthAndHeight(elements: BoundsAwareModelElement[]): void;
    dispatchResizeActions(elements: BoundsAwareModelElement[], change: (element: BoundsAwareModelElement, bounds: WriteableElementAndBounds) => void): void;
    createElementAndBounds(element: BoundsAwareModelElement, change: (_element: BoundsAwareModelElement, _bounds: WriteableElementAndBounds) => void): WriteableElementAndBounds | undefined;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
export declare class AlignElementsCommand extends LayoutElementsCommand {
    protected action: AlignElementsAction;
    protected actionDispatcher: IActionDispatcher;
    protected selectionService: SelectionService;
    readonly movementRestrictor?: IMovementRestrictor | undefined;
    static readonly KIND = "layout:align";
    constructor(action: AlignElementsAction, actionDispatcher: IActionDispatcher, selectionService: SelectionService, movementRestrictor?: IMovementRestrictor | undefined);
    protected isActionElement(element: SModelElement): element is BoundsAwareModelElement;
    execute(context: CommandExecutionContext): CommandReturn;
    alignLeft(elements: BoundsAwareModelElement[]): void;
    alignCenter(elements: BoundsAwareModelElement[]): void;
    alignRight(elements: BoundsAwareModelElement[]): void;
    alignTop(elements: BoundsAwareModelElement[]): void;
    alignMiddle(elements: BoundsAwareModelElement[]): void;
    alignBottom(elements: BoundsAwareModelElement[]): void;
    dispatchAlignActions(elements: BoundsAwareModelElement[], change: (element: BoundsAwareModelElement, move: WriteableElementMove) => void): void;
    createElementMove(element: BoundsAwareModelElement, change: (_element: BoundsAwareModelElement, _move: WriteableElementMove) => void): WriteableElementMove | undefined;
    createElementAndBounds(element: BoundsAwareModelElement, move: ElementMove): ElementAndBounds;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
export {};
//# sourceMappingURL=layout-commands.d.ts.map