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
var EdgeCreationTool_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeCreationToolMouseListener = exports.EdgeCreationTool = void 0;
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
const drag_aware_mouse_listener_1 = require("../../base/drag-aware-mouse-listener");
const creation_tool_feedback_1 = require("../tool-feedback/creation-tool-feedback");
const css_feedback_1 = require("../tool-feedback/css-feedback");
const base_glsp_tool_1 = require("./base-glsp-tool");
/**
 * Tool to create connections in a Diagram, by selecting a source and target node.
 */
let EdgeCreationTool = EdgeCreationTool_1 = class EdgeCreationTool extends base_glsp_tool_1.BaseGLSPTool {
    get id() {
        return EdgeCreationTool_1.ID;
    }
    enable() {
        if (this.triggerAction === undefined) {
            throw new TypeError(`Could not enable tool ${this.id}.The triggerAction cannot be undefined.`);
        }
        this.creationToolMouseListener = new EdgeCreationToolMouseListener(this.triggerAction, this);
        this.mouseTool.register(this.creationToolMouseListener);
        this.feedbackEndMovingMouseListener = new creation_tool_feedback_1.FeedbackEdgeEndMovingMouseListener(this.anchorRegistry);
        this.mouseTool.register(this.feedbackEndMovingMouseListener);
        this.dispatchFeedback([css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.OPERATION_NOT_ALLOWED)]);
    }
    disable() {
        this.mouseTool.deregister(this.creationToolMouseListener);
        this.mouseTool.deregister(this.feedbackEndMovingMouseListener);
        this.deregisterFeedback([new creation_tool_feedback_1.RemoveFeedbackEdgeAction(), css_feedback_1.cursorFeedbackAction()]);
    }
    handle(action) {
        if (protocol_1.isTriggerElementTypeCreationAction(action)) {
            this.triggerAction = action;
            return new sprotty_1.EnableToolsAction([this.id]);
        }
    }
};
EdgeCreationTool.ID = 'tool_create_edge';
__decorate([
    inversify_1.inject(sprotty_1.AnchorComputerRegistry),
    __metadata("design:type", sprotty_1.AnchorComputerRegistry)
], EdgeCreationTool.prototype, "anchorRegistry", void 0);
EdgeCreationTool = EdgeCreationTool_1 = __decorate([
    inversify_1.injectable()
], EdgeCreationTool);
exports.EdgeCreationTool = EdgeCreationTool;
let EdgeCreationToolMouseListener = class EdgeCreationToolMouseListener extends drag_aware_mouse_listener_1.DragAwareMouseListener {
    constructor(triggerAction, tool) {
        super();
        this.triggerAction = triggerAction;
        this.tool = tool;
        this.allowedTarget = false;
        this.proxyEdge = new sprotty_1.SEdge();
        this.proxyEdge.type = triggerAction.elementTypeId;
    }
    reinitialize() {
        this.source = undefined;
        this.target = undefined;
        this.currentTarget = undefined;
        this.allowedTarget = false;
        this.tool.dispatchFeedback([new creation_tool_feedback_1.RemoveFeedbackEdgeAction()]);
    }
    nonDraggingMouseUp(_element, event) {
        const result = [];
        if (event.button === 0) {
            if (!this.isSourceSelected()) {
                if (this.currentTarget && this.allowedTarget) {
                    this.source = this.currentTarget.id;
                    this.tool.dispatchFeedback([new creation_tool_feedback_1.DrawFeedbackEdgeAction(this.triggerAction.elementTypeId, this.source)]);
                }
            }
            else {
                if (this.currentTarget && this.allowedTarget) {
                    this.target = this.currentTarget.id;
                }
            }
            if (this.source && this.target) {
                result.push(new protocol_1.CreateEdgeOperation(this.triggerAction.elementTypeId, this.source, this.target, this.triggerAction.args));
                if (!sprotty_1.isCtrlOrCmd(event)) {
                    result.push(new sprotty_1.EnableDefaultToolsAction());
                }
                else {
                    this.reinitialize();
                }
            }
        }
        else if (event.button === 2) {
            result.push(new sprotty_1.EnableDefaultToolsAction());
        }
        return result;
    }
    isSourceSelected() {
        return this.source !== undefined;
    }
    isTargetSelected() {
        return this.target !== undefined;
    }
    mouseOver(target, event) {
        const newCurrentTarget = sprotty_1.findParentByFeature(target, sprotty_1.isConnectable);
        if (newCurrentTarget !== this.currentTarget) {
            this.currentTarget = newCurrentTarget;
            if (this.currentTarget) {
                if (!this.isSourceSelected()) {
                    this.allowedTarget = this.isAllowedSource(newCurrentTarget);
                }
                else if (!this.isTargetSelected()) {
                    this.allowedTarget = this.isAllowedTarget(newCurrentTarget);
                }
                if (this.allowedTarget) {
                    const action = !this.isSourceSelected()
                        ? css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.EDGE_CREATION_SOURCE)
                        : css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.EDGE_CREATION_TARGET);
                    return [action];
                }
            }
            return [css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.OPERATION_NOT_ALLOWED)];
        }
        return [];
    }
    isAllowedSource(element) {
        return element !== undefined && sprotty_1.isConnectable(element) && element.canConnect(this.proxyEdge, 'source');
    }
    isAllowedTarget(element) {
        return element !== undefined && sprotty_1.isConnectable(element) && element.canConnect(this.proxyEdge, 'target');
    }
};
EdgeCreationToolMouseListener = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [protocol_1.TriggerEdgeCreationAction, EdgeCreationTool])
], EdgeCreationToolMouseListener);
exports.EdgeCreationToolMouseListener = EdgeCreationToolMouseListener;
//# sourceMappingURL=edge-creation-tool.js.map