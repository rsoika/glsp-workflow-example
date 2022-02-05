"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarqueeView = void 0;
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
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const JSX = { createElement: sprotty_1.svg };
let MarqueeView = class MarqueeView extends sprotty_1.RectangularNodeView {
    render(node, context) {
        const graph = (JSX.createElement("g", null,
            JSX.createElement("rect", { "class-sprotty-node": true, "class-marquee": true, x: node.startPoint.x - node.endPoint.x <= 0 ? node.startPoint.x : node.endPoint.x, y: node.startPoint.y - node.endPoint.y <= 0 ? node.startPoint.y : node.endPoint.y, rx: 0, ry: 0, width: Math.abs(node.startPoint.x - node.endPoint.x), height: Math.abs(node.startPoint.y - node.endPoint.y) })));
        return graph;
    }
};
MarqueeView = __decorate([
    inversify_1.injectable()
], MarqueeView);
exports.MarqueeView = MarqueeView;
//# sourceMappingURL=view.js.map