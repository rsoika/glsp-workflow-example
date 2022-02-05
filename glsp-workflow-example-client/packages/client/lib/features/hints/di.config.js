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
const protocol_1 = require("@eclipse-glsp/protocol");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const types_1 = require("../../base/types");
const type_hints_1 = require("./type-hints");
const modelHintsModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(type_hints_1.TypeHintProvider).toSelf().inSingletonScope();
    bind(types_1.GLSP_TYPES.ITypeHintProvider).toService(type_hints_1.TypeHintProvider);
    sprotty_1.configureActionHandler({ bind, isBound }, protocol_1.SetTypeHintsAction.KIND, type_hints_1.TypeHintProvider);
    sprotty_1.configureCommand({ bind, isBound }, type_hints_1.ApplyTypeHintsCommand);
});
exports.default = modelHintsModule;
//# sourceMappingURL=di.config.js.map