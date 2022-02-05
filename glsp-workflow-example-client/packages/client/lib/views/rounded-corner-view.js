"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toClipPathId = exports.RoundedCornerNodeView = void 0;
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
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const argument_utils_1 = require("../utils/argument-utils");
const rounded_corner_1 = require("./rounded-corner");
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JSX = { createElement: sprotty_1.svg };
let RoundedCornerNodeView = class RoundedCornerNodeView extends sprotty_1.RectangularNodeView {
    render(node, context) {
        const cornerRadius = argument_utils_1.CornerRadius.from(node);
        if (!cornerRadius) {
            return this.renderWithoutRadius(node, context);
        }
        const wrapper = new rounded_corner_1.RoundedCornerWrapper(node, cornerRadius);
        return (JSX.createElement("g", { "class-node": true },
            JSX.createElement("defs", null,
                JSX.createElement("clipPath", { id: toClipPathId(node) },
                    JSX.createElement("path", { d: this.renderPath(wrapper, context, this.getClipPathInsets() || 0) }))),
            this.renderPathNode(wrapper, context),
            context.renderChildren(node)));
    }
    renderWithoutRadius(node, context) {
        return super.render(node, context);
    }
    getClipPathInsets() {
        return 2;
    }
    renderPathNode(wrapper, context) {
        return (JSX.createElement("path", Object.assign({ d: this.renderPath(wrapper, context, 0), "class-sprotty-node": wrapper.element instanceof sprotty_1.SNode, "class-sprotty-port": wrapper.element instanceof sprotty_1.SPort, "class-mouseover": wrapper.element.hoverFeedback, "class-selected": wrapper.element.selected }, this.additionalClasses(wrapper.element, context))));
    }
    additionalClasses(_node, _context) {
        return {};
    }
    renderPath(wrapper, _context, inset) {
        // Calcualte length of straight line segments
        const topLineLength = Math.max(0, wrapper.size.width - wrapper.cornerRadius.topLeft - wrapper.cornerRadius.topRight);
        const rightLineLength = Math.max(0, wrapper.size.height - wrapper.cornerRadius.topRight - wrapper.cornerRadius.bottomRight);
        const bottomLineLength = Math.max(0, wrapper.size.width - wrapper.cornerRadius.bottomLeft - wrapper.cornerRadius.bottomRight);
        const path = `M${0 + inset},${0 + wrapper.topLeftCorner.radiusY}` +
            `q${0},${-(wrapper.topLeftCorner.radiusY - inset)} ${wrapper.topLeftCorner.radiusX - inset},${-(wrapper.topLeftCorner.radiusY - inset)}` +
            `h${topLineLength}` +
            `q${wrapper.topRightCorner.radiusX - inset},0 ${wrapper.topRightCorner.radiusX - inset},${wrapper.topRightCorner.radiusY - inset}` +
            `v${rightLineLength}` +
            `q0,${wrapper.bottomRightCorner.radiusY - inset} ${-(wrapper.bottomRightCorner.radiusX - inset)},${wrapper.bottomRightCorner.radiusY - inset}` +
            `h${-bottomLineLength}` +
            `q${-(wrapper.bottomLeftCorner.radiusX - inset)},0 ${-(wrapper.bottomLeftCorner.radiusX - inset)},${-(wrapper.bottomLeftCorner.radiusY - inset)}` +
            'z ';
        return path;
    }
};
RoundedCornerNodeView = __decorate([
    inversify_1.injectable()
], RoundedCornerNodeView);
exports.RoundedCornerNodeView = RoundedCornerNodeView;
function toClipPathId(node) {
    return `${node.id}_clip_path`;
}
exports.toClipPathId = toClipPathId;
//# sourceMappingURL=rounded-corner-view.js.map