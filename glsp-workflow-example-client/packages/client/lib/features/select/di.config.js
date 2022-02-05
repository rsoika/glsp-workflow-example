"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const select_feedback_action_1 = require("./select-feedback-action");
const select_mouse_listener_1 = require("./select-mouse-listener");
const selection_service_1 = require("./selection-service");
const glspSelectModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(selection_service_1.SelectionService).toSelf().inSingletonScope();
    bind(types_1.GLSP_TYPES.SelectionService).toService(selection_service_1.SelectionService);
    sprotty_1.configureCommand({ bind, isBound }, selection_service_1.SelectCommand);
    sprotty_1.configureCommand({ bind, isBound }, selection_service_1.SelectAllCommand);
    sprotty_1.configureCommand({ bind, isBound }, select_feedback_action_1.SelectFeedbackCommand);
    sprotty_1.configureCommand({ bind, isBound }, select_feedback_action_1.SelectAllFeedbackCommand);
    bind(sprotty_1.TYPES.MouseListener).to(select_mouse_listener_1.RankedSelectMouseListener);
    bind(types_1.GLSP_TYPES.SModelRootListener).toService(selection_service_1.SelectionService);
});
exports.default = glspSelectModule;
//# sourceMappingURL=di.config.js.map