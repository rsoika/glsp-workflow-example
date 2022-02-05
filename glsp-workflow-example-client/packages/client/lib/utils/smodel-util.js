"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getElementTypeId = exports.hasCompatibleType = exports.toElementAndRoutingPoints = exports.toElementAndBounds = exports.isSelectableAndBoundsAware = exports.isRoutingHandle = exports.isRoutable = exports.isNonRoutableSelectedBoundsAware = exports.isNonRoutableSelectedMovableBoundsAware = exports.removeCssClasses = exports.addCssClasses = exports.isNotUndefined = exports.getSelectedElementCount = exports.hasSelectedElements = exports.getMatchingElements = exports.forEachElement = exports.getIndex = void 0;
const sprotty_1 = require("sprotty");
function getIndex(element) {
    return element.root.index;
}
exports.getIndex = getIndex;
function forEachElement(element, predicate, runnable) {
    getIndex(element).all().filter(predicate).forEach(runnable);
}
exports.forEachElement = forEachElement;
function getMatchingElements(element, predicate) {
    const matching = [];
    forEachElement(element, predicate, item => matching.push(item));
    return matching;
}
exports.getMatchingElements = getMatchingElements;
function hasSelectedElements(element) {
    return getSelectedElementCount(element) > 0;
}
exports.hasSelectedElements = hasSelectedElements;
function getSelectedElementCount(element) {
    let selected = 0;
    getIndex(element)
        .all()
        .filter(sprotty_1.isSelected)
        .forEach(e => (selected = selected + 1));
    return selected;
}
exports.getSelectedElementCount = getSelectedElementCount;
function isNotUndefined(element) {
    return element !== undefined;
}
exports.isNotUndefined = isNotUndefined;
function addCssClasses(root, cssClasses) {
    if (root.cssClasses === undefined) {
        root.cssClasses = [];
    }
    for (const cssClass of cssClasses) {
        if (root.cssClasses.indexOf(cssClass) < 0) {
            root.cssClasses.push(cssClass);
        }
    }
}
exports.addCssClasses = addCssClasses;
function removeCssClasses(root, cssClasses) {
    if (root.cssClasses === undefined || root.cssClasses.length === 0) {
        return;
    }
    for (const cssClass of cssClasses) {
        const index = root.cssClasses.indexOf(cssClass);
        if (index !== -1) {
            root.cssClasses.splice(root.cssClasses.indexOf(cssClass), 1);
        }
    }
}
exports.removeCssClasses = removeCssClasses;
function isNonRoutableSelectedMovableBoundsAware(element) {
    return isNonRoutableSelectedBoundsAware(element) && sprotty_1.isMoveable(element);
}
exports.isNonRoutableSelectedMovableBoundsAware = isNonRoutableSelectedMovableBoundsAware;
function isNonRoutableSelectedBoundsAware(element) {
    return sprotty_1.isBoundsAware(element) && sprotty_1.isSelected(element) && !isRoutable(element);
}
exports.isNonRoutableSelectedBoundsAware = isNonRoutableSelectedBoundsAware;
function isRoutable(element) {
    return element instanceof sprotty_1.SRoutableElement && element.routingPoints !== undefined;
}
exports.isRoutable = isRoutable;
function isRoutingHandle(element) {
    return element !== undefined && element instanceof sprotty_1.SRoutingHandle;
}
exports.isRoutingHandle = isRoutingHandle;
function isSelectableAndBoundsAware(element) {
    return sprotty_1.isSelectable(element) && sprotty_1.isBoundsAware(element);
}
exports.isSelectableAndBoundsAware = isSelectableAndBoundsAware;
function toElementAndBounds(element) {
    return {
        elementId: element.id,
        newPosition: {
            x: element.bounds.x,
            y: element.bounds.y
        },
        newSize: {
            width: element.bounds.width,
            height: element.bounds.height
        }
    };
}
exports.toElementAndBounds = toElementAndBounds;
function toElementAndRoutingPoints(element) {
    return {
        elementId: element.id,
        newRoutingPoints: element.routingPoints
    };
}
exports.toElementAndRoutingPoints = toElementAndRoutingPoints;
/**
 * Checks if the model is compatible with the passed type string.
 * (either has the same type or a subtype of this type)
 */
function hasCompatibleType(input, type) {
    const inputType = getElementTypeId(input);
    return inputType === type ? true : inputType.split(':').includes(type);
}
exports.hasCompatibleType = hasCompatibleType;
function getElementTypeId(input) {
    if (typeof input === 'string') {
        return input;
    }
    else {
        return input['type'];
    }
}
exports.getElementTypeId = getElementTypeId;
//# sourceMappingURL=smodel-util.js.map