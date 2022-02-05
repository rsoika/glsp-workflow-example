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
exports.isGLSPTool = exports.GLSPToolManager = void 0;
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
const types_1 = require("../types");
let GLSPToolManager = class GLSPToolManager extends sprotty_1.ToolManager {
    initialize() {
        this.registerTools(...this.tools);
        this.registerDefaultTools(...this.defaultTools);
        this.enableDefaultTools();
        this.contextServiceProvider().then(editorContext => {
            editorContext.register(this);
            this.editorContext = editorContext;
        });
    }
    registerDefaultTools(...tools) {
        for (const tool of tools) {
            protocol_1.distinctAdd(this.defaultTools, tool);
        }
    }
    registerTools(...tools) {
        for (const tool of tools) {
            protocol_1.distinctAdd(this.tools, tool);
        }
    }
    enable(toolIds) {
        this.disableActiveTools();
        let tools = toolIds.map(id => this.tool(id));
        if (this.editorContext && this.editorContext.isReadonly) {
            tools = tools.filter(tool => tool && (!isGLSPTool(tool) || tool.isEditTool === false));
        }
        tools.forEach(tool => {
            if (tool !== undefined) {
                tool.enable();
                this.actives.push(tool);
            }
        });
    }
    disableEditTools() {
        this.disableActiveTools();
        this.enable(this.defaultTools.filter(tool => !isGLSPTool(tool) || tool.isEditTool === false).map(tool => tool.id));
    }
    editModeChanged(oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        if (newValue === protocol_1.EditMode.READONLY) {
            this.disableEditTools();
        }
        else if (newValue === protocol_1.EditMode.EDITABLE) {
            this.enableDefaultTools();
        }
    }
};
__decorate([
    inversify_1.multiInject(types_1.GLSP_TYPES.ITool),
    inversify_1.optional(),
    __metadata("design:type", Array)
], GLSPToolManager.prototype, "tools", void 0);
__decorate([
    inversify_1.multiInject(types_1.GLSP_TYPES.IDefaultTool),
    inversify_1.optional(),
    __metadata("design:type", Array)
], GLSPToolManager.prototype, "defaultTools", void 0);
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IEditorContextServiceProvider),
    __metadata("design:type", Function)
], GLSPToolManager.prototype, "contextServiceProvider", void 0);
__decorate([
    inversify_1.postConstruct(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], GLSPToolManager.prototype, "initialize", null);
GLSPToolManager = __decorate([
    inversify_1.injectable()
], GLSPToolManager);
exports.GLSPToolManager = GLSPToolManager;
function isGLSPTool(tool) {
    return 'isEditTool' in tool && typeof tool['isEditTool'] === 'boolean';
}
exports.isGLSPTool = isGLSPTool;
//# sourceMappingURL=glsp-tool-manager.js.map