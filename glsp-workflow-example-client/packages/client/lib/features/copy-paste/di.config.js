"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.copyPasteContextMenuModule = exports.glspServerCopyPasteModule = void 0;
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
const types_1 = require("../../base/types");
const copy_paste_context_menu_1 = require("./copy-paste-context-menu");
const copy_paste_handler_1 = require("./copy-paste-handler");
exports.glspServerCopyPasteModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(types_1.GLSP_TYPES.ICopyPasteHandler).to(copy_paste_handler_1.ServerCopyPasteHandler);
    bind(types_1.GLSP_TYPES.IAsyncClipboardService).to(copy_paste_handler_1.LocalClipboardService).inSingletonScope();
});
/**
 * This module is not required if the diagram is deployed in Theia but only intended to be used
 * in a standalone deployment of GLSP. If the GLSP diagram in Theia use the Theia-native
 * `CopyPasteMenuContribution` in `glsp-theia-integration` instead.
 */
exports.copyPasteContextMenuModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(types_1.GLSP_TYPES.IContextMenuProvider).to(copy_paste_context_menu_1.CopyPasteContextMenuItemProvider).inSingletonScope();
    bind(copy_paste_context_menu_1.InvokeCopyPasteActionHandler).toSelf().inSingletonScope();
    sprotty_1.configureActionHandler({ bind, isBound }, copy_paste_context_menu_1.InvokeCopyAction.KIND, copy_paste_context_menu_1.InvokeCopyPasteActionHandler);
    sprotty_1.configureActionHandler({ bind, isBound }, copy_paste_context_menu_1.InvokeCutAction.KIND, copy_paste_context_menu_1.InvokeCopyPasteActionHandler);
    sprotty_1.configureActionHandler({ bind, isBound }, copy_paste_context_menu_1.InvokePasteAction.KIND, copy_paste_context_menu_1.InvokeCopyPasteActionHandler);
});
//# sourceMappingURL=di.config.js.map