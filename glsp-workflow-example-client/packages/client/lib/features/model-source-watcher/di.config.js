"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const model_source_changed_action_handler_1 = require("./model-source-changed-action-handler");
const modelSourceWatcherModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    sprotty_1.configureActionHandler({ bind, isBound }, protocol_1.ModelSourceChangedAction.KIND, model_source_changed_action_handler_1.ModelSourceChangedActionHandler);
});
exports.default = modelSourceWatcherModule;
//# sourceMappingURL=di.config.js.map