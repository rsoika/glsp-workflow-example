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
exports.deleteCssClasses = exports.applyCssClasses = exports.cursorFeedbackAction = exports.CursorCSS = exports.ModifyCssFeedbackCommand = exports.ModifyCSSFeedbackAction = void 0;
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
const protocol_1 = require("@eclipse-glsp/protocol");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const smodel_util_1 = require("../../utils/smodel-util");
const model_1 = require("./model");
class ModifyCSSFeedbackAction {
    constructor(input, addClasses, removeClasses, kind = ModifyCssFeedbackCommand.KIND) {
        this.input = input;
        this.addClasses = addClasses;
        this.removeClasses = removeClasses;
        this.kind = kind;
        if (input) {
            this.elementIds = protocol_1.isStringArray(input) ? input : input.map(element => element.id);
        }
    }
}
exports.ModifyCSSFeedbackAction = ModifyCSSFeedbackAction;
let ModifyCssFeedbackCommand = class ModifyCssFeedbackCommand extends model_1.FeedbackCommand {
    constructor(action) {
        super();
        this.action = action;
    }
    execute(context) {
        const elements = [];
        if (this.action.elementIds) {
            elements.push(...this.action.elementIds.map(elementId => context.root.index.getById(elementId)).filter(exists));
        }
        else {
            elements.push(context.root);
        }
        elements.forEach(e => {
            if (this.action.removeClasses) {
                smodel_util_1.removeCssClasses(e, this.action.removeClasses);
            }
            if (this.action.addClasses) {
                smodel_util_1.addCssClasses(e, this.action.addClasses);
            }
        });
        return context.root;
    }
};
ModifyCssFeedbackCommand.KIND = 'modifyCSSFeedback';
ModifyCssFeedbackCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [ModifyCSSFeedbackAction])
], ModifyCssFeedbackCommand);
exports.ModifyCssFeedbackCommand = ModifyCssFeedbackCommand;
function exists(elt) {
    return elt !== undefined;
}
// eslint-disable-next-line no-shadow
var CursorCSS;
(function (CursorCSS) {
    CursorCSS["DEFAULT"] = "default-mode";
    CursorCSS["OVERLAP_FORBIDDEN"] = "overlap-forbidden-mode";
    CursorCSS["NODE_CREATION"] = "node-creation-mode";
    CursorCSS["EDGE_CREATION_SOURCE"] = "edge-creation-select-source-mode";
    CursorCSS["EDGE_CREATION_TARGET"] = "edge-creation-select-target-mode";
    CursorCSS["EDGE_RECONNECT"] = "edge-reconnect-select-target-mode";
    CursorCSS["OPERATION_NOT_ALLOWED"] = "edge-modification-not-allowed-mode";
    CursorCSS["ELEMENT_DELETION"] = "element-deletion-mode";
    CursorCSS["RESIZE_NESW"] = "resize-nesw-mode";
    CursorCSS["RESIZE_NWSE"] = "resize-nwse-mode";
    CursorCSS["MOVE"] = "move-mode";
    CursorCSS["MARQUEE"] = "marquee-mode";
})(CursorCSS = exports.CursorCSS || (exports.CursorCSS = {}));
function cursorFeedbackAction(cursorCss) {
    const addCss = [];
    if (cursorCss) {
        addCss.push(cursorCss);
    }
    return new ModifyCSSFeedbackAction(undefined, addCss, Object.values(CursorCSS));
}
exports.cursorFeedbackAction = cursorFeedbackAction;
function applyCssClasses(element, ...classes) {
    return new ModifyCSSFeedbackAction([element], classes, []);
}
exports.applyCssClasses = applyCssClasses;
function deleteCssClasses(element, ...classes) {
    return new ModifyCSSFeedbackAction([element], [], classes);
}
exports.deleteCssClasses = deleteCssClasses;
//# sourceMappingURL=css-feedback.js.map