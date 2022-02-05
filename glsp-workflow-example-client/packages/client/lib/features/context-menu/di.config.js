"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const selection_service_aware_context_menu_mouse_listener_1 = require("./selection-service-aware-context-menu-mouse-listener");
const server_context_menu_provider_1 = require("./server-context-menu-provider");
const glspContextMenuModule = new inversify_1.ContainerModule(bind => {
    bind(sprotty_1.TYPES.IContextMenuServiceProvider).toProvider(ctx => () => new Promise((resolve, reject) => {
        if (ctx.container.isBound(sprotty_1.TYPES.IContextMenuService)) {
            resolve(ctx.container.get(sprotty_1.TYPES.IContextMenuService));
        }
        else {
            reject();
        }
    }));
    bind(sprotty_1.TYPES.MouseListener).to(selection_service_aware_context_menu_mouse_listener_1.SelectionServiceAwareContextMenuMouseListener);
    bind(sprotty_1.TYPES.IContextMenuProviderRegistry).to(sprotty_1.ContextMenuProviderRegistry);
    bind(sprotty_1.TYPES.IContextMenuItemProvider).to(server_context_menu_provider_1.ServerContextMenuItemProvider);
});
exports.default = glspContextMenuModule;
//# sourceMappingURL=di.config.js.map