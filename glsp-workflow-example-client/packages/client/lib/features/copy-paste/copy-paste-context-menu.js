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
exports.isNative = exports.supportsPaste = exports.supportsCut = exports.supportsCopy = exports.CopyPasteContextMenuItemProvider = exports.InvokeCopyPasteActionHandler = exports.InvokeCutAction = exports.InvokePasteAction = exports.InvokeCopyAction = void 0;
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
const sprotty_1 = require("sprotty");
class InvokeCopyAction {
    constructor(kind = InvokeCopyAction.KIND) {
        this.kind = kind;
    }
}
exports.InvokeCopyAction = InvokeCopyAction;
InvokeCopyAction.KIND = 'invoke-copy';
class InvokePasteAction {
    constructor(kind = InvokePasteAction.KIND) {
        this.kind = kind;
    }
}
exports.InvokePasteAction = InvokePasteAction;
InvokePasteAction.KIND = 'invoke-paste';
class InvokeCutAction {
    constructor(kind = InvokeCutAction.KIND) {
        this.kind = kind;
    }
}
exports.InvokeCutAction = InvokeCutAction;
InvokeCutAction.KIND = 'invoke-cut';
let InvokeCopyPasteActionHandler = class InvokeCopyPasteActionHandler {
    handle(action) {
        switch (action.kind) {
            case InvokeCopyAction.KIND:
                if (supportsCopy()) {
                    document.execCommand('copy');
                }
                else {
                    this.notifyUserToUseShortcut('copy');
                }
                break;
            case InvokePasteAction.KIND:
                if (supportsPaste()) {
                    document.execCommand('paste');
                }
                else {
                    this.notifyUserToUseShortcut('paste');
                }
                break;
            case InvokeCutAction.KIND:
                if (supportsCut()) {
                    document.execCommand('cut');
                }
                else {
                    this.notifyUserToUseShortcut('cut');
                }
                break;
        }
    }
    notifyUserToUseShortcut(operation) {
        const message = `Please use the browser's ${operation} command or shortcut.`;
        const timeout = 10000;
        const severity = 'WARNING';
        this.dispatcher.dispatchAll([
            { kind: protocol_1.GLSPServerStatusAction.KIND, severity, timeout, message },
            { kind: protocol_1.ServerMessageAction.KIND, severity, timeout, message }
        ]);
    }
};
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcher),
    __metadata("design:type", Object)
], InvokeCopyPasteActionHandler.prototype, "dispatcher", void 0);
InvokeCopyPasteActionHandler = __decorate([
    inversify_1.injectable()
], InvokeCopyPasteActionHandler);
exports.InvokeCopyPasteActionHandler = InvokeCopyPasteActionHandler;
let CopyPasteContextMenuItemProvider = class CopyPasteContextMenuItemProvider {
    getItems(root, _lastMousePosition) {
        const hasSelectedElements = Array.from(root.index.all().filter(sprotty_1.isSelected)).length > 0;
        return Promise.resolve([
            this.createCopyMenuItem(hasSelectedElements),
            this.createCutMenuItem(hasSelectedElements),
            this.createPasteMenuItem()
        ]);
    }
    createPasteMenuItem() {
        return {
            id: 'paste',
            label: 'Paste',
            group: 'copy-paste',
            actions: [new InvokePasteAction()],
            isEnabled: () => true
        };
    }
    createCutMenuItem(hasSelectedElements) {
        return {
            id: 'cut',
            label: 'Cut',
            group: 'copy-paste',
            actions: [new InvokeCutAction()],
            isEnabled: () => hasSelectedElements
        };
    }
    createCopyMenuItem(hasSelectedElements) {
        return {
            id: 'copy',
            label: 'Copy',
            group: 'copy-paste',
            actions: [new InvokeCopyAction()],
            isEnabled: () => hasSelectedElements
        };
    }
};
CopyPasteContextMenuItemProvider = __decorate([
    inversify_1.injectable()
], CopyPasteContextMenuItemProvider);
exports.CopyPasteContextMenuItemProvider = CopyPasteContextMenuItemProvider;
function supportsCopy() {
    return isNative() || document.queryCommandSupported('copy');
}
exports.supportsCopy = supportsCopy;
function supportsCut() {
    return isNative() || document.queryCommandSupported('cut');
}
exports.supportsCut = supportsCut;
function supportsPaste() {
    const isChrome = userAgent().indexOf('Chrome') >= 0;
    return isNative() || (!isChrome && document.queryCommandSupported('paste'));
}
exports.supportsPaste = supportsPaste;
function isNative() {
    return typeof window.process !== 'undefined';
}
exports.isNative = isNative;
function userAgent() {
    return typeof navigator !== 'undefined' ? navigator.userAgent : '';
}
//# sourceMappingURL=copy-paste-context-menu.js.map