"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var EnableToolPaletteAction_1, ToolPalette_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeCodiconClass = exports.changeCSSClass = exports.createToolGroup = exports.createIcon = exports.compare = exports.ToolPalette = exports.EnableToolPaletteAction = void 0;
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
const protocol_1 = require("@eclipse-glsp/protocol");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const codicon_1 = require("sprotty/lib/utils/codicon");
const keyboard_1 = require("sprotty/lib/utils/keyboard");
const action_dispatcher_1 = require("../../base/action-dispatcher");
const editor_context_service_1 = require("../../base/editor-context-service");
const delete_tool_1 = require("../tools/delete-tool");
const marquee_mouse_tool_1 = require("../tools/marquee-mouse-tool");
const CLICKED_CSS_CLASS = 'clicked';
const SEARCH_ICON_ID = 'search';
const PALETTE_ICON_ID = 'symbol-color';
const CHEVRON_DOWN_ICON_ID = 'chevron-right';
const PALETTE_HEIGHT = '500px';
let EnableToolPaletteAction = EnableToolPaletteAction_1 = class EnableToolPaletteAction {
    constructor() {
        this.kind = EnableToolPaletteAction_1.KIND;
    }
};
EnableToolPaletteAction.KIND = 'enableToolPalette';
EnableToolPaletteAction = EnableToolPaletteAction_1 = __decorate([
    inversify_1.injectable()
], EnableToolPaletteAction);
exports.EnableToolPaletteAction = EnableToolPaletteAction;
let ToolPalette = ToolPalette_1 = class ToolPalette extends sprotty_1.AbstractUIExtension {
    constructor() {
        super(...arguments);
        this.paletteItemsCopy = [];
    }
    id() {
        return ToolPalette_1.ID;
    }
    containerClass() {
        return ToolPalette_1.ID;
    }
    postConstruct() {
        this.editorContext.register(this);
    }
    initialize() {
        if (!this.paletteItems) {
            return false;
        }
        return super.initialize();
    }
    initializeContents(_containerElement) {
        this.createHeader();
        this.createBody();
        this.lastActivebutton = this.defaultToolsButton;
    }
    onBeforeShow(_containerElement, root) {
        this.modelRootId = root.id;
        this.containerElement.style.maxHeight = PALETTE_HEIGHT;
    }
    addMinimizePaletteButton() {
        const baseDiv = document.getElementById(this.options.baseDiv);
        const minPaletteDiv = document.createElement('div');
        minPaletteDiv.classList.add('minimize-palette-button');
        this.containerElement.classList.add('collapsible-palette');
        if (baseDiv) {
            const insertedDiv = baseDiv.insertBefore(minPaletteDiv, baseDiv.firstChild);
            const minimizeIcon = createIcon(CHEVRON_DOWN_ICON_ID);
            this.updateMinimizePaletteButtonTooltip(minPaletteDiv);
            minimizeIcon.onclick = _event => {
                if (this.isPaletteMaximized()) {
                    this.containerElement.style.maxHeight = '0px';
                }
                else {
                    this.containerElement.style.maxHeight = PALETTE_HEIGHT;
                }
                this.updateMinimizePaletteButtonTooltip(minPaletteDiv);
                changeCodiconClass(minimizeIcon, PALETTE_ICON_ID);
                changeCodiconClass(minimizeIcon, CHEVRON_DOWN_ICON_ID);
            };
            insertedDiv.appendChild(minimizeIcon);
        }
    }
    updateMinimizePaletteButtonTooltip(button) {
        if (this.isPaletteMaximized()) {
            button.title = 'Minimize palette';
        }
        else {
            button.title = 'Maximize palette';
        }
    }
    isPaletteMaximized() {
        return this.containerElement && this.containerElement.style.maxHeight !== '0px';
    }
    createBody() {
        const bodyDiv = document.createElement('div');
        bodyDiv.classList.add('palette-body');
        let tabIndex = 0;
        this.paletteItems.sort(compare).forEach(item => {
            if (item.children) {
                const group = createToolGroup(item);
                item.children.sort(compare).forEach(child => group.appendChild(this.createToolButton(child, tabIndex++)));
                bodyDiv.appendChild(group);
            }
            else {
                bodyDiv.appendChild(this.createToolButton(item, tabIndex++));
            }
        });
        if (this.paletteItems.length === 0) {
            const noResultsDiv = document.createElement('div');
            noResultsDiv.innerText = 'No results found.';
            noResultsDiv.classList.add('tool-button');
            bodyDiv.appendChild(noResultsDiv);
        }
        // Remove existing body to refresh filtered entries
        if (this.bodyDiv) {
            this.containerElement.removeChild(this.bodyDiv);
        }
        this.containerElement.appendChild(bodyDiv);
        this.bodyDiv = bodyDiv;
    }
    createHeader() {
        this.addMinimizePaletteButton();
        const headerCompartment = document.createElement('div');
        headerCompartment.classList.add('palette-header');
        headerCompartment.append(this.createHeaderTitle());
        headerCompartment.appendChild(this.createHeaderTools());
        headerCompartment.appendChild((this.searchField = this.createHeaderSearchField()));
        this.containerElement.appendChild(headerCompartment);
    }
    createHeaderTools() {
        const headerTools = document.createElement('div');
        headerTools.classList.add('header-tools');
        this.defaultToolsButton = this.createDefaultToolButton();
        headerTools.appendChild(this.defaultToolsButton);
        const deleteToolButton = this.createMouseDeleteToolButton();
        headerTools.appendChild(deleteToolButton);
        const marqueeToolButton = this.createMarqueeToolButton();
        headerTools.appendChild(marqueeToolButton);
        const validateActionButton = this.createValidateButton();
        headerTools.appendChild(validateActionButton);
        // Create button for Search
        const searchIcon = this.createSearchButton();
        headerTools.appendChild(searchIcon);
        return headerTools;
    }
    createDefaultToolButton() {
        const button = createIcon('inspect');
        button.id = 'btn_default_tools';
        button.title = 'Enable selection tool';
        button.onclick = this.onClickStaticToolButton(this.defaultToolsButton);
        return button;
    }
    createMouseDeleteToolButton() {
        const deleteToolButton = createIcon('chrome-close');
        deleteToolButton.title = 'Enable deletion tool';
        deleteToolButton.onclick = this.onClickStaticToolButton(deleteToolButton, delete_tool_1.MouseDeleteTool.ID);
        return deleteToolButton;
    }
    createMarqueeToolButton() {
        const marqueeToolButton = createIcon('screen-full');
        marqueeToolButton.title = 'Enable marquee tool';
        marqueeToolButton.onclick = this.onClickStaticToolButton(marqueeToolButton, marquee_mouse_tool_1.MarqueeMouseTool.ID);
        return marqueeToolButton;
    }
    createValidateButton() {
        const validateActionButton = createIcon('pass');
        validateActionButton.title = 'Validate model';
        validateActionButton.onclick = _event => {
            const modelIds = [this.modelRootId];
            this.actionDispatcher.dispatch(new protocol_1.RequestMarkersAction(modelIds));
        };
        return validateActionButton;
    }
    createSearchButton() {
        const searchIcon = createIcon(SEARCH_ICON_ID);
        searchIcon.onclick = _ev => {
            const searchField = document.getElementById(this.containerElement.id + '_search_field');
            if (searchField) {
                if (searchField.style.display === 'none') {
                    searchField.style.display = '';
                    searchField.focus();
                }
                else {
                    searchField.style.display = 'none';
                }
            }
        };
        searchIcon.classList.add('search-icon');
        searchIcon.title = 'Filter palette entries';
        return searchIcon;
    }
    createHeaderSearchField() {
        const searchField = document.createElement('input');
        searchField.classList.add('search-input');
        searchField.id = this.containerElement.id + '_search_field';
        searchField.type = 'text';
        searchField.placeholder = ' Search...';
        searchField.style.display = 'none';
        searchField.onkeyup = () => this.requestFilterUpdate(this.searchField.value);
        searchField.onkeydown = ev => this.clearOnEscape(ev);
        return searchField;
    }
    createHeaderTitle() {
        const header = document.createElement('div');
        header.classList.add('header-icon');
        header.appendChild(createIcon(PALETTE_ICON_ID));
        header.insertAdjacentText('beforeend', 'Palette');
        return header;
    }
    createToolButton(item, index) {
        const button = document.createElement('div');
        button.tabIndex = index;
        button.classList.add('tool-button');
        if (item.icon) {
            button.appendChild(createIcon(item.icon));
        }
        button.insertAdjacentText('beforeend', item.label);
        button.onclick = this.onClickCreateToolButton(button, item);
        button.onkeydown = ev => this.clearToolOnEscape(ev);
        return button;
    }
    onClickCreateToolButton(button, item) {
        return (_ev) => {
            if (!this.editorContext.isReadonly) {
                this.actionDispatcher.dispatchAll(item.actions);
                this.changeActiveButton(button);
                button.focus();
            }
        };
    }
    onClickStaticToolButton(button, toolId) {
        return (_ev) => {
            if (!this.editorContext.isReadonly) {
                const action = toolId ? new sprotty_1.EnableToolsAction([toolId]) : new sprotty_1.EnableDefaultToolsAction();
                this.actionDispatcher.dispatch(action);
                this.changeActiveButton(button);
                button.focus();
            }
        };
    }
    changeActiveButton(button) {
        if (this.lastActivebutton) {
            this.lastActivebutton.classList.remove(CLICKED_CSS_CLASS);
        }
        if (button) {
            button.classList.add(CLICKED_CSS_CLASS);
            this.lastActivebutton = button;
        }
        else {
            this.defaultToolsButton.classList.add(CLICKED_CSS_CLASS);
            this.lastActivebutton = this.defaultToolsButton;
        }
    }
    handle(action) {
        if (action.kind === EnableToolPaletteAction.KIND) {
            const requestAction = new protocol_1.RequestContextActions(ToolPalette_1.ID, {
                selectedElementIds: []
            });
            this.actionDispatcher.requestUntil(requestAction).then(response => {
                if (protocol_1.isSetContextActionsAction(response)) {
                    this.paletteItems = response.actions.map(e => e);
                    this.actionDispatcher.dispatch(new sprotty_1.SetUIExtensionVisibilityAction(ToolPalette_1.ID, !this.editorContext.isReadonly));
                }
            });
        }
        else if (action instanceof sprotty_1.EnableDefaultToolsAction) {
            this.changeActiveButton();
            this.restoreFocus();
        }
    }
    editModeChanged(_oldValue, _newValue) {
        this.actionDispatcher.dispatch(new sprotty_1.SetUIExtensionVisibilityAction(ToolPalette_1.ID, !this.editorContext.isReadonly));
    }
    clearOnEscape(event) {
        if (keyboard_1.matchesKeystroke(event, 'Escape')) {
            this.searchField.value = '';
            this.requestFilterUpdate('');
        }
    }
    clearToolOnEscape(event) {
        if (keyboard_1.matchesKeystroke(event, 'Escape')) {
            this.actionDispatcher.dispatch(new sprotty_1.EnableDefaultToolsAction());
        }
    }
    handleSetContextActions(action) {
        this.paletteItems = action.actions.map(e => e);
        this.createBody();
    }
    requestFilterUpdate(filter) {
        // Initialize the copy if it's empty
        if (this.paletteItemsCopy.length === 0) {
            // Creating deep copy
            this.paletteItemsCopy = JSON.parse(JSON.stringify(this.paletteItems));
        }
        // Reset the paletteItems before searching
        this.paletteItems = JSON.parse(JSON.stringify(this.paletteItemsCopy));
        // Filter the entries
        const filteredPaletteItems = [];
        for (const itemGroup of this.paletteItems) {
            if (itemGroup.children) {
                // Fetch the labels according to the filter
                const matchingChildren = itemGroup.children.filter(child => child.label.toLowerCase().includes(filter.toLowerCase()));
                // Add the itemgroup containing the correct entries
                if (matchingChildren.length > 0) {
                    // Clear existing children
                    itemGroup.children.splice(0, itemGroup.children.length);
                    // Push the matching children
                    matchingChildren.forEach(child => itemGroup.children.push(child));
                    filteredPaletteItems.push(itemGroup);
                }
            }
        }
        this.paletteItems = filteredPaletteItems;
        this.createBody();
    }
};
ToolPalette.ID = 'tool-palette';
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcher),
    __metadata("design:type", action_dispatcher_1.GLSPActionDispatcher)
], ToolPalette.prototype, "actionDispatcher", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IToolManager),
    __metadata("design:type", Object)
], ToolPalette.prototype, "toolManager", void 0);
__decorate([
    inversify_1.inject(editor_context_service_1.EditorContextService),
    __metadata("design:type", editor_context_service_1.EditorContextService)
], ToolPalette.prototype, "editorContext", void 0);
__decorate([
    inversify_1.postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ToolPalette.prototype, "postConstruct", null);
ToolPalette = ToolPalette_1 = __decorate([
    inversify_1.injectable()
], ToolPalette);
exports.ToolPalette = ToolPalette;
function compare(a, b) {
    const sortStringBased = a.sortString.localeCompare(b.sortString);
    if (sortStringBased !== 0) {
        return sortStringBased;
    }
    return a.label.localeCompare(b.label);
}
exports.compare = compare;
function createIcon(codiconId) {
    const icon = document.createElement('i');
    icon.classList.add(...codicon_1.codiconCSSClasses(codiconId));
    return icon;
}
exports.createIcon = createIcon;
function createToolGroup(item) {
    const group = document.createElement('div');
    group.classList.add('tool-group');
    group.id = item.id;
    const header = document.createElement('div');
    header.classList.add('group-header');
    if (item.icon) {
        header.appendChild(createIcon(item.icon));
    }
    header.insertAdjacentText('beforeend', item.label);
    header.ondblclick = _ev => {
        const css = 'collapsed';
        changeCSSClass(group, css);
        Array.from(group.children).forEach(child => changeCSSClass(child, css));
        window.getSelection().removeAllRanges();
    };
    group.appendChild(header);
    return group;
}
exports.createToolGroup = createToolGroup;
function changeCSSClass(element, css) {
    element.classList.contains(css) ? element.classList.remove(css) : element.classList.add(css);
}
exports.changeCSSClass = changeCSSClass;
function changeCodiconClass(element, codiconId) {
    element.classList.contains(codicon_1.codiconCSSClasses(codiconId)[1])
        ? element.classList.remove(codicon_1.codiconCSSClasses(codiconId)[1])
        : element.classList.add(codicon_1.codiconCSSClasses(codiconId)[1]);
}
exports.changeCodiconClass = changeCodiconClass;
//# sourceMappingURL=tool-palette.js.map