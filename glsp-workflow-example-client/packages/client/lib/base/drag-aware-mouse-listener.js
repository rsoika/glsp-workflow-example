"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DragAwareMouseListener = void 0;
const sprotty_1 = require("sprotty");
/**
 * A mouse listener that is aware of prior mouse dragging.
 *
 * Therefore, this listener distinguishes between mouse up events after dragging and
 * mouse up events without prior dragging. Subclasses may override the methods
 * `draggingMouseUp` and/or `nonDraggingMouseUp` to react to only these specific kinds
 * of mouse up events.
 */
class DragAwareMouseListener extends sprotty_1.MouseListener {
    constructor() {
        super(...arguments);
        this._isMouseDown = false;
        this._isMouseDrag = false;
    }
    mouseDown(target, event) {
        this._isMouseDown = true;
        return [];
    }
    mouseMove(target, event) {
        if (this._isMouseDown) {
            this._isMouseDrag = true;
        }
        return [];
    }
    mouseUp(element, event) {
        this._isMouseDown = false;
        if (this._isMouseDrag) {
            this._isMouseDrag = false;
            return this.draggingMouseUp(element, event);
        }
        return this.nonDraggingMouseUp(element, event);
    }
    nonDraggingMouseUp(element, event) {
        return [];
    }
    draggingMouseUp(element, event) {
        return [];
    }
    get isMouseDrag() {
        return this._isMouseDrag;
    }
    get isMouseDown() {
        return this._isMouseDown;
    }
}
exports.DragAwareMouseListener = DragAwareMouseListener;
//# sourceMappingURL=drag-aware-mouse-listener.js.map