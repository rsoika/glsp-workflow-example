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
exports.FeedbackEdgeRouteMovingMouseListener = exports.FeedbackEdgeSourceMovingMouseListener = exports.FeedbackEdgeTargetMovingMouseListener = exports.DrawFeedbackEdgeSourceCommand = exports.DrawFeedbackEdgeSourceAction = exports.SwitchRoutingModeCommand = exports.SwitchRoutingModeAction = exports.HideEdgeReconnectHandlesFeedbackCommand = exports.ShowEdgeReconnectHandlesFeedbackCommand = exports.HideEdgeReconnectHandlesFeedbackAction = exports.ShowEdgeReconnectHandlesFeedbackAction = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const smodel_util_1 = require("../../utils/smodel-util");
const viewpoint_util_1 = require("../../utils/viewpoint-util");
const model_1 = require("../reconnect/model");
const creation_tool_feedback_1 = require("./creation-tool-feedback");
const model_2 = require("./model");
/**
 * RECONNECT HANDLES FEEDBACK
 */
class ShowEdgeReconnectHandlesFeedbackAction {
    constructor(elementId, kind = ShowEdgeReconnectHandlesFeedbackCommand.KIND) {
        this.elementId = elementId;
        this.kind = kind;
    }
}
exports.ShowEdgeReconnectHandlesFeedbackAction = ShowEdgeReconnectHandlesFeedbackAction;
class HideEdgeReconnectHandlesFeedbackAction {
    constructor(kind = HideEdgeReconnectHandlesFeedbackCommand.KIND) {
        this.kind = kind;
    }
}
exports.HideEdgeReconnectHandlesFeedbackAction = HideEdgeReconnectHandlesFeedbackAction;
let ShowEdgeReconnectHandlesFeedbackCommand = class ShowEdgeReconnectHandlesFeedbackCommand extends model_2.FeedbackCommand {
    constructor(action) {
        super();
        this.action = action;
    }
    execute(context) {
        const index = context.root.index;
        index.all().filter(smodel_util_1.isRoutable).forEach(model_1.removeReconnectHandles);
        if (smodel_util_1.isNotUndefined(this.action.elementId)) {
            const routableElement = index.getById(this.action.elementId);
            if (smodel_util_1.isNotUndefined(routableElement) && smodel_util_1.isRoutable(routableElement)) {
                model_1.addReconnectHandles(routableElement);
            }
        }
        return context.root;
    }
};
ShowEdgeReconnectHandlesFeedbackCommand.KIND = 'showReconnectHandlesFeedback';
ShowEdgeReconnectHandlesFeedbackCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [ShowEdgeReconnectHandlesFeedbackAction])
], ShowEdgeReconnectHandlesFeedbackCommand);
exports.ShowEdgeReconnectHandlesFeedbackCommand = ShowEdgeReconnectHandlesFeedbackCommand;
let HideEdgeReconnectHandlesFeedbackCommand = class HideEdgeReconnectHandlesFeedbackCommand extends model_2.FeedbackCommand {
    constructor(action) {
        super();
        this.action = action;
    }
    execute(context) {
        const index = context.root.index;
        index.all().filter(smodel_util_1.isRoutable).forEach(model_1.removeReconnectHandles);
        return context.root;
    }
};
HideEdgeReconnectHandlesFeedbackCommand.KIND = 'hideReconnectHandlesFeedback';
HideEdgeReconnectHandlesFeedbackCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [HideEdgeReconnectHandlesFeedbackAction])
], HideEdgeReconnectHandlesFeedbackCommand);
exports.HideEdgeReconnectHandlesFeedbackCommand = HideEdgeReconnectHandlesFeedbackCommand;
/**
 * ROUTING FEEDBACK
 */
class SwitchRoutingModeAction extends sprotty_1.SwitchEditModeAction {
    constructor(elementsToActivate = [], elementsToDeactivate = [], kind = SwitchRoutingModeCommand.KIND) {
        super(elementsToActivate, elementsToDeactivate);
        this.elementsToActivate = elementsToActivate;
        this.elementsToDeactivate = elementsToDeactivate;
        this.kind = kind;
    }
}
exports.SwitchRoutingModeAction = SwitchRoutingModeAction;
let SwitchRoutingModeCommand = class SwitchRoutingModeCommand extends sprotty_1.SwitchEditModeCommand {
    constructor(action) {
        super(action);
    }
};
SwitchRoutingModeCommand.KIND = 'switchRoutingMode';
SwitchRoutingModeCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [SwitchRoutingModeAction])
], SwitchRoutingModeCommand);
exports.SwitchRoutingModeCommand = SwitchRoutingModeCommand;
/**
 * SOURCE AND TARGET EDGE FEEDBACK
 */
