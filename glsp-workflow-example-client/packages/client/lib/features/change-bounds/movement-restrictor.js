"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areOverlapping = exports.NoOverlapMovmentRestrictor = exports.removeMovementRestrictionFeedback = exports.createMovementRestrictionFeedback = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const viewpoint_util_1 = require("../../utils/viewpoint-util");
const css_feedback_1 = require("../tool-feedback/css-feedback");
const model_1 = require("./model");
function createMovementRestrictionFeedback(element, movementRestrictor) {
    const elements = [element];
    if (element instanceof sprotty_1.SParentElement) {
        element.children.filter(child => child instanceof model_1.SResizeHandle).forEach(e => elements.push(e));
    }
    return new css_feedback_1.ModifyCSSFeedbackAction(elements, movementRestrictor.cssClasses);
}
exports.createMovementRestrictionFeedback = createMovementRestrictionFeedback;
function removeMovementRestrictionFeedback(element, movementRestrictor) {
    const elements = [element];
    if (element instanceof sprotty_1.SParentElement) {
        element.children.filter(child => child instanceof model_1.SResizeHandle).forEach(e => elements.push(e));
    }
    return new css_feedback_1.ModifyCSSFeedbackAction(elements, undefined, movementRestrictor.cssClasses);
}
exports.removeMovementRestrictionFeedback = removeMovementRestrictionFeedback;
let NoOverlapMovmentRestrictor = class NoOverlapMovmentRestrictor {
    constructor() {
        this.cssClasses = ['movement-not-allowed'];
    }
    validate(newLocation, element) {
        if (!model_1.isBoundsAwareMoveable(element)) {
            return false;
        }
        // Create ghost element at the newLocation
        const ghostElement = Object.create(element);
        ghostElement.bounds = {
            x: newLocation.x,
            y: newLocation.y,
            width: element.bounds.width,
            height: element.bounds.height
        };
        ghostElement.type = 'Ghost';
        ghostElement.id = element.id;
        return !Array.from(element.root.index
            .all()
            .filter(e => e.id !== ghostElement.id && e !== ghostElement.root && e instanceof sprotty_1.SNode)
            .map(e => e)).some(e => areOverlapping(e, ghostElement));
    }
};
NoOverlapMovmentRestrictor = __decorate([
    inversify_1.injectable()
], NoOverlapMovmentRestrictor);
exports.NoOverlapMovmentRestrictor = NoOverlapMovmentRestrictor;
function areOverlapping(element1, element2) {
    const b1 = viewpoint_util_1.toAbsoluteBounds(element1);
    const b2 = viewpoint_util_1.toAbsoluteBounds(element2);
    const r1TopLeft = b1;
    const r1BottomRight = { x: b1.x + b1.width, y: b1.y + b1.height };
    const r2TopLeft = b2;
    const r2BottomRight = { x: b2.x + b2.width, y: b2.y + b2.height };
    // If one rectangle is on left side of other
    if (r1TopLeft.x > r2BottomRight.x || r2TopLeft.x > r1BottomRight.x) {
        return false;
    }
    // If one rectangle is above other
    if (r1BottomRight.y < r2TopLeft.y || r2BottomRight.y < r1TopLeft.y) {
        return false;
    }
    return true;
}
exports.areOverlapping = areOverlapping;
//# sourceMappingURL=movement-restrictor.js.map