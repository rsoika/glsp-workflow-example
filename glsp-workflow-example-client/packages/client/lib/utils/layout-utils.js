"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toValidElementAndBounds = exports.toValidElementMove = exports.isValidMove = exports.isValidSize = exports.getLayoutOptions = exports.minHeight = exports.minWidth = void 0;
function minWidth(element) {
    const layoutOptions = getLayoutOptions(element);
    if (layoutOptions !== undefined && typeof layoutOptions.minWidth === 'number') {
        return layoutOptions.minWidth;
    }
    return 1;
}
exports.minWidth = minWidth;
function minHeight(element) {
    const layoutOptions = getLayoutOptions(element);
    if (layoutOptions !== undefined && typeof layoutOptions.minHeight === 'number') {
        return layoutOptions.minHeight;
    }
    return 1;
}
exports.minHeight = minHeight;
function getLayoutOptions(element) {
    const layoutOptions = element.layoutOptions;
    if (layoutOptions !== undefined) {
        return layoutOptions;
    }
    return undefined;
}
exports.getLayoutOptions = getLayoutOptions;
function isValidSize(element, size) {
    return size.width >= minWidth(element) && size.height >= minHeight(element);
}
exports.isValidSize = isValidSize;
function isValidMove(element, newPosition, movementRestrictor) {
    if (movementRestrictor) {
        return movementRestrictor.validate(newPosition, element);
    }
    return true;
}
exports.isValidMove = isValidMove;
function toValidElementMove(element, move, movementRestrictor) {
    if (!isValidMove(element, move.toPosition, movementRestrictor)) {
        return;
    }
    return move;
}
exports.toValidElementMove = toValidElementMove;
function toValidElementAndBounds(element, bounds, movementRestrictor) {
    if (!isValidMove(element, bounds.newPosition, movementRestrictor)) {
        return;
    }
    const elementMinWidth = minWidth(element);
    if (bounds.newSize.width < elementMinWidth) {
        bounds.newSize.width = elementMinWidth;
    }
    const elementMinHeight = minHeight(element);
    if (bounds.newSize.height < elementMinHeight) {
        bounds.newSize.height = elementMinHeight;
    }
    return bounds;
}
exports.toValidElementAndBounds = toValidElementAndBounds;
//# sourceMappingURL=layout-utils.js.map