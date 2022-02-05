"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FreeFormLayouter = void 0;
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
const abstract_layout_1 = require("sprotty/lib/features/bounds/abstract-layout");
/**
 * Layouts children of a container with explit X/Y positions
 */
let FreeFormLayouter = class FreeFormLayouter extends abstract_layout_1.AbstractLayout {
    layout(container, layouter) {
        const boundsData = layouter.getBoundsData(container);
        const options = this.getLayoutOptions(container);
        const childrenSize = this.getChildrenSize(container, options, layouter);
        // The real size of the compartment will be determined by the parent node layout;
        // we only need to compute the bounds required to layout the children.
        const maxWidth = childrenSize.width > 0 ? childrenSize.width + options.paddingLeft + options.paddingRight : 0;
        const maxHeight = childrenSize.height > 0 ? childrenSize.height + options.paddingTop + options.paddingBottom : 0;
        if (maxWidth > 0 && maxHeight > 0) {
            const offset = this.layoutChildren(container, layouter, options, maxWidth, maxHeight);
            boundsData.bounds = this.getFinalContainerBounds(container, offset, options, maxWidth, maxHeight);
            boundsData.boundsChanged = true;
        }
        else {
            boundsData.bounds = { x: boundsData.bounds.x, y: boundsData.bounds.y, width: 0, height: 0 };
            boundsData.boundsChanged = true;
        }
    }
    getChildrenSize(container, containerOptions, layouter) {
        let maxX = 0;
        let maxY = 0;
        container.children.forEach(child => {
            const bounds = layouter.getBoundsData(child).bounds;
            if (bounds !== undefined && sprotty_1.isValidDimension(bounds)) {
                const childMaxX = bounds.x + bounds.width;
                const childMaxY = bounds.y + bounds.height;
                maxX = Math.max(maxX, childMaxX);
                maxY = Math.max(maxY, childMaxY);
            }
        });
        return {
            width: maxX,
            height: maxY
        };
    }
    layoutChild(child, boundsData, bounds, childOptions, containerOptions, currentOffset, maxWidth, maxHeight) {
        boundsData.bounds = {
            x: child.bounds.x,
            y: child.bounds.y,
            width: bounds.width,
            height: bounds.height
        };
        boundsData.boundsChanged = true;
        return currentOffset;
    }
    getFinalContainerBounds(container, lastOffset, options, maxWidth, maxHeight) {
        const result = {
            x: container.bounds.x,
            y: container.bounds.y,
            width: Math.max(options.minWidth, maxWidth + options.paddingLeft + options.paddingRight),
            height: Math.max(options.minHeight, maxHeight + options.paddingTop + options.paddingBottom)
        };
        return result;
    }
    getDefaultLayoutOptions() {
        return {
            resizeContainer: true,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 0,
            paddingRight: 0,
            paddingFactor: 1,
            minWidth: 0,
            minHeight: 0
        };
    }
    spread(a, b) {
        return Object.assign(Object.assign({}, a), b);
    }
};
FreeFormLayouter.KIND = 'freeform';
FreeFormLayouter = __decorate([
    inversify_1.injectable()
], FreeFormLayouter);
exports.FreeFormLayouter = FreeFormLayouter;
//# sourceMappingURL=freeform-layout.js.map