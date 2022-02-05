"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectionServiceAwareContextMenuMouseListener = void 0;
/********************************************************************************
 * Copyright (c) 2019-2022 EclipseSource and others.
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
const focus_change_action_1 = require("../../base/actions/focus-change-action");
const types_1 = require("../../base/types");
const selection_service_1 = require("../select/selection-service");
let SelectionServiceAwareContextMenuMouseListener = class SelectionServiceAwareContextMenuMouseListener extends sprotty_1.MouseListener {
    /**
     * Opens the context menu on right-click.
     */
    mouseDown(target, event) {
        if (event.button === 2 && this.contextMenuService && this.menuProvider) {
            return this.openContextMenu(event, target);
        }
        return [];
    }
    /**
     * Opens the context menu.
     *
     *   - query the element on the click-target
     *   - select the element
     *   - query the context menu service and the context menu elements
     *   - show the context menu
     *   - send a focus state change to indicate that the diagram becomes inactive, once the context menu is shown
     *
     * When the context menu is closed, we focus the diagram element again.
     */
    openContextMenu(event, target) {
        const mousePosition = { x: event.x, y: event.y };
        const selectableTarget = sprotty_1.findParentByFeature(target, sprotty_1.isSelectable);
        if (selectableTarget) {
            selectableTarget.selected = true;
            this.selectionService.updateSelection(target.root, [selectableTarget.id], []);
        }
        const result = Promise.all([this.contextMenuService(), this.menuProvider.getItems(target.root, mousePosition)])
            .then(([menuService, menuItems]) => menuService.show(menuItems, mousePosition, () => this.focusEventTarget(event)))
            .then(() => new focus_change_action_1.FocusStateChangedAction(false));
        return [result];
    }
    focusEventTarget(event) {
        const targetElement = event.target instanceof SVGElement ? event.target : undefined;
        const svgParentElement = targetElement === null || targetElement === void 0 ? void 0 : targetElement.closest('svg');
        if (svgParentElement) {
            svgParentElement.focus();
        }
    }
};
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IContextMenuServiceProvider),
    inversify_1.optional(),
    __metadata("design:type", Function)
], SelectionServiceAwareContextMenuMouseListener.prototype, "contextMenuService", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IContextMenuProviderRegistry),
    inversify_1.optional(),
    __metadata("design:type", sprotty_1.ContextMenuProviderRegistry)
], SelectionServiceAwareContextMenuMouseListener.prototype, "menuProvider", void 0);
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.SelectionService),
    __metadata("design:type", selection_service_1.SelectionService)
], SelectionServiceAwareContextMenuMouseListener.prototype, "selectionService", void 0);
SelectionServiceAwareContextMenuMouseListener = __decorate([
    inversify_1.injectable()
], SelectionServiceAwareContextMenuMouseListener);
exports.SelectionServiceAwareContextMenuMouseListener = SelectionServiceAwareContextMenuMouseListener;
//# sourceMappingURL=selection-service-aware-context-menu-mouse-listener.js.map