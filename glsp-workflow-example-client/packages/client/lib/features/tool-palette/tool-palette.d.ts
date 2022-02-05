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
import { SetContextActions } from '@eclipse-glsp/protocol';
import { AbstractUIExtension, Action, IActionHandler, ICommand, IToolManager, SModelRoot } from 'sprotty';
import { GLSPActionDispatcher } from '../../base/action-dispatcher';
import { EditModeListener, EditorContextService } from '../../base/editor-context-service';
import { PaletteItem } from './palette-item';
export declare class EnableToolPaletteAction implements Action {
    static readonly KIND = "enableToolPalette";
    readonly kind = "enableToolPalette";
}
export declare class ToolPalette extends AbstractUIExtension implements IActionHandler, EditModeListener {
    static readonly ID = "tool-palette";
    protected readonly actionDispatcher: GLSPActionDispatcher;
    protected readonly toolManager: IToolManager;
    protected readonly editorContext: EditorContextService;
    protected paletteItems: PaletteItem[];
    protected paletteItemsCopy: PaletteItem[];
    protected bodyDiv?: HTMLElement;
    protected lastActivebutton?: HTMLElement;
    protected defaultToolsButton: HTMLElement;
    protected searchField: HTMLInputElement;
    modelRootId: string;
    id(): string;
    containerClass(): string;
    postConstruct(): void;
    initialize(): boolean;
    protected initializeContents(_containerElement: HTMLElement): void;
    protected onBeforeShow(_containerElement: HTMLElement, root: Readonly<SModelRoot>): void;
    protected addMinimizePaletteButton(): void;
    protected updateMinimizePaletteButtonTooltip(button: HTMLDivElement): void;
    protected isPaletteMaximized(): boolean;
    protected createBody(): void;
    protected createHeader(): void;
    private createHeaderTools;
    protected createDefaultToolButton(): HTMLElement;
    protected createMouseDeleteToolButton(): HTMLElement;
    protected createMarqueeToolButton(): HTMLElement;
    protected createValidateButton(): HTMLElement;
    protected createSearchButton(): HTMLElement;
    protected createHeaderSearchField(): HTMLInputElement;
    protected createHeaderTitle(): HTMLElement;
    protected createToolButton(item: PaletteItem, index: number): HTMLElement;
    protected onClickCreateToolButton(button: HTMLElement, item: PaletteItem): (_ev: MouseEvent) => void;
    protected onClickStaticToolButton(button: HTMLElement, toolId?: string): (_ev: MouseEvent) => void;
    changeActiveButton(button?: HTMLElement): void;
    handle(action: Action): ICommand | Action | void;
    editModeChanged(_oldValue: string, _newValue: string): void;
    protected clearOnEscape(event: KeyboardEvent): void;
    protected clearToolOnEscape(event: KeyboardEvent): void;
    protected handleSetContextActions(action: SetContextActions): void;
    protected requestFilterUpdate(filter: string): void;
}
export declare function compare(a: PaletteItem, b: PaletteItem): number;
export declare function createIcon(codiconId: string): HTMLElement;
export declare function createToolGroup(item: PaletteItem): HTMLElement;
export declare function changeCSSClass(element: Element, css: string): void;
export declare function changeCodiconClass(element: Element, codiconId: string): void;
//# sourceMappingURL=tool-palette.d.ts.map