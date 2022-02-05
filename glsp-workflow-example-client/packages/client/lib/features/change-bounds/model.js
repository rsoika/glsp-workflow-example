"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeResizeHandles = exports.addResizeHandles = exports.SResizeHandle = exports.isBoundsAwareMoveable = exports.ResizeHandleLocation = exports.isResizable = exports.resizeFeature = void 0;
/********************************************************************************
 * Copyright (c) 2019-2021 EclipseSource and others.
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
const sprotty_1 = require("sprotty");
exports.resizeFeature = Symbol('resizeFeature');
function isResizable(element) {
    return sprotty_1.isBoundsAware(element) && sprotty_1.isSelectable(element) && element instanceof sprotty_1.SParentElement && element.hasFeature(exports.resizeFeature);
}
exports.isResizable = isResizable;
// eslint-disable-next-line no-shadow
var ResizeHandleLocation;
(function (ResizeHandleLocation) {
    ResizeHandleLocation["TopLeft"] = "top-left";
    ResizeHandleLocation["TopRight"] = "top-right";
    ResizeHandleLocation["BottomLeft"] = "bottom-left";
    ResizeHandleLocation["BottomRight"] = "bottom-right";
})(ResizeHandleLocation = exports.ResizeHandleLocation || (exports.ResizeHandleLocation = {}));
function isBoundsAwareMoveable(element) {
    return sprotty_1.isMoveable(element) && sprotty_1.isBoundsAware(element);
}
exports.isBoundsAwareMoveable = isBoundsAwareMoveable;
class SResizeHandle extends sprotty_1.SChildElement {
    constructor(location, type = SResizeHandle.TYPE, hoverFeedback = false) {
        super();
        this.location = location;
        this.type = type;
        this.hoverFeedback = hoverFeedback;
    }
    hasFeature(feature) {
        return feature === sprotty_1.hoverFeedbackFeature;
    }
    isNwSeResize() {
        return this.location === ResizeHandleLocation.TopLeft || this.location === ResizeHandleLocation.BottomRight;
    }
    isNeSwResize() {
        return this.location === ResizeHandleLocation.TopRight || this.location === ResizeHandleLocation.BottomLeft;
    }
}
exports.SResizeHandle = SResizeHandle;
SResizeHandle.TYPE = 'resize-handle';
function addResizeHandles(element) {
    removeResizeHandles(element);
    element.add(new SResizeHandle(ResizeHandleLocation.TopLeft));
    element.add(new SResizeHandle(ResizeHandleLocation.TopRight));
    element.add(new SResizeHandle(ResizeHandleLocation.BottomLeft));
    element.add(new SResizeHandle(ResizeHandleLocation.BottomRight));
}
exports.addResizeHandles = addResizeHandles;
function removeResizeHandles(element) {
    element.removeAll(child => child instanceof SResizeHandle);
}
exports.removeResizeHandles = removeResizeHandles;
//# sourceMappingURL=model.js.map