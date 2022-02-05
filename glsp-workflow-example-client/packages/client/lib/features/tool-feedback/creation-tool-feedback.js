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
exports.removeFeedbackEdge = exports.drawFeedbackEdge = exports.defaultFeedbackEdgeSchema = exports.feedbackEdgeEndId = exports.feedbackEdgeId = exports.FeedbackEdgeEndMovingMouseListener = exports.FeedbackEdgeEnd = exports.RemoveFeedbackEdgeCommand = exports.RemoveFeedbackEdgeAction = exports.DrawFeedbackEdgeCommand = exports.DrawFeedbackEdgeAction = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const smodel_util_1 = require("../../utils/smodel-util");
const viewpoint_util_1 = require("../../utils/viewpoint-util");
const model_1 = require("./model");
class DrawFeedbackEdgeAction {
    constructor(elementTypeId, sourceId, edgeSchema, kind = DrawFeedbackEdgeCommand.KIND) {
        this.elementTypeId = elementTypeId;
        this.sourceId = sourceId;
        this.edgeSchema = edgeSchema;
        this.kind = kind;
    }
}
exports.DrawFeedbackEdgeAction = DrawFeedbackEdgeAction;
let DrawFeedbackEdgeCommand = class DrawFeedbackEdgeCommand extends model_1.FeedbackCommand {
    constructor(action) {
        super();
        this.action = action;
    }
    execute(context) {
        const feedbackEdgeSchema = this.action.edgeSchema ? this.action.edgeSchema : exports.defaultFeedbackEdgeSchema;
        drawFeedbackEdge(context, this.action.sourceId, this.action.elementTypeId, feedbackEdgeSchema);
        return context.root;
    }
};
DrawFeedbackEdgeCommand.KIND = 'drawFeedbackEdge';
DrawFeedbackEdgeCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [DrawFeedbackEdgeAction])
], DrawFeedbackEdgeCommand);
exports.DrawFeedbackEdgeCommand = DrawFeedbackEdgeCommand;
class RemoveFeedbackEdgeAction {
    constructor(kind = RemoveFeedbackEdgeCommand.KIND) {
        this.kind = kind;
    }
}
exports.RemoveFeedbackEdgeAction = RemoveFeedbackEdgeAction;
let RemoveFeedbackEdgeCommand = class RemoveFeedbackEdgeCommand extends model_1.FeedbackCommand {
    execute(context) {
        removeFeedbackEdge(context.root);
        return context.root;
    }
};
RemoveFeedbackEdgeCommand.KIND = 'removeFeedbackEdgeCommand';
RemoveFeedbackEdgeCommand = __decorate([
    inversify_1.injectable()
], RemoveFeedbackEdgeCommand);
exports.RemoveFeedbackEdgeCommand = RemoveFeedbackEdgeCommand;
class FeedbackEdgeEnd extends sprotty_1.SDanglingAnchor {
    constructor(sourceId, elementTypeId, feedbackEdge = undefined, type = FeedbackEdgeEnd.TYPE) {
        super();
        this.sourceId = sourceId;
        this.elementTypeId = elementTypeId;
        this.feedbackEdge = feedbackEdge;
        this.type = type;
    }
}
exports.FeedbackEdgeEnd = FeedbackEdgeEnd;
FeedbackEdgeEnd.TYPE = 'feedback-edge-end';
class FeedbackEdgeEndMovingMouseListener extends sprotty_1.MouseListener {
    constructor(anchorRegistry) {
        super();
        this.anchorRegistry = anchorRegistry;
    }
    mouseMove(target, event) {
        const root = target.root;
        const edgeEnd = root.index.getById(feedbackEdgeEndId(root));
        if (!(edgeEnd instanceof FeedbackEdgeEnd) || !edgeEnd.feedbackEdge) {
            return [];
        }
        const edge = edgeEnd.feedbackEdge;
        const position = viewpoint_util_1.getAbsolutePosition(edgeEnd, event);
        const endAtMousePosition = sprotty_1.findChildrenAtPosition(target.root, position).reverse().find(element => sprotty_1.isConnectable(element) && element.canConnect(edge, 'target'));
        if (endAtMousePosition instanceof sprotty_1.SConnectableElement && edge.source && sprotty_1.isBoundsAware(edge.source)) {
            const anchor = this.computeAbsoluteAnchor(endAtMousePosition, sprotty_1.center(viewpoint_util_1.toAbsoluteBounds(edge.source)));
            if (sprotty_1.euclideanDistance(anchor, edgeEnd.position) > 1) {
                return [new sprotty_1.MoveAction([{ elementId: edgeEnd.id, toPosition: anchor }], false)];
            }
        }
        else {
            return [new sprotty_1.MoveAction([{ elementId: edgeEnd.id, toPosition: position }], false)];
        }
        return [];
    }
    computeAbsoluteAnchor(element, absoluteReferencePoint, offset) {
        const referencePointInParent = absoluteToParent(element, absoluteReferencePoint);
        const anchorComputer = this.anchorRegistry.get(sprotty_1.PolylineEdgeRouter.KIND, element.anchorKind);
        let anchor = anchorComputer.getAnchor(element, referencePointInParent, offset);
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
exports.FeedbackEdgeEndMovingMouseListener = FeedbackEdgeEndMovingMouseListener;
/**
 * Convert a point, specified in absolute coordinates, to a point relative
 * to the parent of the specified child element.
 * @param element the child element
 * @param absolutePoint a point in absolute coordinates
 * @returns the equivalent point, relative to the element's parent coordinates
 */
function absoluteToParent(element, absolutePoint) {
    if (sprotty_1.isBoundsAware(element.parent)) {
        return absoluteToLocal(element.parent, absolutePoint);
    }
    // If the parent is not bounds-aware, assume it's at 0; 0 and proceed
    return absoluteToLocal(element, absolutePoint);
}
/**
 * Convert a point, specified in absolute coordinates, to a point relative
 * to the specified element.
 * @param element the element
 * @param absolutePoint a point in absolute coordinates
 * @returns the equivalent point, relative to the element's coordinates
 */
function absoluteToLocal(element, absolutePoint) {
    const absoluteElementBounds = viewpoint_util_1.toAbsoluteBounds(element);
    return { x: absolutePoint.x - absoluteElementBounds.x, y: absolutePoint.y - absoluteElementBounds.y };
}
function feedbackEdgeId(root) {
    return root.id + '_feedback_edge';
}
exports.feedbackEdgeId = feedbackEdgeId;
function feedbackEdgeEndId(root) {
    return root.id + '_feedback_anchor';
}
exports.feedbackEdgeEndId = feedbackEdgeEndId;
exports.defaultFeedbackEdgeSchema = {
    cssClasses: ['feedback-edge'],
    opacity: 0.3
};
function drawFeedbackEdge(context, sourceId, elementTypeId, feedbackEdgeSchema) {
    const root = context.root;
    const sourceChild = root.index.getById(sourceId);
    if (!sourceChild) {
        return;
    }
    const source = sprotty_1.findParentByFeature(sourceChild, sprotty_1.isConnectable);
    if (!source || !sprotty_1.isBoundsAware(source)) {
        return;
    }
    const edgeEnd = new FeedbackEdgeEnd(source.id, elementTypeId);
    edgeEnd.id = feedbackEdgeEndId(root);
    edgeEnd.position = viewpoint_util_1.toAbsolutePosition(source);
    feedbackEdgeSchema.id = feedbackEdgeId(root);
    feedbackEdgeSchema.type = elementTypeId;
    feedbackEdgeSchema.sourceId = source.id;
    feedbackEdgeSchema.targetId = edgeEnd.id;
    const feedbackEdge = context.modelFactory.createElement(feedbackEdgeSchema);
    if (smodel_util_1.isRoutable(feedbackEdge)) {
        edgeEnd.feedbackEdge = feedbackEdge;
        root.add(edgeEnd);
        root.add(feedbackEdge);
    }
}
exports.drawFeedbackEdge = drawFeedbackEdge;
function removeFeedbackEdge(root) {
    const feedbackEdge = root.index.getById(feedbackEdgeId(root));
    const feedbackEdgeEnd = root.index.getById(feedbackEdgeEndId(root));
    if (feedbackEdge instanceof sprotty_1.SChildElement) {
        root.remove(feedbackEdge);
    }
    if (feedbackEdgeEnd instanceof sprotty_1.SChildElement) {
        root.remove(feedbackEdgeEnd);
    }
}
exports.removeFeedbackEdge = removeFeedbackEdge;
//# sourceMappingURL=creation-tool-feedback.js.map