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
var EdgeEditTool_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdgeEditTool = void 0;
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
const types_1 = require("../../base/types");
const smodel_util_1 = require("../../utils/smodel-util");
const model_1 = require("../reconnect/model");
const selection_service_1 = require("../select/selection-service");
const creation_tool_feedback_1 = require("../tool-feedback/creation-tool-feedback");
const css_feedback_1 = require("../tool-feedback/css-feedback");
const edge_edit_tool_feedback_1 = require("../tool-feedback/edge-edit-tool-feedback");
const base_glsp_tool_1 = require("./base-glsp-tool");
let EdgeEditTool = EdgeEditTool_1 = class EdgeEditTool extends base_glsp_tool_1.BaseGLSPTool {
    get id() {
        return EdgeEditTool_1.ID;
    }
    enable() {
        this.edgeEditListener = new EdgeEditListener(this);
        this.mouseTool.register(this.edgeEditListener);
        this.selectionService.register(this.edgeEditListener);
        // install feedback move mouse listener for client-side move updates
        this.feedbackEdgeSourceMovingListener = new edge_edit_tool_feedback_1.FeedbackEdgeSourceMovingMouseListener(this.anchorRegistry);
        this.feedbackEdgeTargetMovingListener = new edge_edit_tool_feedback_1.FeedbackEdgeTargetMovingMouseListener(this.anchorRegistry);
        this.feedbackMovingListener = new edge_edit_tool_feedback_1.FeedbackEdgeRouteMovingMouseListener(this.edgeRouterRegistry);
    }
    registerFeedbackListeners() {
        this.mouseTool.register(this.feedbackMovingListener);
        this.mouseTool.register(this.feedbackEdgeSourceMovingListener);
        this.mouseTool.register(this.feedbackEdgeTargetMovingListener);
    }
    deregisterFeedbackListeners() {
        this.mouseTool.deregister(this.feedbackEdgeSourceMovingListener);
        this.mouseTool.deregister(this.feedbackEdgeTargetMovingListener);
        this.mouseTool.deregister(this.feedbackMovingListener);
    }
    disable() {
        this.edgeEditListener.reset();
        this.selectionService.deregister(this.edgeEditListener);
        this.deregisterFeedbackListeners();
        this.mouseTool.deregister(this.edgeEditListener);
    }
};
EdgeEditTool.ID = 'glsp.edge-edit-tool';
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.SelectionService),
    __metadata("design:type", selection_service_1.SelectionService)
], EdgeEditTool.prototype, "selectionService", void 0);
__decorate([
    inversify_1.inject(sprotty_1.AnchorComputerRegistry),
    __metadata("design:type", sprotty_1.AnchorComputerRegistry)
], EdgeEditTool.prototype, "anchorRegistry", void 0);
__decorate([
    inversify_1.inject(sprotty_1.EdgeRouterRegistry),
    inversify_1.optional(),
    __metadata("design:type", sprotty_1.EdgeRouterRegistry)
], EdgeEditTool.prototype, "edgeRouterRegistry", void 0);
EdgeEditTool = EdgeEditTool_1 = __decorate([
    inversify_1.injectable()
], EdgeEditTool);
exports.EdgeEditTool = EdgeEditTool;
class EdgeEditListener extends drag_aware_mouse_listener_1.DragAwareMouseListener {
    constructor(tool) {
        super();
        this.tool = tool;
    }
    isValidEdge(edge) {
        return edge !== undefined && edge.id !== creation_tool_feedback_1.feedbackEdgeId(edge.root) && sprotty_1.isSelected(edge);
    }
    setEdgeSelected(edge) {
        if (this.edge && this.edge.id !== edge.id) {
            // reset from a previously selected edge
            this.reset();
        }
        this.edge = edge;
        // note: order is important here as we want the reconnect handles to cover the routing handles
        const feedbackActions = [];
        if (sprotty_1.canEditRouting(edge)) {
            feedbackActions.push(new edge_edit_tool_feedback_1.SwitchRoutingModeAction([this.edge.id], []));
        }
        if (model_1.isReconnectable(edge)) {
            feedbackActions.push(new edge_edit_tool_feedback_1.ShowEdgeReconnectHandlesFeedbackAction(this.edge.id));
        }
        this.tool.dispatchFeedback(feedbackActions);
    }
    isEdgeSelected() {
        return this.edge !== undefined && sprotty_1.isSelected(this.edge);
    }
    setReconnectHandleSelected(edge, reconnectHandle) {
        if (this.edge && this.edge.target && this.edge.source) {
            if (model_1.isSourceRoutingHandle(edge, reconnectHandle)) {
                this.tool.dispatchFeedback([
                    new edge_edit_tool_feedback_1.HideEdgeReconnectHandlesFeedbackAction(),
                    css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.EDGE_RECONNECT),
                    new edge_edit_tool_feedback_1.DrawFeedbackEdgeSourceAction(this.edge.type, this.edge.targetId)
                ]);
                this.reconnectMode = 'NEW_SOURCE';
            }
            else if (model_1.isTargetRoutingHandle(edge, reconnectHandle)) {
                this.tool.dispatchFeedback([
                    new edge_edit_tool_feedback_1.HideEdgeReconnectHandlesFeedbackAction(),
                    css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.EDGE_CREATION_TARGET),
                    new creation_tool_feedback_1.DrawFeedbackEdgeAction(this.edge.type, this.edge.sourceId)
                ]);
                this.reconnectMode = 'NEW_TARGET';
            }
        }
    }
    isReconnecting() {
        return this.reconnectMode !== undefined;
    }
    isReconnectingNewSource() {
        return this.reconnectMode === 'NEW_SOURCE';
    }
    setRoutingHandleSelected(edge, routingHandle) {
        if (this.edge && this.edge.target && this.edge.source) {
            this.routingHandle = routingHandle;
        }
    }
    requiresReconnect(sourceId, targetId) {
        return this.edge !== undefined && (this.edge.sourceId !== sourceId || this.edge.targetId !== targetId);
    }
    setNewConnectable(connectable) {
        this.newConnectable = connectable;
    }
    isReadyToReconnect() {
        return this.edge && this.isReconnecting() && this.newConnectable !== undefined;
    }
    isReadyToReroute() {
        return this.routingHandle !== undefined;
    }
    mouseDown(target, event) {
        const result = super.mouseDown(target, event);
        if (event.button === 0) {
            const reconnectHandle = sprotty_1.findParentByFeature(target, model_1.isReconnectHandle);
            const routingHandle = !reconnectHandle ? sprotty_1.findParentByFeature(target, smodel_util_1.isRoutingHandle) : undefined;
            const edge = sprotty_1.findParentByFeature(target, smodel_util_1.isRoutable);
            if (this.isEdgeSelected() && edge && reconnectHandle) {
                // PHASE 2 Reconnect: Select reconnect handle on selected edge
                this.setReconnectHandleSelected(edge, reconnectHandle);
            }
            else if (this.isEdgeSelected() && edge && routingHandle) {
                // PHASE 2 Reroute: Select routing handle on selected edge
                this.setRoutingHandleSelected(edge, routingHandle);
            }
            else if (this.isValidEdge(edge)) {
                // PHASE 1: Select edge
                this.tool.registerFeedbackListeners();
                this.setEdgeSelected(edge);
            }
        }
        else if (event.button === 2) {
            this.reset();
        }
        return result;
    }
    mouseMove(target, event) {
        const result = super.mouseMove(target, event);
        if (this.isMouseDrag) {
            // reset any selected connectables when we are dragging, maybe the user is just panning
            this.setNewConnectable(undefined);
        }
        return result;
    }
    mouseUp(target, event) {
        const result = super.mouseUp(target, event);
        if (!this.isReadyToReconnect() && !this.isReadyToReroute()) {
            return result;
        }
        if (this.edge && this.newConnectable) {
            const sourceId = this.isReconnectingNewSource() ? this.newConnectable.id : this.edge.sourceId;
            const targetId = this.isReconnectingNewSource() ? this.edge.targetId : this.newConnectable.id;
            if (this.requiresReconnect(sourceId, targetId)) {
                result.push(new protocol_1.ReconnectEdgeOperation(this.edge.id, sourceId, targetId));
            }
            this.reset();
        }
        else if (this.edge && this.routingHandle) {
            // we need to re-retrieve the edge as it might have changed due to a server update since we do not reset the state between
            // reroute actions
            const latestEdge = target.index.getById(this.edge.id);
            if (latestEdge && smodel_util_1.isRoutable(latestEdge)) {
                result.push(new protocol_1.ChangeRoutingPointsOperation([{ elementId: latestEdge.id, newRoutingPoints: latestEdge.routingPoints }]));
                this.routingHandle = undefined;
            }
        }
        return result;
    }
    mouseOver(target, event) {
        if (this.edge && this.isReconnecting()) {
            const currentTarget = sprotty_1.findParentByFeature(target, sprotty_1.isConnectable);
            if (!this.newConnectable || currentTarget !== this.newConnectable) {
                this.setNewConnectable(currentTarget);
                if (currentTarget) {
                    if ((this.reconnectMode === 'NEW_SOURCE' && currentTarget.canConnect(this.edge, 'source')) ||
                        (this.reconnectMode === 'NEW_TARGET' && currentTarget.canConnect(this.edge, 'target'))) {
                        this.tool.dispatchFeedback([css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.EDGE_RECONNECT)]);
                        return [];
                    }
                }
                this.tool.dispatchFeedback([css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.OPERATION_NOT_ALLOWED)]);
            }
        }
        return [];
    }
    selectionChanged(root, selectedElements) {
        if (this.edge) {
            if (selectedElements.indexOf(this.edge.id) > -1) {
                // our active edge is still selected, nothing to do
                return;
            }
            if (this.isReconnecting()) {
                // we are reconnecting, so we may have clicked on a potential target
                return;
            }
            // try to find some other selected element and mark that active
            for (const elementId of selectedElements.reverse()) {
                const element = root.index.getById(elementId);
                if (element) {
                    const edge = sprotty_1.findParentByFeature(element, smodel_util_1.isRoutable);
                    if (this.isValidEdge(edge)) {
                        // PHASE 1: Select edge
                        this.setEdgeSelected(edge);
                        return;
                    }
                }
            }
            this.reset();
        }
    }
    reset() {
        this.resetFeedback();
        this.resetData();
    }
    resetData() {
        this.edge = undefined;
        this.reconnectMode = undefined;
        this.newConnectable = undefined;
        this.routingHandle = undefined;
    }
    resetFeedback() {
        const result = [];
        if (this.edge) {
            result.push(new edge_edit_tool_feedback_1.SwitchRoutingModeAction([], [this.edge.id]));
        }
        result.push(...[new edge_edit_tool_feedback_1.HideEdgeReconnectHandlesFeedbackAction(), css_feedback_1.cursorFeedbackAction(), new creation_tool_feedback_1.RemoveFeedbackEdgeAction()]);
        this.tool.deregisterFeedback(result);
        this.tool.deregisterFeedbackListeners();
    }
}
//# sourceMappingURL=edge-edit-tool.js.map