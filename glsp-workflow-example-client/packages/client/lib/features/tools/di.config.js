"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureMarqueeTool = void 0;
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
const marquee_tool_feedback_1 = require("../tool-feedback/marquee-tool-feedback");
const change_bounds_tool_1 = require("./change-bounds-tool");
const delete_tool_1 = require("./delete-tool");
const edge_creation_tool_1 = require("./edge-creation-tool");
const edge_edit_tool_1 = require("./edge-edit-tool");
const marquee_mouse_tool_1 = require("./marquee-mouse-tool");
const marquee_tool_1 = require("./marquee-tool");
const model_1 = require("./model");
const node_creation_tool_1 = require("./node-creation-tool");
const view_1 = require("./view");
const toolsModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    // Register default tools
    bind(types_1.GLSP_TYPES.IDefaultTool).to(change_bounds_tool_1.ChangeBoundsTool);
    bind(types_1.GLSP_TYPES.IDefaultTool).to(edge_edit_tool_1.EdgeEditTool);
    bind(types_1.GLSP_TYPES.IDefaultTool).to(delete_tool_1.DelKeyDeleteTool);
    // Register  tools
    bind(types_1.GLSP_TYPES.ITool).to(delete_tool_1.MouseDeleteTool);
    bind(node_creation_tool_1.NodeCreationTool).toSelf().inSingletonScope();
    bind(edge_creation_tool_1.EdgeCreationTool).toSelf().inSingletonScope();
    bind(types_1.GLSP_TYPES.ITool).toService(edge_creation_tool_1.EdgeCreationTool);
    bind(types_1.GLSP_TYPES.ITool).toService(node_creation_tool_1.NodeCreationTool);
    configureMarqueeTool({ bind, isBound });
    sprotty_1.configureActionHandler({ bind, isBound }, protocol_1.TriggerNodeCreationAction.KIND, node_creation_tool_1.NodeCreationTool);
    sprotty_1.configureActionHandler({ bind, isBound }, protocol_1.TriggerEdgeCreationAction.KIND, edge_creation_tool_1.EdgeCreationTool);
});
function configureMarqueeTool(context) {
    sprotty_1.configureModelElement(context, marquee_tool_feedback_1.MARQUEE, model_1.MarqueeNode, view_1.MarqueeView);
    context.bind(types_1.GLSP_TYPES.IDefaultTool).to(marquee_tool_1.MarqueeTool);
    context.bind(types_1.GLSP_TYPES.ITool).to(marquee_mouse_tool_1.MarqueeMouseTool);
}
exports.configureMarqueeTool = configureMarqueeTool;
exports.default = toolsModule;
//# sourceMappingURL=di.config.js.map