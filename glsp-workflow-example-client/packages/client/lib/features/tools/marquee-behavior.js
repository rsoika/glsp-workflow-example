"use strict";
/********************************************************************************
 * Copyright (c) 2021 EclipseSource and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarqueeUtil = void 0;
const sprotty_1 = require("sprotty");
const marquee_tool_feedback_1 = require("../tool-feedback/marquee-tool-feedback");
class MarqueeUtil {
    constructor(marqueeBehavior) {
        if (marqueeBehavior) {
            this.marqueeBehavior = marqueeBehavior;
        }
        else {
            this.marqueeBehavior = { entireElement: false, entireEdge: false };
        }
    }
    updateStartPoint(position) {
        this.startPoint = position;
    }
    updateCurrentPoint(position) {
        this.currentPoint = position;
    }
    drawMarqueeAction() {
        return new marquee_tool_feedback_1.DrawMarqueeAction(this.startPoint, this.currentPoint);
    }
    isEdgePathMarked(path) {
        if (!path) {
            return false;
        }
        const points = path
            .split(/M|L/)
            .filter(p => p)
            .map(p => {
            const coord = p.split(',');
            return { x: parseInt(coord[0], 10), y: parseInt(coord[1], 10) };
        });
        return this.isEdgeMarked(points);
    }
    isEdgeMarked(points) {
        return this.marqueeBehavior.entireEdge ? this.isEntireEdgeMarked(points) : this.isPartOfEdgeMarked(points);
    }
    isNodeMarked(elementBounds) {
        const horizontallyIn = this.startPoint.x < this.currentPoint.x
            ? this.isElementBetweenXAxis(elementBounds, this.startPoint.x, this.currentPoint.x)
            : this.isElementBetweenXAxis(elementBounds, this.currentPoint.x, this.startPoint.x);
        const verticallyIn = this.startPoint.y < this.currentPoint.y
            ? this.isElementBetweenYAxis(elementBounds, this.startPoint.y, this.currentPoint.y)
            : this.isElementBetweenYAxis(elementBounds, this.currentPoint.y, this.startPoint.y);
        return horizontallyIn && verticallyIn;
    }
    isEntireEdgeMarked(points) {
        for (let i = 0; i < points.length; i++) {
            if (!this.pointInRect(points[i])) {
                return false;
            }
        }
        return true;
    }
    isPartOfEdgeMarked(points) {
        for (let i = 0; i < points.length - 1; i++) {
            if (this.isLineMarked(points[i], points[i + 1])) {
                return true;
            }
        }
        return false;
    }
    isLineMarked(point1, point2) {
        const line = new sprotty_1.PointToPointLine(point1, point2);
        return (this.pointInRect(point1) ||
            this.pointInRect(point2) ||
            this.lineIntersect(line, this.startPoint, { x: this.startPoint.x, y: this.currentPoint.y }) ||
            this.lineIntersect(line, this.startPoint, { x: this.currentPoint.x, y: this.startPoint.y }) ||
            this.lineIntersect(line, { x: this.currentPoint.x, y: this.startPoint.y }, this.currentPoint) ||
            this.lineIntersect(line, { x: this.startPoint.x, y: this.currentPoint.y }, this.currentPoint));
    }
    lineIntersect(line, p1, p2) {
        return line.intersection(new sprotty_1.PointToPointLine(p1, p2)) !== undefined;
    }
    pointInRect(point) {
        const boolX = this.startPoint.x <= this.currentPoint.x
            ? this.isBetween(point.x, this.startPoint.x, this.currentPoint.x)
            : this.isBetween(point.x, this.currentPoint.x, this.startPoint.x);
        const boolY = this.startPoint.y <= this.currentPoint.y
            ? this.isBetween(point.y, this.startPoint.y, this.currentPoint.y)
            : this.isBetween(point.y, this.currentPoint.y, this.startPoint.y);
        return boolX && boolY;
    }
    isElementBetweenXAxis(elementBounds, marqueeLeft, marqueeRight) {
        const leftEdge = this.isBetween(elementBounds.x, marqueeLeft, marqueeRight);
        const rightEdge = this.isBetween(elementBounds.x + elementBounds.width, marqueeLeft, marqueeRight);
        if (this.marqueeBehavior.entireElement) {
            return leftEdge && rightEdge;
        }
        return (leftEdge ||
            rightEdge ||
            this.isBetween(marqueeLeft, elementBounds.x, elementBounds.x + elementBounds.width) ||
            this.isBetween(marqueeRight, elementBounds.x, elementBounds.x + elementBounds.width));
    }
    isElementBetweenYAxis(elementBounds, marqueeTop, marqueeBottom) {
        const topEdge = this.isBetween(elementBounds.y, marqueeTop, marqueeBottom);
        const bottomEdge = this.isBetween(elementBounds.y + elementBounds.height, marqueeTop, marqueeBottom);
        if (this.marqueeBehavior.entireElement) {
            return topEdge && bottomEdge;
        }
        return (topEdge ||
            bottomEdge ||
            this.isBetween(marqueeTop, elementBounds.y, elementBounds.y + elementBounds.height) ||
            this.isBetween(marqueeBottom, elementBounds.y, elementBounds.y + elementBounds.height));
    }
    isBetween(x, lower, upper) {
        return lower <= x && x <= upper;
    }
}
exports.MarqueeUtil = MarqueeUtil;
//# sourceMappingURL=marquee-behavior.js.map