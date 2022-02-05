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
import { Action, SelectAction, SelectAllAction } from '@eclipse-glsp/protocol';
import { Command, CommandExecutionContext, ILogger, SModelElement, SModelRoot, SParentElement } from 'sprotty';
import { SModelRootListener } from '../../base/model/update-model-command';
import { IFeedbackActionDispatcher } from '../tool-feedback/feedback-action-dispatcher';
export interface SelectionListener {
    selectionChanged(root: Readonly<SModelRoot>, selectedElements: string[]): void;
}
export declare class SelectionService implements SModelRootListener {
    protected selectionListeners: SelectionListener[];
    private root;
    private selectedElementIDs;
    protected feedbackDispatcher: IFeedbackActionDispatcher;
    protected logger: ILogger;
    constructor(selectionListeners?: SelectionListener[]);
    register(selectionListener: SelectionListener): void;
    deregister(selectionListener: SelectionListener): void;
    modelRootChanged(root: Readonly<SModelRoot>): void;
    updateSelection(root: Readonly<SModelRoot>, select: string[], deselect: string[]): void;
    dispatchFeedback(actions: Action[]): void;
    notifyListeners(root: SModelRoot, selectedElementIDs: Set<string>): void;
    getModelRoot(): Readonly<SModelRoot>;
    getSelectedElements(): Readonly<SModelElement>[];
    /**
     * QUERY METHODS
     */
    getSelectedElementIDs(): Set<string>;
    hasSelectedElements(): boolean;
    isSingleSelection(): boolean;
    isMultiSelection(): boolean;
}
export declare class SelectCommand extends Command {
    action: SelectAction;
    selectionService: SelectionService;
    static readonly KIND = "elementSelected";
    protected selected: SModelElement[];
    protected deselected: SModelElement[];
    constructor(action: SelectAction, selectionService: SelectionService);
    execute(context: CommandExecutionContext): SModelRoot;
    undo(context: CommandExecutionContext): SModelRoot;
    redo(context: CommandExecutionContext): SModelRoot;
}
export declare class SelectAllCommand extends Command {
    action: SelectAllAction;
    selectionService: SelectionService;
    static readonly KIND = "allSelected";
    protected previousSelection: Map<string, boolean>;
    constructor(action: SelectAllAction, selectionService: SelectionService);
    execute(context: CommandExecutionContext): SModelRoot;
    undo(context: CommandExecutionContext): SModelRoot;
    redo(context: CommandExecutionContext): SModelRoot;
    protected selectAll(element: SParentElement, newState: boolean, selected: string[]): void;
}
//# sourceMappingURL=selection-service.d.ts.map