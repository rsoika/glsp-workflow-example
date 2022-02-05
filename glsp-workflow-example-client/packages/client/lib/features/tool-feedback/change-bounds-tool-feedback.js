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
exports.FeedbackMoveMouseListener = exports.HideChangeBoundsToolResizeFeedbackCommand = exports.ShowChangeBoundsToolResizeFeedbackCommand = exports.HideChangeBoundsToolResizeFeedbackAction = exports.ShowChangeBoundsToolResizeFeedbackAction = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const smodel_util_1 = require("../../utils/smodel-util");
const model_1 = require("../change-bounds/model");
const movement_restrictor_1 = require("../change-bounds/movement-restrictor");
const css_feedback_1 = require("../tool-feedback/css-feedback");
const model_2 = require("./model");
class ShowChangeBoundsToolResizeFeedbackAction {
    constructor(elementId, kind = ShowChangeBoundsToolResizeFeedbackCommand.KIND) {
        this.elementId = elementId;
        this.kind = kind;
    }
}
exports.ShowChangeBoundsToolResizeFeedbackAction = ShowChangeBoundsToolResizeFeedbackAction;
class HideChangeBoundsToolResizeFeedbackAction {
    constructor(kind = HideChangeBoundsToolResizeFeedbackCommand.KIND) {
        this.kind = kind;
    }
}
exports.HideChangeBoundsToolResizeFeedbackAction = HideChangeBoundsToolResizeFeedbackAction;
let ShowChangeBoundsToolResizeFeedbackCommand = class ShowChangeBoundsToolResizeFeedbackCommand extends model_2.FeedbackCommand {
    execute(context) {
        const index = context.root.index;
        index.all().filter(model_1.isResizable).forEach(model_1.removeResizeHandles);
        if (smodel_util_1.isNotUndefined(this.action.elementId)) {
            const resizeElement = index.getById(this.action.elementId);
            if (smodel_util_1.isNotUndefined(resizeElement) && model_1.isResizable(resizeElement)) {
                model_1.addResizeHandles(resizeElement);
            }
        }
        return context.root;
    }
};
ShowChangeBoundsToolResizeFeedbackCommand.KIND = 'showChangeBoundsToolResizeFeedback';
__decorate([
    inversify_1.inject(sprotty_1.TYPES.Action),
    __metadata("design:type", ShowChangeBoundsToolResizeFeedbackAction)
], ShowChangeBoundsToolResizeFeedbackCommand.prototype, "action", void 0);
ShowChangeBoundsToolResizeFeedbackCommand = __decorate([
    inversify_1.injectable()
], ShowChangeBoundsToolResizeFeedbackCommand);
exports.ShowChangeBoundsToolResizeFeedbackCommand = ShowChangeBoundsToolResizeFeedbackCommand;
let HideChangeBoundsToolResizeFeedbackCommand = class HideChangeBoundsToolResizeFeedbackCommand extends model_2.FeedbackCommand {
    execute(context) {
        const index = context.root.index;
        index.all().filter(model_1.isResizable).forEach(model_1.removeResizeHandles);
        return context.root;
    }
};
HideChangeBoundsToolResizeFeedbackCommand.KIND = 'hideChangeBoundsToolResizeFeedback';
__decorate([
    inversify_1.inject(sprotty_1.TYPES.Action),
    __metadata("design:type", HideChangeBoundsToolResizeFeedbackAction)
], HideChangeBoundsToolResizeFeedbackCommand.prototype, "action", void 0);
HideChangeBoundsToolResizeFeedbackCommand = __decorate([
    inversify_1.injectable()
], HideChangeBoundsToolResizeFeedbackCommand);
exports.HideChangeBoundsToolResizeFeedbackCommand = HideChangeBoundsToolResizeFeedbackCommand;
/**
 * This mouse listener provides visual feedback for moving by sending client-side
 * `MoveAction`s while elements are selected and dragged. This will also update
 * their bounds, which is important, as it is not only required for rendering
 * the visual feedback but also the basis for sending the change to the server
 * (see also `tools/MoveTool`).
 */
