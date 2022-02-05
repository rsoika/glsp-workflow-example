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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectAllCommand = exports.SelectCommand = exports.SelectionService = void 0;
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
const types_1 = require("../../base/types");
const select_feedback_action_1 = require("./select-feedback-action");
let SelectionService = class SelectionService {
    constructor(selectionListeners = []) {
        this.selectionListeners = selectionListeners;
        this.selectedElementIDs = new Set();
    }
    register(selectionListener) {
        protocol_1.distinctAdd(this.selectionListeners, selectionListener);
    }
    deregister(selectionListener) {
        protocol_1.remove(this.selectionListeners, selectionListener);
    }
    modelRootChanged(root) {
        this.updateSelection(root, [], []);
    }
    updateSelection(root, select, deselect) {
        if (root === undefined && select.length === 0 && deselect.length === 0) {
            return;
        }
        const prevRoot = this.root;
        const prevSelectedElementIDs = new Set(this.selectedElementIDs);
        // update root
        this.root = root;
        // update selected element IDs and collect deselected elements
        // - select all elements that are not deselected at the same time (no-op)
        // - deselect all elements that are not selected at the same time (no-op) but was selected
        const toSelect = [...select].filter(selectId => deselect.indexOf(selectId) === -1);
        const toDeselect = [...deselect].filter(deselectId => select.indexOf(deselectId) === -1 && this.selectedElementIDs.has(deselectId));
        for (const id of toDeselect) {
            this.selectedElementIDs.delete(id);
        }
        for (const id of toSelect) {
            this.selectedElementIDs.add(id);
        }
        const deselectedElementIDs = new Set(toDeselect);
        // see if selected elements still exist in the updated root
        for (const id of this.selectedElementIDs) {
            const element = root.index.getById(id);
            if (element === undefined) {
                this.selectedElementIDs.delete(id);
                if (prevRoot !== undefined && prevRoot.index.getById(id)) {
                    deselectedElementIDs.add(id);
                }
            }
        }
        // only send out changes if there actually are changes, i.e., the root or the selected elements changed
        const selectionChanged = prevSelectedElementIDs.size !== this.selectedElementIDs.size ||
            ![...prevSelectedElementIDs].every(value => this.selectedElementIDs.has(value));
        if (selectionChanged) {
            // aggregate to feedback action handling all elements as only the last feedback is restored
            this.dispatchFeedback([new select_feedback_action_1.SelectFeedbackAction([...this.selectedElementIDs], [...deselectedElementIDs])]);
        }
        const rootChanged = prevRoot !== root;
        if (rootChanged || selectionChanged) {
            // notify listeners after the feedback action
            this.notifyListeners(this.root, this.selectedElementIDs);
        }
    }
    dispatchFeedback(actions) {
        this.feedbackDispatcher.registerFeedback(this, actions);
    }
    notifyListeners(root, selectedElementIDs) {
        this.selectionListeners.forEach(listener => listener.selectionChanged(root, Array.from(selectedElementIDs)));
    }
    getModelRoot() {
        return this.root;
    }
    getSelectedElements() {
        return Array.from(this.root.index.all().filter(sprotty_1.isSelected));
    }
    /**
     * QUERY METHODS
     */
    getSelectedElementIDs() {
        return this.selectedElementIDs;
    }
    hasSelectedElements() {
        return this.selectedElementIDs.size > 0;
    }
    isSingleSelection() {
        return this.selectedElementIDs.size === 1;
    }
    isMultiSelection() {
        return this.selectedElementIDs.size > 1;
    }
};
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher),
    __metadata("design:type", Object)
], SelectionService.prototype, "feedbackDispatcher", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ILogger),
    __metadata("design:type", Object)
], SelectionService.prototype, "logger", void 0);
SelectionService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.multiInject(types_1.GLSP_TYPES.SelectionListener)), __param(0, inversify_1.optional()),
    __metadata("design:paramtypes", [Array])
], SelectionService);
exports.SelectionService = SelectionService;
let SelectCommand = class SelectCommand extends sprotty_1.Command {
    constructor(action, selectionService) {
        super();
        this.action = action;
        this.selectionService = selectionService;
        this.selected = [];
        this.deselected = [];
    }
    execute(context) {
        const model = context.root;
        this.action.selectedElementsIDs.forEach(id => {
            const element = model.index.getById(id);
            if (element instanceof sprotty_1.SChildElement && sprotty_1.isSelectable(element)) {
                this.selected.push(element);
            }
        });
        this.action.deselectedElementsIDs.forEach(id => {
            const element = model.index.getById(id);
            if (element instanceof sprotty_1.SChildElement && sprotty_1.isSelectable(element)) {
                this.deselected.push(element);
            }
        });
        return this.redo(context);
    }
    undo(context) {
        const select = this.deselected.map(element => element.id);
        const deselect = this.selected.map(element => element.id);
        this.selectionService.updateSelection(context.root, select, deselect);
        return context.root;
    }
    redo(context) {
        const select = this.selected.map(element => element.id);
        const deselect = this.deselected.map(element => element.id);
        this.selectionService.updateSelection(context.root, select, deselect);
        return context.root;
    }
};
SelectCommand.KIND = sprotty_1.SelectCommand.KIND;
SelectCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __param(1, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
    __metadata("design:paramtypes", [protocol_1.SelectAction,
        SelectionService])
], SelectCommand);
exports.SelectCommand = SelectCommand;
let SelectAllCommand = class SelectAllCommand extends sprotty_1.Command {
    constructor(action, selectionService) {
        super();
        this.action = action;
        this.selectionService = selectionService;
        this.previousSelection = new Map();
    }
    execute(context) {
        return this.redo(context);
    }
    undo(context) {
        const index = context.root.index;
        for (const previousState of this.previousSelection) {
            const element = index.getById(previousState[0]);
            if (element !== undefined && sprotty_1.isSelectable(element)) {
                element.selected = previousState[1];
            }
        }
        return context.root;
    }
    redo(context) {
        const selectables = [];
        this.selectAll(context.root, this.action.select, selectables);
        if (this.action.select) {
            this.selectionService.updateSelection(context.root, selectables, []);
        }
        else {
            this.selectionService.updateSelection(context.root, [], selectables);
        }
        return context.root;
    }
    selectAll(element, newState, selected) {
        if (sprotty_1.isSelectable(element)) {
            this.previousSelection.set(element.id, element.selected);
            selected.push(element.id);
        }
        for (const child of element.children) {
            this.selectAll(child, newState, selected);
        }
    }
};
SelectAllCommand.KIND = sprotty_1.SelectAllCommand.KIND;
SelectAllCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __param(1, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
    __metadata("design:paramtypes", [protocol_1.SelectAllAction,
        SelectionService])
], SelectAllCommand);
exports.SelectAllCommand = SelectAllCommand;
//# sourceMappingURL=selection-service.js.map