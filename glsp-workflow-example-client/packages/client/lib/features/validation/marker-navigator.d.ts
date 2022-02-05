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
import { Action, Point } from '@eclipse-glsp/protocol';
import { BoundsAware, CenterCommand, Command, CommandExecutionContext, CommandReturn, IContextMenuItemProvider, KeyListener, MenuItem, Selectable, SIssueMarker, SIssueSeverity, SModelElement, SModelRoot } from 'sprotty';
import { SelectCommand, SelectionService } from '../select/selection-service';
export declare class NavigateToMarkerAction implements Action {
    readonly direction: 'next' | 'previous';
    readonly selectedElementIds?: string[] | undefined;
    readonly severities: SIssueSeverity[];
    kind: string;
    static readonly KIND = "navigateToMarker";
    constructor(direction?: 'next' | 'previous', selectedElementIds?: string[] | undefined, severities?: SIssueSeverity[], kind?: string);
}
export declare class SModelElementComparator {
    compare(_one: SModelElement, _other: SModelElement): number;
}
/** Specifies the order of two selectable and bounds-aware elements left-to-right and top-to-bottom. */
export declare class LeftToRightTopToBottomComparator {
    compare(one: SModelElement, other: SModelElement): number;
}
/**
 * Specifies the next/previous marker in a graph model.
 *
 * This navigator uses a `MarkerComparator` to determine the order of markers. It can also return next/previous
 */
export declare class MarkerNavigator {
    static readonly ALL_SEVERITIES: SIssueSeverity[];
    protected markerComparator: SModelElementComparator;
    next(root: SModelRoot, current?: SModelElement & BoundsAware, predicate?: (marker: SIssueMarker) => boolean): SIssueMarker | undefined;
    previous(root: SModelRoot, current?: SModelElement & BoundsAware, predicate?: (marker: SIssueMarker) => boolean): SIssueMarker | undefined;
    protected getMarkers(root: SModelRoot, predicate: (marker: SIssueMarker) => boolean): SIssueMarker[];
    protected getNextIndex(current: SModelElement & BoundsAware, markers: SIssueMarker[]): number;
    protected getPreviousIndex(current: SModelElement & BoundsAware, markers: SIssueMarker[]): number;
}
export declare class NavigateToMarkerCommand extends Command {
    protected action: NavigateToMarkerAction;
    static KIND: string;
    protected markerComparator: SModelElementComparator;
    protected markerNavigator: MarkerNavigator;
    protected selectionService: SelectionService;
    protected selectCommand: SelectCommand;
    protected centerCommand: CenterCommand;
    constructor(action: NavigateToMarkerAction);
    execute(context: CommandExecutionContext): CommandReturn;
    protected getSelectedElements(root: SModelRoot): (SModelElement & Selectable)[];
    protected getTarget(selected: SModelElement[], root: SModelRoot): SIssueMarker | undefined;
    protected matchesSeverities(marker: SIssueMarker): boolean;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
export declare class MarkerNavigatorContextMenuItemProvider implements IContextMenuItemProvider {
    protected selectionService: SelectionService;
    getItems(root: Readonly<SModelRoot>, lastMousePosition?: Point): Promise<MenuItem[]>;
}
export declare class MarkerNavigatorKeyListener extends KeyListener {
    keyDown(_element: SModelElement, event: KeyboardEvent): Action[];
}
//# sourceMappingURL=marker-navigator.d.ts.map