class FeedbackMoveMouseListener extends sprotty_1.MouseListener {
    constructor(tool) {
        super();
        this.tool = tool;
        this.hasDragged = false;
        this.elementId2startPos = new Map();
    }
    mouseDown(target, event) {
        if (event.button === 0 && !(target instanceof model_1.SResizeHandle)) {
            const moveable = sprotty_1.findParentByFeature(target, sprotty_1.isMoveable);
            if (moveable !== undefined) {
                this.startDragPosition = { x: event.pageX, y: event.pageY };
            }
            else {
                this.startDragPosition = undefined;
            }
            this.hasDragged = false;
        }
        return [];
    }
    mouseMove(target, event) {
        const result = [];
        if (event.buttons === 0) {
            this.mouseUp(target, event);
        }
        else if (this.startDragPosition) {
            if (this.elementId2startPos.size === 0) {
                this.collectStartPositions(target.root);
            }
            this.hasDragged = true;
            const moveAction = this.getElementMoves(target, event, false);
            if (moveAction) {
                result.push(moveAction);
                result.push(css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.MOVE));
            }
        }
        return result;
    }
    collectStartPositions(root) {
        const selectedElements = root.index.all().filter(element => sprotty_1.isSelectable(element) && element.selected);
        const elementsSet = new Set(selectedElements);
        selectedElements
            .filter(element => !this.isChildOfSelected(elementsSet, element))
            .forEach(element => {
            if (sprotty_1.isMoveable(element)) {
                this.elementId2startPos.set(element.id, element.position);
            }
        });
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
    getElementMoves(target, event, isFinished) {
        if (!this.startDragPosition) {
            return undefined;
        }
        const elementMoves = [];
        const viewport = sprotty_1.findParentByFeature(target, sprotty_1.isViewport);
        const zoom = viewport ? viewport.zoom : 1;
        const delta = {
            x: (event.pageX - this.startDragPosition.x) / zoom,
            y: (event.pageY - this.startDragPosition.y) / zoom
        };
        this.elementId2startPos.forEach((startPosition, elementId) => {
            const element = target.root.index.getById(elementId);
            if (element) {
                let toPosition = this.snap({
                    x: startPosition.x + delta.x,
                    y: startPosition.y + delta.y
                }, element, !event.shiftKey);
                if (sprotty_1.isMoveable(element)) {
                    toPosition = this.validateMove(startPosition, toPosition, element, isFinished);
                    elementMoves.push({
                        elementId: element.id,
                        fromPosition: {
                            x: element.position.x,
                            y: element.position.y
                        },
                        toPosition
                    });
                }
            }
        });
        if (elementMoves.length > 0) {
            return new sprotty_1.MoveAction(elementMoves, false, isFinished);
        }
        else {
            return undefined;
        }
    }
    validateMove(startPostion, toPosition, element, isFinished) {
        let newPosition = toPosition;
        if (this.tool.movementRestrictor) {
            const valid = this.tool.movementRestrictor.validate(toPosition, element);
            let action;
            if (!valid) {
                action = movement_restrictor_1.createMovementRestrictionFeedback(element, this.tool.movementRestrictor);
                if (isFinished) {
                    newPosition = startPostion;
                }
            }
            else {
                action = movement_restrictor_1.removeMovementRestrictionFeedback(element, this.tool.movementRestrictor);
            }
            this.tool.dispatchFeedback([action], this);
        }
        return newPosition;
    }
    snap(position, element, isSnap) {
        if (isSnap && this.tool.snapper) {
            return this.tool.snapper.snap(position, element);
        }
        else {
            return position;
        }
    }
    mouseEnter(target, event) {
        if (target instanceof sprotty_1.SModelRoot && event.buttons === 0 && !this.startDragPosition) {
            this.mouseUp(target, event);
        }
        return [];
    }
    mouseUp(target, event) {
        const result = [];
        if (this.startDragPosition) {
            const moveAction = this.getElementMoves(target, event, true);
            if (moveAction) {
                result.push(moveAction);
            }
            if (this.tool.movementRestrictor) {
                this.tool.deregisterFeedback([movement_restrictor_1.removeMovementRestrictionFeedback(target, this.tool.movementRestrictor)], this);
            }
            result.push(css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.DEFAULT));
        }
        this.hasDragged = false;
        this.startDragPosition = undefined;
        this.elementId2startPos.clear();
        return result;
    }
    decorate(vnode, _element) {
        return vnode;
    }
}
exports.FeedbackMoveMouseListener = FeedbackMoveMouseListener;
//# sourceMappingURL=change-bounds-tool-feedback.js.map