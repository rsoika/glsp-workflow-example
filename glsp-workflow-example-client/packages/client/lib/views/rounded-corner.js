"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scaledRadius = exports.RoundedCornerWrapper = void 0;
class RoundedCornerWrapper {
    constructor(element, cornerRadius) {
        this.element = element;
        this.cornerRadius = cornerRadius;
    }
    get size() {
        return this.element.size;
    }
    get topLeftCorner() {
        if (!this._topLeftCorner) {
            this._topLeftCorner = {
                radiusX: scaledRadius(this.cornerRadius.topLeft, this.element.size.width / 2),
                radiusY: scaledRadius(this.cornerRadius.topLeft, this.element.size.height / 2)
            };
        }
        return this._topLeftCorner;
    }
    get topRightCorner() {
        if (!this._topRightCorner) {
            this._topRightCorner = {
                radiusX: scaledRadius(this.cornerRadius.topRight, this.element.size.width / 2),
                radiusY: scaledRadius(this.cornerRadius.topRight, this.element.size.height / 2)
            };
        }
        return this._topRightCorner;
    }
    get bottomRightCorner() {
        if (!this._bottomRightCorner) {
            this._bottomRightCorner = {
                radiusX: scaledRadius(this.cornerRadius.bottomRight, this.element.size.width / 2),
                radiusY: scaledRadius(this.cornerRadius.bottomRight, this.element.size.height / 2)
            };
        }
        return this._bottomRightCorner;
    }
    get bottomLeftCorner() {
        if (!this._bottomLeftCorner) {
            this._bottomLeftCorner = {
                radiusX: scaledRadius(this.cornerRadius.bottomLeft, this.element.size.width / 2),
                radiusY: scaledRadius(this.cornerRadius.bottomLeft, this.element.size.height / 2)
            };
        }
        return this._bottomLeftCorner;
    }
}
exports.RoundedCornerWrapper = RoundedCornerWrapper;
/*
 * Scales the radius if necessary. (Percentual downscaling if the radius is bigger then the maximal allowed length)
 */
function scaledRadius(radius, maximalLength) {
    if (radius <= maximalLength) {
        return radius;
    }
    else {
        return radius * (maximalLength / radius);
    }
}
exports.scaledRadius = scaledRadius;
//# sourceMappingURL=rounded-corner.js.map