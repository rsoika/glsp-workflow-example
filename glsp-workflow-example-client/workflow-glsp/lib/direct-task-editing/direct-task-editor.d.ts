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
import { AbstractUIExtension, Action, AutoCompleteWidget, EditorContextService, GLSPActionDispatcher, ILogger, LabeledAction, SModelRoot, ValidationStatus, ViewerOptions } from '@eclipse-glsp/client';
import { DOMHelper } from 'sprotty/lib/base/views/dom-helper';
import { TaskNode } from '../model';
export declare class ApplyTaskEditOperation implements Action {
    readonly taskId: string;
    readonly expression: string;
    static readonly KIND = "applyTaskEdit";
    readonly kind = "applyTaskEdit";
    constructor(taskId: string, expression: string);
}
export declare class TaskEditor extends AbstractUIExtension {
    static readonly ID = "task-editor";
    readonly autoSuggestionSettings: {
        noSuggestionsMessage: string;
        suggestionsClass: string;
        debounceWaitMs: number;
        showOnFocus: boolean;
    };
    protected actionDispatcher: GLSPActionDispatcher;
    protected editorContextService: EditorContextService;
    protected viewerOptions: ViewerOptions;
    protected domHelper: DOMHelper;
    protected logger: ILogger;
    protected task: TaskNode;
    protected autoSuggestion: AutoCompleteWidget;
    id(): string;
    containerClass(): string;
    protected initializeContents(containerElement: HTMLElement): void;
    show(root: Readonly<SModelRoot>, ...contextElementIds: string[]): void;
    protected onBeforeShow(containerElement: HTMLElement, root: Readonly<SModelRoot>, ...contextElementIds: string[]): void;
    protected setPosition(containerElement: HTMLElement): void;
    protected retrieveSuggestions(input: string): Promise<LabeledAction[]>;
    protected validateInput(input: string): Promise<ValidationStatus>;
    protected executeFromSuggestion(input: LabeledAction | Action[] | Action): void;
    protected executeFromTextOnlyInput(input: string): void;
    hide(): void;
}
//# sourceMappingURL=direct-task-editor.d.ts.map