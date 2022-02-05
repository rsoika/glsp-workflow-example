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
const lib_1 = require("@eclipse-glsp-examples/workflow-glsp/lib");
const client_1 = require("@eclipse-glsp/client");
const sprotty_1 = require("sprotty");
require("../css/diagram.css");
function createContainer() {
    const container = lib_1.createWorkflowDiagramContainer('sprotty');
    container.bind(client_1.GLSPDiagramServer).toSelf().inSingletonScope();
    container.bind(sprotty_1.TYPES.ModelSource).toService(client_1.GLSPDiagramServer);
    container.rebind(sprotty_1.TYPES.ILogger).to(sprotty_1.ConsoleLogger).inSingletonScope();
    container.rebind(sprotty_1.TYPES.LogLevel).toConstantValue(sprotty_1.LogLevel.warn);
    container.bind(client_1.GLSP_TYPES.IMarqueeBehavior).toConstantValue({ entireEdge: true, entireElement: true });
    return container;
}
exports.default = createContainer;
//# sourceMappingURL=di.config.js.map