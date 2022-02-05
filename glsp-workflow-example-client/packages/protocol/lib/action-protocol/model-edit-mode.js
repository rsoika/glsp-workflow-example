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
var SetEditModeAction_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditMode = exports.isSetEditModeAction = exports.SetEditModeAction = void 0;
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
const inversify_1 = require("inversify");
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
let SetEditModeAction = SetEditModeAction_1 = class SetEditModeAction {
    constructor(editMode = EditMode.EDITABLE, kind = SetEditModeAction_1.KIND) {
        this.editMode = editMode;
        this.kind = kind;
    }
};
SetEditModeAction.KIND = 'setEditMode';
SetEditModeAction = SetEditModeAction_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [String, String])
], SetEditModeAction);
exports.SetEditModeAction = SetEditModeAction;
function isSetEditModeAction(action) {
    return base_protocol_1.isActionKind(action, SetEditModeAction.KIND) && typeguard_util_1.isString(action, 'editMode');
}
exports.isSetEditModeAction = isSetEditModeAction;
var EditMode;
(function (EditMode) {
    EditMode.READONLY = 'readonly';
    EditMode.EDITABLE = 'editable';
})(EditMode = exports.EditMode || (exports.EditMode = {}));
//# sourceMappingURL=model-edit-mode.js.map