"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.markerNavigatorContextMenuModule = exports.markerNavigatorModule = exports.validationModule = void 0;
/********************************************************************************
 * Copyright (c) 2019 EclipseSource and others.
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
const marker_navigator_1 = require("./marker-navigator");
const validate_1 = require("./validate");
exports.validationModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    sprotty_1.configureCommand({ bind, isBound }, validate_1.SetMarkersCommand);
    sprotty_1.configureCommand({ bind, isBound }, validate_1.ApplyMarkersCommand);
    sprotty_1.configureCommand({ bind, isBound }, validate_1.DeleteMarkersCommand);
    bind(validate_1.ValidationFeedbackEmitter).toSelf().inSingletonScope();
});
exports.markerNavigatorModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(marker_navigator_1.SModelElementComparator).to(marker_navigator_1.LeftToRightTopToBottomComparator).inSingletonScope();
    bind(marker_navigator_1.MarkerNavigator).toSelf().inSingletonScope();
    sprotty_1.configureCommand({ bind, isBound }, marker_navigator_1.NavigateToMarkerCommand);
});
/**
 * This module is not required if the diagram is deployed in Theia but only intended to be used
 * in a standalone deployment of GLSP. If the GLSP diagram is in Theia use the Theia-native
 * `registerMarkerNavigationCommands()` in `glsp-theia-integration` instead.
 */
exports.markerNavigatorContextMenuModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(types_1.GLSP_TYPES.IContextMenuProvider).to(marker_navigator_1.MarkerNavigatorContextMenuItemProvider).inSingletonScope();
    bind(sprotty_1.TYPES.KeyListener).to(marker_navigator_1.MarkerNavigatorKeyListener).inSingletonScope();
});
//# sourceMappingURL=di.config.js.map