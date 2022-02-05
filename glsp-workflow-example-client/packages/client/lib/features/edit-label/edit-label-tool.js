"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var DirectLabelEditTool_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectLabelEditTool = void 0;
/********************************************************************************
 * Copyright (c) 2020 EclipseSource and others.
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
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const base_glsp_tool_1 = require("../tools/base-glsp-tool");
let DirectLabelEditTool = DirectLabelEditTool_1 = class DirectLabelEditTool extends base_glsp_tool_1.BaseGLSPTool {
    get id() {
        return DirectLabelEditTool_1.ID;
    }
    createEditLabelMouseListener() {
        return new sprotty_1.EditLabelMouseListener();
    }
    createEditLabelKeyListener() {
        return new sprotty_1.EditLabelKeyListener();
    }
    enable() {
        this.editLabelKeyListener = this.createEditLabelKeyListener();
        this.editLabelMouseListener = this.createEditLabelMouseListener();
        this.mouseTool.register(this.editLabelMouseListener);
        this.keyTool.register(this.editLabelKeyListener);
    }
    disable() {
        this.keyTool.deregister(this.editLabelKeyListener);
        this.mouseTool.deregister(this.editLabelMouseListener);
    }
};
DirectLabelEditTool.ID = 'glsp.direct-label-edit-tool';
DirectLabelEditTool = DirectLabelEditTool_1 = __decorate([
    inversify_1.injectable()
], DirectLabelEditTool);
exports.DirectLabelEditTool = DirectLabelEditTool;
//# sourceMappingURL=edit-label-tool.js.map