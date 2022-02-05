"use strict";
/********************************************************************************
 * Copyright (c) 2021 EclipseSource and others.
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClientContainer = exports.DEFAULT_MODULES = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const di_config_1 = require("../features/command-palette/di.config");
const di_config_2 = require("../features/context-menu/di.config");
const di_config_3 = require("../features/copy-paste/di.config");
const di_config_4 = require("../features/decoration/di.config");
const di_config_5 = require("../features/edit-label/di.config");
const di_config_6 = require("../features/hints/di.config");
const di_config_7 = require("../features/hover/di.config");
const di_config_8 = require("../features/layout/di.config");
const di_config_9 = require("../features/model-source-watcher/di.config");
const di_config_10 = require("../features/mouse-tool/di.config");
const di_config_11 = require("../features/navigation/di.config");
const di_config_12 = require("../features/select/di.config");
const di_config_13 = require("../features/tool-feedback/di.config");
const di_config_14 = require("../features/tool-palette/di.config");
const di_config_15 = require("../features/tools/di.config");
const di_config_16 = require("../features/validation/di.config");
const di_config_17 = require("../features/viewport/di.config");
const di_config_18 = require("./di.config");
exports.DEFAULT_MODULES = [
    sprotty_1.defaultModule,
    di_config_18.default,
    sprotty_1.boundsModule,
    sprotty_1.buttonModule,
    sprotty_1.edgeIntersectionModule,
    sprotty_1.edgeLayoutModule,
    sprotty_1.expandModule,
    sprotty_1.exportModule,
    sprotty_1.fadeModule,
    di_config_1.default,
    di_config_2.default,
    di_config_4.default,
    di_config_5.default,
    di_config_7.default,
    di_config_10.default,
    di_config_12.default,
    di_config_3.glspServerCopyPasteModule,
    di_config_17.default,
    sprotty_1.labelEditUiModule,
    di_config_8.default,
    di_config_16.markerNavigatorModule,
    di_config_6.default,
    sprotty_1.modelSourceModule,
    di_config_9.default,
    di_config_11.navigationModule,
    sprotty_1.openModule,
    di_config_14.default,
    sprotty_1.routingModule,
    di_config_13.default,
    di_config_15.default,
    di_config_16.validationModule,
    sprotty_1.zorderModule
];
/**
 * Creates a GLSP Client container with the GLSP default modules and the specified custom `modules`.
 *
 * You can still customize the default modules in two ways.
 *
 * First, you can unload default modules and load them again with your custom code.
 *
 * ```typescript
 * const container = createClientContainer(myModule1, myModule2);
 * container.unload(modelSourceWatcherModule);
 * container.load(myModelSourceWatcherModule);
 * ```
 *
 * Second, you can unbind or rebind implementations that are originally bound in one of the default modules.
 *
 * ```typescript
 * rebind(NavigationTargetResolver).to(MyNavigationTargetResolver);
 * ```
 * @param modules Custom modules to be loaded in addition to the default modules.
 * @returns The created container.
 */
function createClientContainer(...modules) {
    const container = new inversify_1.Container();
    container.load(...exports.DEFAULT_MODULES, ...modules);
    return container;
}
exports.createClientContainer = createClientContainer;
//# sourceMappingURL=container-modules.js.map