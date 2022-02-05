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
var ChangeBoundsTool_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChangeBoundsListener = exports.ChangeBoundsTool = void 0;
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
const layout_utils_1 = require("../../utils/layout-utils");
const smodel_util_1 = require("../../utils/smodel-util");
const model_1 = require("../change-bounds/model");
const movement_restrictor_1 = require("../change-bounds/movement-restrictor");
const selection_service_1 = require("../select/selection-service");
const change_bounds_tool_feedback_1 = require("../tool-feedback/change-bounds-tool-feedback");
const css_feedback_1 = require("../tool-feedback/css-feedback");
const base_glsp_tool_1 = require("./base-glsp-tool");
/**
 * The change bounds tool has the license to move multiple elements or resize a single element by implementing the ChangeBounds operation.
 * In contrast to Sprotty's implementation this tool only sends a `ChangeBoundsOperationAction` when an operation has finished and does not
 * provide client-side live updates to improve performance.
 *
 * | Operation | Client Update    | Server Update
 * +-----------+------------------+----------------------------
 * | Move      | MoveAction       | ChangeBoundsOperationAction
 * | Resize    | SetBoundsAction  | ChangeBoundsOperationAction
 *
 * To provide a visual client updates during move we install the `FeedbackMoveMouseListener` and to provide visual client updates during
 * resize and send the server updates we install the `ChangeBoundsListener`.
 */
