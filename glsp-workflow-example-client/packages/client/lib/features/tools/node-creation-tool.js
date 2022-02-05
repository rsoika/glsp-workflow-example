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
var NodeCreationTool_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NodeCreationToolMouseListener = exports.NodeCreationTool = void 0;
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
const drag_aware_mouse_listener_1 = require("../../base/drag-aware-mouse-listener");
const viewpoint_util_1 = require("../../utils/viewpoint-util");
const model_1 = require("../hints/model");
const css_feedback_1 = require("../tool-feedback/css-feedback");
const base_glsp_tool_1 = require("./base-glsp-tool");
let NodeCreationTool = NodeCreationTool_1 = class NodeCreationTool extends base_glsp_tool_1.BaseGLSPTool {
    get id() {
        return NodeCreationTool_1.ID;
    }
    enable() {
        if (this.triggerAction === undefined) {
            throw new TypeError(`Could not enable tool ${this.id}.The triggerAction cannot be undefined.`);
        }
        this.creationToolMouseListener = new NodeCreationToolMouseListener(this.triggerAction, this);
        this.mouseTool.register(this.creationToolMouseListener);
        this.dispatchFeedback([css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.NODE_CREATION)]);
    }
    disable() {
        this.mouseTool.deregister(this.creationToolMouseListener);
        this.deregisterFeedback([css_feedback_1.cursorFeedbackAction()]);
    }
    handle(action) {
        if (protocol_1.isTriggerNodeCreationAction(action)) {
            this.triggerAction = action;
            return new sprotty_1.EnableToolsAction([this.id]);
        }
    }
};
NodeCreationTool.ID = 'tool_create_node';
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ISnapper),
    inversify_1.optional(),
    __metadata("design:type", Object)
], NodeCreationTool.prototype, "snapper", void 0);
NodeCreationTool = NodeCreationTool_1 = __decorate([
    inversify_1.injectable()
], NodeCreationTool);
exports.NodeCreationTool = NodeCreationTool;
let NodeCreationToolMouseListener = class NodeCreationToolMouseListener extends drag_aware_mouse_listener_1.DragAwareMouseListener {
    constructor(triggerAction, tool) {
        super();
        this.triggerAction = triggerAction;
        this.tool = tool;
    }
    creationAllowed(elementTypeId) {
        return this.container && this.container.isContainableElement(elementTypeId);
    }
    get elementTypeId() {
        return this.triggerAction.elementTypeId;
    }
    nonDraggingMouseUp(target, event) {
        const result = [];
        if (this.creationAllowed(this.elementTypeId)) {
            const containerId = this.container ? this.container.id : undefined;
            let location = viewpoint_util_1.getAbsolutePosition(target, event);
            if (this.tool.snapper) {
                // Create a 0-bounds proxy element for snapping
                const elementProxy = new sprotty_1.SNode();
                elementProxy.size = { width: 0, height: 0 };
                location = this.tool.snapper.snap(location, elementProxy);
            }
            result.push(new protocol_1.CreateNodeOperation(this.elementTypeId, location, containerId, this.triggerAction.args));
            if (!sprotty_1.isCtrlOrCmd(event)) {
                result.push(new sprotty_1.EnableDefaultToolsAction());
            }
        }
        return result;
    }
    mouseOver(target, event) {
        const currentContainer = sprotty_1.findParentByFeature(target, model_1.isContainable);
        if (!this.container || currentContainer !== this.container) {
            this.container = currentContainer;
            const feedback = this.creationAllowed(this.elementTypeId)
                ? css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.NODE_CREATION)
                : css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.OPERATION_NOT_ALLOWED);
            this.tool.dispatchFeedback([feedback]);
        }
        return [];
    }
};
NodeCreationToolMouseListener = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [protocol_1.TriggerNodeCreationAction, NodeCreationTool])
], NodeCreationToolMouseListener);
exports.NodeCreationToolMouseListener = NodeCreationToolMouseListener;
//# sourceMappingURL=node-creation-tool.js.map