class DrawFeedbackEdgeSourceAction {
    constructor(elementTypeId, targetId, kind = DrawFeedbackEdgeSourceCommand.KIND) {
        this.elementTypeId = elementTypeId;
        this.targetId = targetId;
        this.kind = kind;
    }
}
exports.DrawFeedbackEdgeSourceAction = DrawFeedbackEdgeSourceAction;
let DrawFeedbackEdgeSourceCommand = class DrawFeedbackEdgeSourceCommand extends model_2.FeedbackCommand {
    constructor(action) {
        super();
        this.action = action;
    }
    execute(context) {
        drawFeedbackEdgeSource(context, this.action.targetId, this.action.elementTypeId);
        return context.root;
    }
};
DrawFeedbackEdgeSourceCommand.KIND = 'drawFeedbackEdgeSource';
DrawFeedbackEdgeSourceCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [DrawFeedbackEdgeSourceAction])
], DrawFeedbackEdgeSourceCommand);
exports.DrawFeedbackEdgeSourceCommand = DrawFeedbackEdgeSourceCommand;
/**
 * SOURCE AND TARGET MOUSE MOVE LISTENER
 */
class FeedbackEdgeTargetMovingMouseListener extends creation_tool_feedback_1.FeedbackEdgeEndMovingMouseListener {
    constructor(anchorRegistry) {
        super(anchorRegistry);
        this.anchorRegistry = anchorRegistry;
    }
}
exports.FeedbackEdgeTargetMovingMouseListener = FeedbackEdgeTargetMovingMouseListener;
class FeedbackEdgeSourceMovingMouseListener extends sprotty_1.MouseListener {
    constructor(anchorRegistry) {
        super();
        this.anchorRegistry = anchorRegistry;
    }
    mouseMove(target, event) {
        const root = target.root;
        const edgeEnd = root.index.getById(creation_tool_feedback_1.feedbackEdgeEndId(root));
        if (!(edgeEnd instanceof creation_tool_feedback_1.FeedbackEdgeEnd) || !edgeEnd.feedbackEdge) {
            return [];
        }
        const edge = edgeEnd.feedbackEdge;
        const position = viewpoint_util_1.getAbsolutePosition(edgeEnd, event);
        const endAtMousePosition = sprotty_1.findChildrenAtPosition(target.root, position).find(e => sprotty_1.isConnectable(e) && e.canConnect(edge, 'source'));
        if (endAtMousePosition instanceof sprotty_1.SConnectableElement && edge.target && sprotty_1.isBoundsAware(edge.target)) {
            const anchor = this.computeAbsoluteAnchor(endAtMousePosition, sprotty_1.center(edge.target.bounds));
            if (sprotty_1.euclideanDistance(anchor, edgeEnd.position) > 1) {
                return [new sprotty_1.MoveAction([{ elementId: edgeEnd.id, toPosition: anchor }], false)];
            }
        }
        else {
            return [new sprotty_1.MoveAction([{ elementId: edgeEnd.id, toPosition: position }], false)];
        }
        return [];
    }
    computeAbsoluteAnchor(element, referencePoint, offset) {
        const anchorComputer = this.anchorRegistry.get(sprotty_1.PolylineEdgeRouter.KIND, element.anchorKind);
        let anchor = anchorComputer.getAnchor(element, referencePoint, offset);
        // The anchor is computed in the local coordinate system of the element.
        // If the element is a nested child element we have to add the absolute position of its parent to the anchor.
        if (element.parent !== element.root) {
            const parent = sprotty_1.findParentByFeature(element.parent, sprotty_1.isBoundsAware);
            if (parent) {
                const absoluteParentPosition = viewpoint_util_1.toAbsoluteBounds(parent);
                anchor = sprotty_1.add(absoluteParentPosition, anchor);
            }
        }
        return anchor;
    }
}
exports.FeedbackEdgeSourceMovingMouseListener = FeedbackEdgeSourceMovingMouseListener;
class FeedbackEdgeRouteMovingMouseListener extends sprotty_1.MouseListener {
    constructor(edgeRouterRegistry) {
        super();
        this.edgeRouterRegistry = edgeRouterRegistry;
        this.hasDragged = false;
    }
    mouseDown(target, event) {
        const result = [];
        if (event.button === 0) {
            const routingHandle = sprotty_1.findParentByFeature(target, smodel_util_1.isRoutingHandle);
            if (routingHandle !== undefined) {
                result.push(new SwitchRoutingModeAction([target.id], []));
                this.lastDragPosition = { x: event.pageX, y: event.pageY };
            }
            else {
                this.lastDragPosition = undefined;
            }
            this.hasDragged = false;
        }
        return result;
    }
    mouseMove(target, event) {
        const result = [];
        if (event.buttons === 0) {
            this.mouseUp(target, event);
        }
        else if (this.lastDragPosition) {
            const viewport = sprotty_1.findParentByFeature(target, sprotty_1.isViewport);
            this.hasDragged = true;
            const zoom = viewport ? viewport.zoom : 1;
            const dx = (event.pageX - this.lastDragPosition.x) / zoom;
            const dy = (event.pageY - this.lastDragPosition.y) / zoom;
            const handleMoves = [];
            target.root.index
                .all()
                .filter(element => sprotty_1.isSelected(element))
                .forEach(element => {
                if (smodel_util_1.isRoutingHandle(element)) {
                    const point = this.getHandlePosition(element);
                    if (point !== undefined) {
                        handleMoves.push({
                            elementId: element.id,
                            fromPosition: point,
                            toPosition: {
                                x: point.x + dx,
                                y: point.y + dy
                            }
                        });
                    }
                }
            });
            this.lastDragPosition = { x: event.pageX, y: event.pageY };
            if (handleMoves.length > 0) {
                result.push(new sprotty_1.MoveAction(handleMoves, false));
            }
        }
        return result;
    }
    getHandlePosition(handle) {
        if (this.edgeRouterRegistry) {
            const parent = handle.parent;
            if (!smodel_util_1.isRoutable(parent)) {
                return undefined;
            }
            const router = this.edgeRouterRegistry.get(parent.routerKind);
            const route = router.route(parent);
            return router.getHandlePosition(parent, route, handle);
        }
        return undefined;
    }
    mouseEnter(target, event) {
        if (target instanceof sprotty_1.SModelRoot && event.buttons === 0) {
            this.mouseUp(target, event);
        }
        return [];
    }
    mouseUp(_target, event) {
        this.hasDragged = false;
        this.lastDragPosition = undefined;
        return [];
    }
    decorate(vnode, _element) {
        return vnode;
    }
}
exports.FeedbackEdgeRouteMovingMouseListener = FeedbackEdgeRouteMovingMouseListener;
/**
 * UTILITY FUNCTIONS
 */
function drawFeedbackEdgeSource(context, targetId, elementTypeId) {
    const root = context.root;
    const targetChild = root.index.getById(targetId);
    if (!targetChild) {
        return;
    }
    const target = sprotty_1.findParentByFeature(targetChild, sprotty_1.isConnectable);
    if (!target || !sprotty_1.isBoundsAware(target)) {
        return;
    }
    const edgeEnd = new creation_tool_feedback_1.FeedbackEdgeEnd(target.id, elementTypeId);
    edgeEnd.id = creation_tool_feedback_1.feedbackEdgeEndId(root);
    edgeEnd.position = { x: target.bounds.x, y: target.bounds.y };
    const feedbackEdgeSchema = {
        type: 'edge',
        id: creation_tool_feedback_1.feedbackEdgeId(root),
        sourceId: edgeEnd.id,
        targetId: target.id,
        opacity: 0.3
    };
    const feedbackEdge = context.modelFactory.createElement(feedbackEdgeSchema);
    if (smodel_util_1.isRoutable(feedbackEdge)) {
        edgeEnd.feedbackEdge = feedbackEdge;
        root.add(edgeEnd);
        root.add(feedbackEdge);
    }
}
//# sourceMappingURL=edge-edit-tool-feedback.js.map