let ChangeBoundsTool = ChangeBoundsTool_1 = class ChangeBoundsTool extends base_glsp_tool_1.BaseGLSPTool {
    get id() {
        return ChangeBoundsTool_1.ID;
    }
    enable() {
        // install feedback move mouse listener for client-side move updates
        this.feedbackMoveMouseListener = this.createMoveMouseListener();
        this.mouseTool.register(this.feedbackMoveMouseListener);
        // install change bounds listener for client-side resize updates and server-side updates
        this.changeBoundsListener = this.createChangeBoundsListener();
        this.mouseTool.register(this.changeBoundsListener);
        this.selectionService.register(this.changeBoundsListener);
    }
    createMoveMouseListener() {
        return new change_bounds_tool_feedback_1.FeedbackMoveMouseListener(this);
    }
    createChangeBoundsListener() {
        return new ChangeBoundsListener(this);
    }
    disable() {
        this.mouseTool.deregister(this.changeBoundsListener);
        this.selectionService.deregister(this.changeBoundsListener);
        this.mouseTool.deregister(this.feedbackMoveMouseListener);
        this.deregisterFeedback([], this.feedbackMoveMouseListener);
        this.deregisterFeedback([new change_bounds_tool_feedback_1.HideChangeBoundsToolResizeFeedbackAction()], this.changeBoundsListener);
    }
};
ChangeBoundsTool.ID = 'glsp.change-bounds-tool';
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.SelectionService),
    __metadata("design:type", selection_service_1.SelectionService)
], ChangeBoundsTool.prototype, "selectionService", void 0);
__decorate([
    inversify_1.inject(sprotty_1.EdgeRouterRegistry),
    inversify_1.optional(),
    __metadata("design:type", sprotty_1.EdgeRouterRegistry)
], ChangeBoundsTool.prototype, "edgeRouterRegistry", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ISnapper),
    inversify_1.optional(),
    __metadata("design:type", Object)
], ChangeBoundsTool.prototype, "snapper", void 0);
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IMovementRestrictor),
    inversify_1.optional(),
    __metadata("design:type", Object)
], ChangeBoundsTool.prototype, "movementRestrictor", void 0);
ChangeBoundsTool = ChangeBoundsTool_1 = __decorate([
    inversify_1.injectable()
], ChangeBoundsTool);
exports.ChangeBoundsTool = ChangeBoundsTool;
class ChangeBoundsListener extends drag_aware_mouse_listener_1.DragAwareMouseListener {
    constructor(tool) {
        super();
        this.tool = tool;
        this.positionDelta = { x: 0, y: 0 };
    }
    mouseDown(target, event) {
        super.mouseDown(target, event);
        if (event.button !== 0) {
            return [];
        }
        // check if we have a resize handle (only single-selection)
        if (this.activeResizeElement && target instanceof model_1.SResizeHandle) {
            this.activeResizeHandle = target;
        }
        else {
            this.setActiveResizeElement(target);
        }
        if (this.activeResizeElement) {
            this.initPosition(event);
        }
        else {
            this.reset();
        }
        return [];
    }
    mouseMove(target, event) {
        super.mouseMove(target, event);
        if (this.isMouseDrag && this.activeResizeHandle) {
            // rely on the FeedbackMoveMouseListener to update the element bounds of selected elements
            // consider resize handles ourselves
            const actions = [
                css_feedback_1.cursorFeedbackAction(this.activeResizeHandle.isNwSeResize() ? css_feedback_1.CursorCSS.RESIZE_NWSE : css_feedback_1.CursorCSS.RESIZE_NESW),
                css_feedback_1.applyCssClasses(this.activeResizeHandle, ChangeBoundsListener.CSS_CLASS_ACTIVE)
            ];
            const positionUpdate = this.updatePosition(target, event);
            if (positionUpdate) {
                const resizeActions = this.handleResizeOnClient(positionUpdate);
                actions.push(...resizeActions);
            }
            return actions;
        }
        return [];
    }
    draggingMouseUp(target, event) {
        if (this.lastDragPosition === undefined) {
            this.resetPosition();
            return [];
        }
        const actions = [];
        if (this.activeResizeHandle) {
            // Resize
            actions.push(...this.handleResize(this.activeResizeHandle));
        }
        else {
            // Move
            actions.push(...this.handleMoveOnServer(target));
        }
        this.resetPosition();
        return actions;
    }
    handleMoveOnServer(target) {
        const operations = [];
        operations.push(...this.handleMoveElementsOnServer(target));
        operations.push(...this.handleMoveRoutingPointsOnServer(target));
        if (operations.length > 0) {
            return [new protocol_1.CompoundOperation(operations)];
        }
        return operations;
    }
    handleMoveElementsOnServer(target) {
        const result = [];
        const newBounds = [];
        const selectedElements = [];
        smodel_util_1.forEachElement(target, smodel_util_1.isNonRoutableSelectedMovableBoundsAware, element => {
            selectedElements.push(element);
        });
        const selectionSet = new Set(selectedElements);
        selectedElements
            .filter(element => !this.isChildOfSelected(selectionSet, element))
            .map(element => this.createElementAndBounds(element))
            .forEach(bounds => newBounds.push(...bounds));
        if (newBounds.length > 0) {
            result.push(new protocol_1.ChangeBoundsOperation(newBounds));
        }
        return result;
    }
    isChildOfSelected(selectedElements, element) {
        while (element instanceof sprotty_1.SChildElement) {
            element = element.parent;
            if (selectedElements.has(element)) {
                return true;
            }
        }
        return false;
    }
    handleMoveRoutingPointsOnServer(target) {
        const result = [];
        const newRoutingPoints = [];
        smodel_util_1.forEachElement(target, smodel_util_1.isNonRoutableSelectedMovableBoundsAware, element => {
            //  If client routing is enabled -> delegate routingpoints of connected edges to server
            if (this.tool.edgeRouterRegistry && element instanceof sprotty_1.SConnectableElement) {
                element.incomingEdges.map(smodel_util_1.toElementAndRoutingPoints).forEach(ear => newRoutingPoints.push(ear));
                element.outgoingEdges.map(smodel_util_1.toElementAndRoutingPoints).forEach(ear => newRoutingPoints.push(ear));
            }
        });
        if (newRoutingPoints.length > 0) {
            result.push(new protocol_1.ChangeRoutingPointsOperation(newRoutingPoints));
        }
        return result;
    }
    handleResize(activeResizeHandle) {
        const actions = [];
        actions.push(css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.DEFAULT));
        actions.push(css_feedback_1.deleteCssClasses(activeResizeHandle, ChangeBoundsListener.CSS_CLASS_ACTIVE));
        const resizeElement = sprotty_1.findParentByFeature(activeResizeHandle, model_1.isResizable);
        if (this.isActiveResizeElement(resizeElement)) {
            this.createChangeBoundsAction(resizeElement).forEach(action => actions.push(action));
        }
        return actions;
    }
    selectionChanged(root, selectedElements) {
        if (this.activeResizeElement) {
            if (selectedElements.includes(this.activeResizeElement.id)) {
                // our active element is still selected, nothing to do
                return;
            }
            // try to find some other selected element and mark that active
            for (const elementId of selectedElements.reverse()) {
                const element = root.index.getById(elementId);
                if (element && this.setActiveResizeElement(element)) {
                    return;
                }
            }
            this.reset();
        }
    }
    setActiveResizeElement(target) {
        // check if we have a selected, moveable element (multi-selection allowed)
        const moveableElement = sprotty_1.findParentByFeature(target, model_1.isBoundsAwareMoveable);
        if (sprotty_1.isSelected(moveableElement)) {
            // only allow one element to have the element resize handles
            this.activeResizeElement = moveableElement;
            if (model_1.isResizable(this.activeResizeElement)) {
                this.tool.dispatchFeedback([new change_bounds_tool_feedback_1.ShowChangeBoundsToolResizeFeedbackAction(this.activeResizeElement.id)], this);
            }
            return true;
        }
        return false;
    }
    isActiveResizeElement(element) {
        return element !== undefined && this.activeResizeElement !== undefined && element.id === this.activeResizeElement.id;
    }
    initPosition(event) {
        this.lastDragPosition = { x: event.pageX, y: event.pageY };
        if (this.activeResizeHandle) {
            const resizeElement = sprotty_1.findParentByFeature(this.activeResizeHandle, model_1.isResizable);
            this.initialBounds = {
                x: resizeElement.bounds.x,
                y: resizeElement.bounds.y,
                width: resizeElement.bounds.width,
                height: resizeElement.bounds.height
            };
        }
    }
    updatePosition(target, event) {
        if (this.lastDragPosition) {
            const newDragPosition = { x: event.pageX, y: event.pageY };
            const viewport = sprotty_1.findParentByFeature(target, sprotty_1.isViewport);
            const zoom = viewport ? viewport.zoom : 1;
            const dx = (event.pageX - this.lastDragPosition.x) / zoom;
            const dy = (event.pageY - this.lastDragPosition.y) / zoom;
            const deltaToLastPosition = { x: dx, y: dy };
            this.lastDragPosition = newDragPosition;
            // update position delta with latest delta
            this.positionDelta.x += deltaToLastPosition.x;
            this.positionDelta.y += deltaToLastPosition.y;
            // snap our delta and only send update if the position actually changes
            // otherwise accumulate delta until we do snap to an update
            const positionUpdate = this.snap(this.positionDelta, target, !event.altKey);
            if (positionUpdate.x === 0 && positionUpdate.y === 0) {
                return undefined;
            }
            // we update our position so we update our delta by the snapped position
            this.positionDelta.x -= positionUpdate.x;
            this.positionDelta.y -= positionUpdate.y;
            return positionUpdate;
        }
        return undefined;
    }
    reset() {
        if (this.activeResizeElement && model_1.isResizable(this.activeResizeElement)) {
            this.tool.dispatchFeedback([new change_bounds_tool_feedback_1.HideChangeBoundsToolResizeFeedbackAction()], this);
        }
        this.tool.dispatchActions([css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.DEFAULT)]);
        this.resetPosition();
    }
    resetPosition() {
        this.activeResizeHandle = undefined;
        this.lastDragPosition = undefined;
        this.positionDelta = { x: 0, y: 0 };
    }
    handleResizeOnClient(positionUpdate) {
        if (!this.activeResizeHandle) {
            return [];
        }
        const resizeElement = sprotty_1.findParentByFeature(this.activeResizeHandle, model_1.isResizable);
        if (this.isActiveResizeElement(resizeElement)) {
            switch (this.activeResizeHandle.location) {
                case model_1.ResizeHandleLocation.TopLeft:
                    return this.handleTopLeftResize(resizeElement, positionUpdate);
                case model_1.ResizeHandleLocation.TopRight:
                    return this.handleTopRightResize(resizeElement, positionUpdate);
                case model_1.ResizeHandleLocation.BottomLeft:
                    return this.handleBottomLeftResize(resizeElement, positionUpdate);
                case model_1.ResizeHandleLocation.BottomRight:
                    return this.handleBottomRightResize(resizeElement, positionUpdate);
            }
        }
        return [];
    }
    handleTopLeftResize(resizeElement, positionUpdate) {
        return this.createSetBoundsAction(resizeElement, resizeElement.bounds.x + positionUpdate.x, resizeElement.bounds.y + positionUpdate.y, resizeElement.bounds.width - positionUpdate.x, resizeElement.bounds.height - positionUpdate.y);
    }
    handleTopRightResize(resizeElement, positionUpdate) {
        return this.createSetBoundsAction(resizeElement, resizeElement.bounds.x, resizeElement.bounds.y + positionUpdate.y, resizeElement.bounds.width + positionUpdate.x, resizeElement.bounds.height - positionUpdate.y);
    }
    handleBottomLeftResize(resizeElement, positionUpdate) {
        return this.createSetBoundsAction(resizeElement, resizeElement.bounds.x + positionUpdate.x, resizeElement.bounds.y, resizeElement.bounds.width - positionUpdate.x, resizeElement.bounds.height + positionUpdate.y);
    }
    handleBottomRightResize(resizeElement, positionUpdate) {
        return this.createSetBoundsAction(resizeElement, resizeElement.bounds.x, resizeElement.bounds.y, resizeElement.bounds.width + positionUpdate.x, resizeElement.bounds.height + positionUpdate.y);
    }
    createChangeBoundsAction(element) {
        if (this.isValidBoundChange(element, element.bounds, element.bounds)) {
            return [new protocol_1.ChangeBoundsOperation([smodel_util_1.toElementAndBounds(element)])];
        }
        else if (this.initialBounds) {
            const actions = [];
            if (this.tool.movementRestrictor) {
                actions.push(movement_restrictor_1.removeMovementRestrictionFeedback(element, this.tool.movementRestrictor));
            }
            actions.push(new sprotty_1.SetBoundsAction([{ elementId: element.id, newPosition: this.initialBounds, newSize: this.initialBounds }]));
            return actions;
        }
        return [];
    }
    createElementAndBounds(element) {
        if (this.isValidBoundChange(element, element.bounds, element.bounds)) {
            return [smodel_util_1.toElementAndBounds(element)];
        }
        return [];
    }
    createSetBoundsAction(element, x, y, width, height) {
        const newPosition = { x, y };
        const newSize = { width, height };
        const result = [];
        if (this.isValidBoundChange(element, newPosition, newSize)) {
            if (this.tool.movementRestrictor) {
                result.push(movement_restrictor_1.removeMovementRestrictionFeedback(element, this.tool.movementRestrictor));
            }
            result.push(new sprotty_1.SetBoundsAction([{ elementId: element.id, newPosition, newSize }]));
        }
        else if (this.isValidSize(element, newSize)) {
            if (this.tool.movementRestrictor) {
                result.push(movement_restrictor_1.createMovementRestrictionFeedback(element, this.tool.movementRestrictor));
            }
            result.push(new sprotty_1.SetBoundsAction([{ elementId: element.id, newPosition, newSize }]));
        }
        return result;
    }
    snap(position, element, isSnap) {
        return isSnap && this.tool.snapper ? this.tool.snapper.snap(position, element) : { x: position.x, y: position.y };
    }
    isValidBoundChange(element, newPosition, newSize) {
        return this.isValidSize(element, newSize) && this.isValidMove(element, newPosition);
    }
    isValidSize(element, size) {
        return layout_utils_1.isValidSize(element, size);
    }
    isValidMove(element, newPosition) {
        return layout_utils_1.isValidMove(element, newPosition, this.tool.movementRestrictor);
    }
}
exports.ChangeBoundsListener = ChangeBoundsListener;
ChangeBoundsListener.CSS_CLASS_ACTIVE = 'active';
//# sourceMappingURL=change-bounds-tool.js.map