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
var TaskEditor_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TaskEditor = exports.ApplyTaskEditOperation = void 0;
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
const client_1 = require("@eclipse-glsp/client");
const inversify_1 = require("inversify");
const lib_1 = require("sprotty/lib");
const dom_helper_1 = require("sprotty/lib/base/views/dom-helper");
const model_1 = require("../model");
class ApplyTaskEditOperation {
    constructor(taskId, expression) {
        this.taskId = taskId;
        this.expression = expression;
        this.kind = ApplyTaskEditOperation.KIND;
    }
}
exports.ApplyTaskEditOperation = ApplyTaskEditOperation;
ApplyTaskEditOperation.KIND = 'applyTaskEdit';
let TaskEditor = TaskEditor_1 = class TaskEditor extends client_1.AbstractUIExtension {
    constructor() {
        super(...arguments);
        this.autoSuggestionSettings = {
            noSuggestionsMessage: 'No suggestions available',
            suggestionsClass: 'command-palette-suggestions',
            debounceWaitMs: 50,
            showOnFocus: true
        };
    }
    id() {
        return TaskEditor_1.ID;
    }
    containerClass() {
        return 'command-palette';
    }
    initializeContents(containerElement) {
        this.autoSuggestion = new client_1.AutoCompleteWidget(this.autoSuggestionSettings, { provideSuggestions: input => this.retrieveSuggestions(input) }, { executeFromSuggestion: input => this.executeFromSuggestion(input) }, () => this.hide(), this.logger);
        this.autoSuggestion.configureValidation({ validate: input => this.validateInput(input) }, new client_1.ValidationDecorator(containerElement));
        this.autoSuggestion.configureTextSubmitHandler({
            executeFromTextOnlyInput: (input) => this.executeFromTextOnlyInput(input)
        });
        this.autoSuggestion.initialize(containerElement);
    }
    show(root, ...contextElementIds) {
        super.show(root, ...contextElementIds);
        this.autoSuggestion.open(root);
    }
    onBeforeShow(containerElement, root, ...contextElementIds) {
        this.task = getTask(contextElementIds, root)[0];
        this.autoSuggestion.inputField.value = '';
        this.setPosition(containerElement);
    }
    setPosition(containerElement) {
        let x = 0;
        let y = 0;
        if (this.task) {
            const bounds = client_1.getAbsoluteClientBounds(this.task, this.domHelper, this.viewerOptions);
            x = bounds.x + 5;
            y = bounds.y + 5;
        }
        containerElement.style.left = `${x}px`;
        containerElement.style.top = `${y}px`;
        containerElement.style.width = '200px';
    }
    async retrieveSuggestions(input) {
        const response = await this.actionDispatcher.request(new client_1.RequestContextActions(TaskEditor_1.ID, this.editorContextService.get({ ['text']: input })));
        if (client_1.isSetContextActionsAction(response)) {
            return response.actions;
        }
        return Promise.reject();
    }
    async validateInput(input) {
        const response = await this.actionDispatcher.request(new client_1.RequestEditValidationAction(TaskEditor_1.ID, this.task.id, input));
        if (client_1.isSetEditValidationResultAction(response)) {
            return response.status;
        }
        return Promise.reject();
    }
    executeFromSuggestion(input) {
        this.actionDispatcher.dispatchAll(client_1.toActionArray(input));
    }
    executeFromTextOnlyInput(input) {
        const action = new ApplyTaskEditOperation(this.task.id, input);
        this.actionDispatcher.dispatch(action);
    }
    hide() {
        this.autoSuggestion.dispose();
        super.hide();
    }
};
TaskEditor.ID = 'task-editor';
__decorate([
    inversify_1.inject(lib_1.TYPES.IActionDispatcher),
    __metadata("design:type", client_1.GLSPActionDispatcher)
], TaskEditor.prototype, "actionDispatcher", void 0);
__decorate([
    inversify_1.inject(client_1.EditorContextService),
    __metadata("design:type", client_1.EditorContextService)
], TaskEditor.prototype, "editorContextService", void 0);
__decorate([
    inversify_1.inject(lib_1.TYPES.ViewerOptions),
    __metadata("design:type", Object)
], TaskEditor.prototype, "viewerOptions", void 0);
__decorate([
    inversify_1.inject(lib_1.TYPES.DOMHelper),
    __metadata("design:type", dom_helper_1.DOMHelper)
], TaskEditor.prototype, "domHelper", void 0);
__decorate([
    inversify_1.inject(lib_1.TYPES.ILogger),
    __metadata("design:type", Object)
], TaskEditor.prototype, "logger", void 0);
TaskEditor = TaskEditor_1 = __decorate([
    inversify_1.injectable()
], TaskEditor);
exports.TaskEditor = TaskEditor;
function getTask(ids, element) {
    return ids.map(id => element.index.getById(id)).filter(model_1.isTaskNode);
}
//# sourceMappingURL=direct-task-editor.js.map