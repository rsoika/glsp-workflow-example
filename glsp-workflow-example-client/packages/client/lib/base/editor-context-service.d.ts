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
import { Action, Args, EditorContext } from '@eclipse-glsp/protocol';
import { IActionHandler, ModelSource, MousePositionTracker, SModelElement, SModelRoot } from 'sprotty';
import { SelectionService } from '../features/select/selection-service';
export interface EditModeListener {
    editModeChanged(newValue: string, oldvalue: string): void;
}
export declare class EditorContextService implements IActionHandler {
    protected editModeListeners: EditModeListener[];
    protected selectionService: SelectionService;
    protected mousePositionTracker: MousePositionTracker;
    protected modelSource: () => Promise<ModelSource>;
    protected _editMode: string;
    constructor(editModeListeners?: EditModeListener[]);
    register(editModeListener: EditModeListener): void;
    deregister(editModeListener: EditModeListener): void;
    get(args?: Args): EditorContext;
    getWithSelection(selectedElementIds: string[], args?: Args): EditorContext;
    handle(action: Action): void;
    protected notifiyEditModeListeners(oldValue: string): void;
    getSourceUri(): Promise<string | undefined>;
    get editMode(): string;
    get modelRoot(): Readonly<SModelRoot>;
    get selectedElements(): Readonly<SModelElement>[];
    get isReadonly(): boolean;
}
export declare type EditorContextServiceProvider = () => Promise<EditorContextService>;
//# sourceMappingURL=editor-context-service.d.ts.map