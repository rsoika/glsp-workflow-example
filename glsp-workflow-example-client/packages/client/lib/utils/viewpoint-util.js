"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toAbsoluteSize = exports.toAbsolutePosition = exports.toAbsoluteBounds = exports.getAbsolutePosition = void 0;
const sprotty_1 = require("sprotty");
/**
 * Return the position corresponding to this mouse event (Browser coordinates)
 * in the diagram coordinates system (i.e. relative to the Diagram's 0;0 point)
 *
 * This functions takes into account the following transformations:
 * - Location of the Diagram Canvas inside of the browser's page
 * - Current viewport Scroll and Zoom
 *
 * @param target
 *  An element from the diagram
 * @param mouseEvent
 *  A mouseEvent
 */
function getAbsolutePosition(target, mouseEvent) {
    let xPos = mouseEvent.pageX;
    let yPos = mouseEvent.pageY;
    const canvasBounds = target.root.canvasBounds;
    xPos -= canvasBounds.x;
    yPos -= canvasBounds.y;
    const viewport = sprotty_1.findParentByFeature(target, sprotty_1.isViewport);
    const zoom = viewport ? viewport.zoom : 1;
    if (viewport) {
        const scroll = { x: viewport.scroll.x, y: viewport.scroll.y };
        xPos += scroll.x * zoom;
        yPos += scroll.y * zoom;
        xPos /= zoom;
        yPos /= zoom;
    }
    return {
        x: xPos,
        y: yPos
    };
}
exports.getAbsolutePosition = getAbsolutePosition;
/**
 * Translates the bounds of the diagram element (local coordinates) into the diagram coordinates system
 * (i.e. relative to the Diagram's 0;0 point)
 *
 * @param target  A bounds-aware element from the diagram
 */
function toAbsoluteBounds(element) {
    const location = sprotty_1.isAlignable(element) ? element.alignment : sprotty_1.ORIGIN_POINT;
    const x = location.x;
    const y = location.y;
    const width = element.bounds.width;
    const height = element.bounds.height;
    return sprotty_1.translateBounds({ x, y, width, height }, element, element.root);
}
exports.toAbsoluteBounds = toAbsoluteBounds;
/**
 * Translates the position of the diagram element (local coordinates) into the diagram coordinates system
 * (i.e. relative to the Diagram's 0;0 point)
 *
 * @param target  A bounds-aware element from the diagram
 */
function toAbsolutePosition(target) {
    return toAbsoluteBounds(target);
}
exports.toAbsolutePosition = toAbsolutePosition;
/**
 * Translates the size of the diagram element (local coordinates) into the diagram coordinates system
 * (i.e. relative to the Diagram's 0;0 point)
 *
 * @param target  A bounds-aware element from the diagram
 */
function toAbsoluteSize(target) {
    return toAbsoluteBounds(target);
}
exports.toAbsoluteSize = toAbsoluteSize;
//# sourceMappingURL=viewpoint-util.js.map