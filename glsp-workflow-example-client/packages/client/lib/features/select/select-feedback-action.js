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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SelectAllFeedbackCommand = exports.SelectFeedbackCommand = exports.SelectAllFeedbackAction = exports.SelectFeedbackAction = void 0;
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
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
class SelectFeedbackAction {
    constructor(selectedElementsIDs = [], deselectedElementsIDs = [], kind = SelectFeedbackCommand.KIND) {
        this.selectedElementsIDs = selectedElementsIDs;
        this.deselectedElementsIDs = deselectedElementsIDs;
        this.kind = kind;
    }
}
exports.SelectFeedbackAction = SelectFeedbackAction;
class SelectAllFeedbackAction {
    /**
     * If `select` is true, all elements are selected, othewise they are deselected.
     */
    constructor(select = true, kind = SelectFeedbackCommand.KIND) {
        this.select = select;
        this.kind = kind;
    }
}
exports.SelectAllFeedbackAction = SelectAllFeedbackAction;
let SelectFeedbackCommand = class SelectFeedbackCommand extends sprotty_1.Command {
    constructor(action) {
        super();
        this.action = action;
        this.sprottySelectCommand = new sprotty_1.SelectCommand(action);
    }
    execute(context) {
        return this.sprottySelectCommand.execute(context);
    }
    undo(context) {
        return this.sprottySelectCommand.undo(context);
    }
    redo(context) {
        return this.sprottySelectCommand.redo(context);
    }
};
SelectFeedbackCommand.KIND = 'elementSelectedFeedback';
SelectFeedbackCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [SelectFeedbackAction])
], SelectFeedbackCommand);
exports.SelectFeedbackCommand = SelectFeedbackCommand;
let SelectAllFeedbackCommand = class SelectAllFeedbackCommand extends sprotty_1.Command {
    constructor(action) {
        super();
        this.action = action;
        this.sprottySelectAllCommand = new sprotty_1.SelectAllCommand(action);
    }
    execute(context) {
        return this.sprottySelectAllCommand.execute(context);
    }
    undo(context) {
        return this.sprottySelectAllCommand.undo(context);
    }
    redo(context) {
        return this.sprottySelectAllCommand.redo(context);
    }
};
SelectAllFeedbackCommand.KIND = 'allSelectedFeedback';
SelectAllFeedbackCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [SelectAllFeedbackAction])
], SelectAllFeedbackCommand);
exports.SelectAllFeedbackCommand = SelectAllFeedbackCommand;
//# sourceMappingURL=select-feedback-action.js.map