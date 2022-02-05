"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VBoxLayouterExt = void 0;
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
/**
 * Extends VBoxLayouter to support additional layout options
 */
let VBoxLayouterExt = class VBoxLayouterExt extends sprotty_1.VBoxLayouter {
    layout(container, layouter) {
        const boundsData = layouter.getBoundsData(container);
        const options = this.getLayoutOptions(container);
        const childrenSize = this.getChildrenSize(container, options, layouter);
        const fixedSize = this.getFixedContainerBounds(container, options, layouter);
        const maxWidth = options.paddingFactor *
            (options.resizeContainer
                ? Math.max(fixedSize.width - options.paddingLeft - options.paddingRight, childrenSize.width)
                : Math.max(0, fixedSize.width - options.paddingLeft - options.paddingRight));
        const maxHeight = options.paddingFactor *
            (options.resizeContainer
                ? Math.max(fixedSize.height - options.paddingTop - options.paddingBottom, childrenSize.height)
                : Math.max(0, fixedSize.height - options.paddingTop - options.paddingBottom));
        // Remaining size that can be grabbed by children with the vGrab option
        const grabHeight = maxHeight - childrenSize.height;
        // Number of children that request vGrab
        // FIXME: This approach works fine when only 1 child uses VGrab, but may cause rounding issues
        // when the grabHeight can't be equally shared by all children.
        const grabbingChildren = container.children
            .map(child => this.getChildLayoutOptions(child, options))
            .filter(opt => opt.vGrab).length;
        if (maxWidth > 0 && maxHeight > 0) {
            const offset = this.layoutChildren(container, layouter, options, maxWidth, maxHeight, grabHeight, grabbingChildren);
            boundsData.bounds = this.getFinalContainerBounds(container, offset, options, childrenSize.width, childrenSize.height);
            boundsData.boundsChanged = true;
        }
    }
    getChildrenSize(container, containerOptions, layouter) {
        let maxWidth = -1;
        let maxHeight = 0;
        let isFirst = true;
        container.children.forEach(child => {
            if (sprotty_1.isLayoutableChild(child)) {
                const bounds = layouter.getBoundsData(child).bounds;
                if (bounds !== undefined && sprotty_1.isValidDimension(bounds)) {
                    maxHeight += bounds.height;
                    if (isFirst) {
                        isFirst = false;
                    }
                    else {
                        maxHeight += containerOptions.vGap;
                    }
                    maxWidth = Math.max(maxWidth, bounds.width);
                }
            }
        });
        const result = {
            width: maxWidth,
            height: maxHeight
        };
        return result;
    }
    layoutChildren(container, layouter, containerOptions, maxWidth, maxHeight, grabHeight, grabbingChildren) {
        let currentOffset = {
            x: containerOptions.paddingLeft + 0.5 * (maxWidth - maxWidth / containerOptions.paddingFactor),
            y: containerOptions.paddingTop + 0.5 * (maxHeight - maxHeight / containerOptions.paddingFactor)
        };
        container.children.forEach(child => {
            if (sprotty_1.isLayoutableChild(child)) {
                const boundsData = layouter.getBoundsData(child);
                const bounds = boundsData.bounds;
                const childOptions = this.getChildLayoutOptions(child, containerOptions);
                if (bounds !== undefined && sprotty_1.isValidDimension(bounds)) {
                    currentOffset = this.layoutChild(child, boundsData, bounds, childOptions, containerOptions, currentOffset, maxWidth, maxHeight, grabHeight, grabbingChildren);
                }
            }
        });
        return currentOffset;
    }
    layoutChild(child, boundsData, bounds, childOptions, containerOptions, currentOffset, maxWidth, maxHeight, grabHeight, grabbingChildren) {
        let offset = super.layoutChild(child, boundsData, bounds, childOptions, containerOptions, currentOffset, maxWidth, maxHeight);
        if (childOptions.hGrab) {
            boundsData.bounds = {
                x: boundsData.bounds.x,
                y: boundsData.bounds.y,
                width: maxWidth,
                height: boundsData.bounds.height
            };
            boundsData.boundsChanged = true;
        }
        if (childOptions.vGrab && grabHeight && grabbingChildren) {
            const height = boundsData.bounds.height + grabHeight / grabbingChildren;
            boundsData.bounds = {
                x: boundsData.bounds.x,
                y: boundsData.bounds.y,
                width: boundsData.bounds.width,
                height: height
            };
            boundsData.boundsChanged = true;
            offset = { x: currentOffset.x, y: currentOffset.y + height };
        }
        return offset;
    }
    getFixedContainerBounds(container, layoutOptions, layouter) {
        var _a, _b;
        const currentContainer = container;
        // eslint-disable-next-line no-constant-condition
        if (sprotty_1.isBoundsAware(currentContainer)) {
            const bounds = currentContainer.bounds;
            const elementOptions = this.getElementLayoutOptions(currentContainer);
            const width = (_a = elementOptions === null || elementOptions === void 0 ? void 0 : elementOptions.prefWidth) !== null && _a !== void 0 ? _a : 0;
            const height = (_b = elementOptions === null || elementOptions === void 0 ? void 0 : elementOptions.prefHeight) !== null && _b !== void 0 ? _b : 0;
            return Object.assign(Object.assign({}, bounds), { width, height });
        }
        return sprotty_1.EMPTY_BOUNDS;
    }
    getChildLayoutOptions(child, containerOptions) {
        return super.getChildLayoutOptions(child, containerOptions);
    }
    getLayoutOptions(element) {
        return super.getLayoutOptions(element);
    }
    getElementLayoutOptions(element) {
        return element.layoutOptions;
    }
    getFinalContainerBounds(container, lastOffset, options, maxWidth, maxHeight) {
        var _a, _b;
        const elementOptions = this.getElementLayoutOptions(container);
        const width = (_a = elementOptions === null || elementOptions === void 0 ? void 0 : elementOptions.prefWidth) !== null && _a !== void 0 ? _a : options.minWidth;
        const height = (_b = elementOptions === null || elementOptions === void 0 ? void 0 : elementOptions.prefHeight) !== null && _b !== void 0 ? _b : options.minHeight;
        const result = {
            x: container.bounds.x,
            y: container.bounds.y,
            width: Math.max(width, maxWidth + options.paddingLeft + options.paddingRight),
            height: Math.max(height, maxHeight + options.paddingTop + options.paddingBottom)
        };
        return result;
    }
    getDefaultLayoutOptions() {
        return {
            resizeContainer: true,
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5,
            paddingFactor: 1,
            vGap: 1,
            hAlign: 'center',
            minWidth: 0,
            minHeight: 0,
            hGrab: false,
            vGrab: false,
            // eslint-disable-next-line no-null/no-null
            prefHeight: null,
            // eslint-disable-next-line no-null/no-null
            prefWidth: null
        };
    }
    spread(a, b) {
        return Object.assign(Object.assign({}, a), b);
    }
};
VBoxLayouterExt.KIND = sprotty_1.VBoxLayouter.KIND;
VBoxLayouterExt = __decorate([
    inversify_1.injectable()
], VBoxLayouterExt);
exports.VBoxLayouterExt = VBoxLayouterExt;
//# sourceMappingURL=vbox-layout.js.map