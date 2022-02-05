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
const edit_label_tool_1 = require("./edit-label-tool");
const edit_label_validator_1 = require("./edit-label-validator");
const glspEditLabelModule = new inversify_1.ContainerModule((bind, _unbind, isBound, _rebind) => {
    bind(sprotty_1.TYPES.IEditLabelValidator).to(edit_label_validator_1.ServerEditLabelValidator);
    bind(sprotty_1.TYPES.IEditLabelValidationDecorator).to(edit_label_validator_1.BalloonLabelValidationDecorator);
    bind(types_1.GLSP_TYPES.IDefaultTool).to(edit_label_tool_1.DirectLabelEditTool);
    sprotty_1.configureCommand({ bind, isBound }, sprotty_1.ApplyLabelEditCommand);
});
exports.default = glspEditLabelModule;
//# sourceMappingURL=di.config.js.map