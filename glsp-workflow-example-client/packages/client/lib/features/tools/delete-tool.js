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
var DelKeyDeleteTool_1, MouseDeleteTool_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteToolMouseListener = exports.MouseDeleteTool = exports.DeleteKeyListener = exports.DelKeyDeleteTool = void 0;
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
const keyboard_1 = require("sprotty/lib/utils/keyboard");
const types_1 = require("../../base/types");
const css_feedback_1 = require("../tool-feedback/css-feedback");
/**
 * Deletes selected elements when hitting the `Del` key.
 */
let DelKeyDeleteTool = DelKeyDeleteTool_1 = class DelKeyDeleteTool {
    constructor() {
        this.isEditTool = true;
        this.deleteKeyListener = new DeleteKeyListener();
    }
    get id() {
        return DelKeyDeleteTool_1.ID;
    }
    enable() {
        this.keytool.register(this.deleteKeyListener);
    }
    disable() {
        this.keytool.deregister(this.deleteKeyListener);
    }
};
DelKeyDeleteTool.ID = 'glsp.delete-keyboard';
__decorate([
    inversify_1.inject(sprotty_1.KeyTool),
    __metadata("design:type", sprotty_1.KeyTool)
], DelKeyDeleteTool.prototype, "keytool", void 0);
DelKeyDeleteTool = DelKeyDeleteTool_1 = __decorate([
    inversify_1.injectable()
], DelKeyDeleteTool);
exports.DelKeyDeleteTool = DelKeyDeleteTool;
let DeleteKeyListener = class DeleteKeyListener extends sprotty_1.KeyListener {
    keyDown(element, event) {
        if (keyboard_1.matchesKeystroke(event, 'Delete')) {
            const deleteElementIds = Array.from(element.root.index
                .all()
                .filter(e => sprotty_1.isDeletable(e) && sprotty_1.isSelectable(e) && e.selected)
                .filter(e => e.id !== e.root.id)
                .map(e => e.id));
            if (deleteElementIds.length > 0) {
                return [new protocol_1.DeleteElementOperation(deleteElementIds)];
            }
        }
        return [];
    }
};
DeleteKeyListener = __decorate([
    inversify_1.injectable()
], DeleteKeyListener);
exports.DeleteKeyListener = DeleteKeyListener;
/**
 * Deletes selected elements when clicking on them.
 */
let MouseDeleteTool = MouseDeleteTool_1 = class MouseDeleteTool {
    constructor() {
        this.isEditTool = true;
        this.deleteToolMouseListener = new DeleteToolMouseListener();
    }
    get id() {
        return MouseDeleteTool_1.ID;
    }
    enable() {
        this.mouseTool.register(this.deleteToolMouseListener);
        this.feedbackDispatcher.registerFeedback(this, [css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.ELEMENT_DELETION)]);
    }
    disable() {
        this.mouseTool.deregister(this.deleteToolMouseListener);
        this.feedbackDispatcher.registerFeedback(this, [css_feedback_1.cursorFeedbackAction()]);
    }
};
MouseDeleteTool.ID = 'glsp.delete-mouse';
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.MouseTool),
    __metadata("design:type", Object)
], MouseDeleteTool.prototype, "mouseTool", void 0);
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher),
    __metadata("design:type", Object)
], MouseDeleteTool.prototype, "feedbackDispatcher", void 0);
MouseDeleteTool = MouseDeleteTool_1 = __decorate([
    inversify_1.injectable()
], MouseDeleteTool);
exports.MouseDeleteTool = MouseDeleteTool;
let DeleteToolMouseListener = class DeleteToolMouseListener extends sprotty_1.MouseListener {
    mouseUp(target, event) {
        const deletableParent = sprotty_1.findParentByFeature(target, sprotty_1.isDeletable);
        if (deletableParent === undefined) {
            return [];
        }
        const result = [];
        result.push(new protocol_1.DeleteElementOperation([deletableParent.id]));
        if (!sprotty_1.isCtrlOrCmd(event)) {
            result.push(new sprotty_1.EnableDefaultToolsAction());
        }
        return result;
    }
};
DeleteToolMouseListener = __decorate([
    inversify_1.injectable()
], DeleteToolMouseListener);
exports.DeleteToolMouseListener = DeleteToolMouseListener;
//# sourceMappingURL=delete-tool.js.map