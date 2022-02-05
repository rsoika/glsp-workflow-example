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
exports.DeleteElementContextMenuItemProvider = void 0;
/********************************************************************************
 * Copyright (c) 2020-2021 EclipseSource and others.
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
const protocol_1 = require("@eclipse-glsp/protocol");
const inversify_1 = require("inversify");
const types_1 = require("../../base/types");
let DeleteElementContextMenuItemProvider = class DeleteElementContextMenuItemProvider {
    async getItems(_root, _lastMousePosition) {
        const editorContextService = await this.editorContextServiceProvider();
        return [this.createDeleteMenuItem(editorContextService)];
    }
    createDeleteMenuItem(editorContextService) {
        return {
            id: 'delete',
            label: 'Delete',
            sortString: 'd',
            group: 'edit',
            actions: [new protocol_1.DeleteElementOperation(editorContextService.selectedElements.map(e => e.id))],
            isEnabled: () => !editorContextService.isReadonly && editorContextService.selectedElements.length > 0
        };
    }
};
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IEditorContextServiceProvider),
    __metadata("design:type", Function)
], DeleteElementContextMenuItemProvider.prototype, "editorContextServiceProvider", void 0);
DeleteElementContextMenuItemProvider = __decorate([
    inversify_1.injectable()
], DeleteElementContextMenuItemProvider);
exports.DeleteElementContextMenuItemProvider = DeleteElementContextMenuItemProvider;
//# sourceMappingURL=delete-element-context-menu.js.map