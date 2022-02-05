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
require("../../../css/command-palette.css");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const types_1 = require("../../base/types");
const command_palette_tool_1 = require("./command-palette-tool");
const server_command_palette_provider_1 = require("./server-command-palette-provider");
const glspCommandPaletteModule = new inversify_1.ContainerModule(bind => {
    bind(sprotty_1.CommandPalette).toSelf().inSingletonScope();
    bind(sprotty_1.TYPES.IUIExtension).toService(sprotty_1.CommandPalette);
    bind(sprotty_1.CommandPaletteActionProviderRegistry).toSelf().inSingletonScope();
    bind(sprotty_1.TYPES.ICommandPaletteActionProviderRegistry).toService(sprotty_1.CommandPaletteActionProviderRegistry);
    bind(sprotty_1.TYPES.ICommandPaletteActionProvider).to(server_command_palette_provider_1.ServerCommandPaletteActionProvider);
    bind(types_1.GLSP_TYPES.IDefaultTool).to(command_palette_tool_1.CommandPaletteTool);
});
exports.default = glspCommandPaletteModule;
//# sourceMappingURL=di.config.js.map