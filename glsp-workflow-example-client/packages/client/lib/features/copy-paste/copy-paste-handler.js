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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerCopyPasteHandler = exports.LocalClipboardService = void 0;
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
const uuid_1 = require("uuid");
const action_dispatcher_1 = require("../../base/action-dispatcher");
const editor_context_service_1 = require("../../base/editor-context-service");
const types_1 = require("../../base/types");
/**
 * A local implementation of the async clipboard interface.
 *
 * This implementation just stores the clipboard data in memory, but not in the clipboard.
 * This implementation can be used if you don't need to support cross-widget/browser/application
 * data transfer and you would like to avoid to require the permission of the user for accessing the
 * system clipboard asynchronously.
 *
 * In order to detect whether the user copied something else since we recorded the clipboard data
 * we put a uuid into the system clipboard synchronously. If on paste this ID has changed or is not
 * available anymore, we know that the user copied in another application or context, so we shouldn't
 * paste what we have stored locally and just return undefined.
 *
 * Real async clipboard service implementations can just ignore the ID that is passed and rely on the
 * system clipboard's content instead.
 */
let LocalClipboardService = class LocalClipboardService {
    clear() {
        this.currentId = undefined;
        this.data = undefined;
    }
    put(data, id) {
        this.currentId = id;
        this.data = data;
    }
    get(id) {
        if (id !== this.currentId) {
            return undefined;
        }
        return this.data;
    }
};
LocalClipboardService = __decorate([
    inversify_1.injectable()
], LocalClipboardService);
exports.LocalClipboardService = LocalClipboardService;
function toClipboardId(clipboardId) {
    return JSON.stringify({ clipboardId });
}
function isClipboardId(jsonData) {
    return jsonData !== undefined && 'clipboardId' in jsonData;
}
function getClipboardIdFromDataTransfer(dataTransfer) {
    const jsonString = dataTransfer.getData(CLIPBOARD_DATA_FORMAT);
    const jsonObject = jsonString ? JSON.parse(jsonString) : undefined;
    return isClipboardId(jsonObject) ? jsonObject.clipboardId : undefined;
}
const CLIPBOARD_DATA_FORMAT = 'text/plain';
let ServerCopyPasteHandler = class ServerCopyPasteHandler {
    handleCopy(event) {
        if (event.clipboardData && this.shouldCopy(event)) {
            const clipboardId = uuid_1.v4();
            event.clipboardData.setData(CLIPBOARD_DATA_FORMAT, toClipboardId(clipboardId));
            this.actionDispatcher
                .request(protocol_1.RequestClipboardDataAction.create(this.editorContext.get()))
                .then(action => this.clipboadService.put(action.clipboardData, clipboardId));
            event.preventDefault();
        }
        else {
            if (event.clipboardData) {
                event.clipboardData.clearData();
            }
            this.clipboadService.clear();
        }
    }
    handleCut(event) {
        if (event.clipboardData && this.shouldCopy(event)) {
            this.handleCopy(event);
            this.actionDispatcher.dispatch(new protocol_1.CutOperation(this.editorContext.get()));
            event.preventDefault();
        }
    }
    handlePaste(event) {
        if (event.clipboardData && this.shouldPaste(event)) {
            const clipboardId = getClipboardIdFromDataTransfer(event.clipboardData);
            const clipboardData = this.clipboadService.get(clipboardId);
            if (clipboardData) {
                this.actionDispatcher.dispatch(new protocol_1.PasteOperation(clipboardData, this.editorContext.get()));
            }
            event.preventDefault();
        }
    }
    shouldCopy(_event) {
        return this.editorContext.get().selectedElementIds.length > 0 && this.isDiagramActive();
    }
    shouldPaste(_event) {
        return this.isDiagramActive();
    }
    isDiagramActive() {
        return (document.activeElement instanceof SVGElement &&
            document.activeElement.parentElement &&
            document.activeElement.parentElement.id === this.viewerOptions.baseDiv);
    }
};
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcher),
    __metadata("design:type", action_dispatcher_1.GLSPActionDispatcher)
], ServerCopyPasteHandler.prototype, "actionDispatcher", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ViewerOptions),
    __metadata("design:type", Object)
], ServerCopyPasteHandler.prototype, "viewerOptions", void 0);
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IAsyncClipboardService),
    __metadata("design:type", Object)
], ServerCopyPasteHandler.prototype, "clipboadService", void 0);
__decorate([
    inversify_1.inject(editor_context_service_1.EditorContextService),
    __metadata("design:type", editor_context_service_1.EditorContextService)
], ServerCopyPasteHandler.prototype, "editorContext", void 0);
ServerCopyPasteHandler = __decorate([
    inversify_1.injectable()
], ServerCopyPasteHandler);
exports.ServerCopyPasteHandler = ServerCopyPasteHandler;
//# sourceMappingURL=copy-paste-handler.js.map