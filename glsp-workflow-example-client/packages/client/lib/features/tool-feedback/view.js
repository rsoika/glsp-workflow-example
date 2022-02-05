"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SResizeHandleView = exports.FeedbackEdgeEndView = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const model_1 = require("../change-bounds/model");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JSX = { createElement: sprotty_1.svg };
/**
 * This view is used for the invisible end of the feedback edge.
 * A feedback edge is shown as a visual feedback when creating edges.
 */
let FeedbackEdgeEndView = class FeedbackEdgeEndView {
    render(model, context) {
        const position = model.position || sprotty_1.ORIGIN_POINT;
        return JSX.createElement("g", { x: position.x, y: position.y });
    }
};
FeedbackEdgeEndView = __decorate([
    inversify_1.injectable()
], FeedbackEdgeEndView);
exports.FeedbackEdgeEndView = FeedbackEdgeEndView;
let SResizeHandleView = class SResizeHandleView {
    render(handle, context) {
        const position = this.getPosition(handle);
        if (position !== undefined) {
            const node = (JSX.createElement("circle", { "class-sprotty-resize-handle": true, "class-mouseover": handle.hoverFeedback, cx: position.x, cy: position.y, r: this.getRadius() }));
            sprotty_1.setAttr(node, 'data-kind', handle.location);
            return node;
        }
        // Fallback: Create an empty group
        return JSX.createElement("g", null);
    }
    getPosition(handle) {
        const parent = handle.parent;
        if (model_1.isResizable(parent)) {
            if (handle.location === model_1.ResizeHandleLocation.TopLeft) {
                return { x: 0, y: 0 };
            }
            else if (handle.location === model_1.ResizeHandleLocation.TopRight) {
                return { x: parent.bounds.width, y: 0 };
            }
            else if (handle.location === model_1.ResizeHandleLocation.BottomLeft) {
                return { x: 0, y: parent.bounds.height };
            }
            else if (handle.location === model_1.ResizeHandleLocation.BottomRight) {
                return { x: parent.bounds.width, y: parent.bounds.height };
            }
        }
        return undefined;
    }
    getRadius() {
        return 7;
    }
};
SResizeHandleView = __decorate([
    inversify_1.injectable()
], SResizeHandleView);
exports.SResizeHandleView = SResizeHandleView;
//# sourceMappingURL=view.js.map