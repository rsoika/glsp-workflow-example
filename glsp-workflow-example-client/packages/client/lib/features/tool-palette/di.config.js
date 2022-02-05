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
require("../../../css/tool-palette.css");
const tool_palette_1 = require("./tool-palette");
const toolPaletteModule = new inversify_1.ContainerModule((bind, _unbind, isBound, rebind) => {
    bind(tool_palette_1.ToolPalette).toSelf().inSingletonScope();
    bind(sprotty_1.TYPES.IUIExtension).toService(tool_palette_1.ToolPalette);
    sprotty_1.configureActionHandler({ bind, isBound }, tool_palette_1.EnableToolPaletteAction.KIND, tool_palette_1.ToolPalette);
    sprotty_1.configureActionHandler({ bind, isBound }, sprotty_1.EnableDefaultToolsAction.KIND, tool_palette_1.ToolPalette);
});
exports.default = toolPaletteModule;
//# sourceMappingURL=di.config.js.map