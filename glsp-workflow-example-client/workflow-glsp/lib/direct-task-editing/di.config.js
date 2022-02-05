"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.directTaskEditor = void 0;
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
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const direct_task_editor_1 = require("./direct-task-editor");
exports.directTaskEditor = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(direct_task_editor_1.TaskEditor).toSelf().inSingletonScope();
    bind(sprotty_1.TYPES.IUIExtension).toService(direct_task_editor_1.TaskEditor);
});
//# sourceMappingURL=di.config.js.map