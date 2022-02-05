"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.navigationModule = void 0;
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
const navigation_action_handler_1 = require("./navigation-action-handler");
const navigation_target_resolver_1 = require("./navigation-target-resolver");
exports.navigationModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(navigation_target_resolver_1.NavigationTargetResolver).toSelf().inSingletonScope();
    bind(navigation_action_handler_1.NavigationActionHandler).toSelf().inSingletonScope();
    sprotty_1.configureActionHandler({ bind, isBound }, navigation_action_handler_1.NavigateAction.KIND, navigation_action_handler_1.NavigationActionHandler);
    sprotty_1.configureActionHandler({ bind, isBound }, protocol_1.NavigateToTargetAction.KIND, navigation_action_handler_1.NavigationActionHandler);
    sprotty_1.configureActionHandler({ bind, isBound }, navigation_action_handler_1.ProcessNavigationArgumentsAction.KIND, navigation_action_handler_1.NavigationActionHandler);
    sprotty_1.configureActionHandler({ bind, isBound }, protocol_1.NavigateToExternalTargetAction.KIND, navigation_action_handler_1.NavigationActionHandler);
});
//# sourceMappingURL=di.config.js.map