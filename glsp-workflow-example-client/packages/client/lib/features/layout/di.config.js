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
const freeform_layout_1 = require("./freeform-layout");
const layout_commands_1 = require("./layout-commands");
const vbox_layout_1 = require("./vbox-layout");
const layoutCommandsModule = new inversify_1.ContainerModule((bind, _unbind, isBound, rebind) => {
    sprotty_1.configureCommand({ bind, isBound }, layout_commands_1.ResizeElementsCommand);
    sprotty_1.configureCommand({ bind, isBound }, layout_commands_1.AlignElementsCommand);
    rebind(sprotty_1.VBoxLayouter).to(vbox_layout_1.VBoxLayouterExt);
    sprotty_1.configureLayout({ bind, isBound }, freeform_layout_1.FreeFormLayouter.KIND, freeform_layout_1.FreeFormLayouter);
});
exports.default = layoutCommandsModule;
//# sourceMappingURL=di.config.js.map