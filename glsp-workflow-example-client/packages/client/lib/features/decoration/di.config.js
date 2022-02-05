"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/********************************************************************************
 * Copyright (c) 2020 EclipseSource and others.
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
require("../../../css/decoration.css");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const decoration_placer_1 = require("./decoration-placer");
const glspDecorationModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(decoration_placer_1.GlspDecorationPlacer).toSelf().inSingletonScope();
    bind(sprotty_1.TYPES.IVNodePostprocessor).toService(decoration_placer_1.GlspDecorationPlacer);
});
exports.default = glspDecorationModule;
//# sourceMappingURL=di.config.js.map