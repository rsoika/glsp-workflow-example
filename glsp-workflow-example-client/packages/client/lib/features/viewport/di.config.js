"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const glsp_scroll_mouse_listener_1 = require("./glsp-scroll-mouse-listener");
const glspViewportModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    sprotty_1.configureCommand({ bind, isBound }, sprotty_1.CenterCommand);
    sprotty_1.configureCommand({ bind, isBound }, sprotty_1.FitToScreenCommand);
    sprotty_1.configureCommand({ bind, isBound }, sprotty_1.GetViewportCommand);
    sprotty_1.configureCommand({ bind, isBound }, sprotty_1.SetViewportCommand);
    bind(sprotty_1.TYPES.KeyListener).to(sprotty_1.CenterKeyboardListener);
    bind(sprotty_1.TYPES.MouseListener).to(sprotty_1.ZoomMouseListener);
    bind(glsp_scroll_mouse_listener_1.GLSPScrollMouseListener).toSelf().inSingletonScope();
    bind(sprotty_1.TYPES.MouseListener).toService(glsp_scroll_mouse_listener_1.GLSPScrollMouseListener);
    sprotty_1.configureActionHandler({ bind, isBound }, sprotty_1.EnableToolsAction.KIND, glsp_scroll_mouse_listener_1.GLSPScrollMouseListener);
    sprotty_1.configureActionHandler({ bind, isBound }, sprotty_1.EnableDefaultToolsAction.KIND, glsp_scroll_mouse_listener_1.GLSPScrollMouseListener);
});
exports.default = glspViewportModule;
//# sourceMappingURL=di.config.js.map