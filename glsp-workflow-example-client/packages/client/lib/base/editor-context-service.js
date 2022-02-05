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
exports.EditorContextService = void 0;
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
const protocol_1 = require("@eclipse-glsp/protocol");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const selection_service_1 = require("../features/select/selection-service");
const source_uri_aware_1 = require("./source-uri-aware");
const types_1 = require("./types");
let EditorContextService = class EditorContextService {
    constructor(editModeListeners = []) {
        this.editModeListeners = editModeListeners;
    }
    register(editModeListener) {
        protocol_1.distinctAdd(this.editModeListeners, editModeListener);
    }
    deregister(editModeListener) {
        protocol_1.remove(this.editModeListeners, editModeListener);
    }
    get(args) {
        return {
            selectedElementIds: Array.from(this.selectionService.getSelectedElementIDs()),
            lastMousePosition: this.mousePositionTracker.lastPositionOnDiagram,
            args
        };
    }
    getWithSelection(selectedElementIds, args) {
        return {
            selectedElementIds,
            lastMousePosition: this.mousePositionTracker.lastPositionOnDiagram,
            args
        };
    }
    handle(action) {
        if (protocol_1.isSetEditModeAction(action)) {
            const oldValue = this._editMode;
            this._editMode = action.editMode;
            this.notifiyEditModeListeners(oldValue);
        }
    }
    notifiyEditModeListeners(oldValue) {
        this.editModeListeners.forEach(listener => listener.editModeChanged(oldValue, this.editMode));
    }
    async getSourceUri() {
        const modelSource = await this.modelSource();
        if (source_uri_aware_1.isSourceUriAware(modelSource)) {
            return modelSource.getSourceURI();
        }
        return undefined;
    }
    get editMode() {
        return this._editMode;
    }
    get modelRoot() {
        return this.selectionService.getModelRoot();
    }
    get selectedElements() {
        return this.selectionService.getSelectedElements();
    }
    get isReadonly() {
        return this.editMode === protocol_1.EditMode.READONLY;
    }
};
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.SelectionService),
    __metadata("design:type", selection_service_1.SelectionService)
], EditorContextService.prototype, "selectionService", void 0);
__decorate([
    inversify_1.inject(sprotty_1.MousePositionTracker),
    __metadata("design:type", sprotty_1.MousePositionTracker)
], EditorContextService.prototype, "mousePositionTracker", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ModelSourceProvider),
    __metadata("design:type", Function)
], EditorContextService.prototype, "modelSource", void 0);
EditorContextService = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.multiInject(types_1.GLSP_TYPES.IEditModeListener)), __param(0, inversify_1.optional()),
    __metadata("design:paramtypes", [Array])
], EditorContextService);
exports.EditorContextService = EditorContextService;
//# sourceMappingURL=editor-context-service.js.map