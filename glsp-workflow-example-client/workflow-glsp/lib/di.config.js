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
const client_1 = require("@eclipse-glsp/client");
const protocol_1 = require("@eclipse-glsp/protocol");
require("balloon-css/balloon.min.css");
const inversify_1 = require("inversify");
require("sprotty/css/edit-label.css");
require("../css/diagram.css");
const di_config_1 = require("./direct-task-editing/di.config");
const model_1 = require("./model");
const workflow_views_1 = require("./workflow-views");
const workflowDiagramModule = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    rebind(client_1.TYPES.ILogger).to(client_1.ConsoleLogger).inSingletonScope();
    rebind(client_1.TYPES.LogLevel).toConstantValue(client_1.LogLevel.warn);
    bind(client_1.TYPES.ISnapper).to(client_1.GridSnapper);
    bind(client_1.TYPES.ICommandPaletteActionProvider).to(client_1.RevealNamedElementActionProvider);
    bind(client_1.TYPES.IContextMenuItemProvider).to(client_1.DeleteElementContextMenuItemProvider);
    const context = { bind, unbind, isBound, rebind };
    client_1.configureDefaultModelElements(context);
    client_1.configureModelElement(context, 'task:automated', model_1.TaskNode, client_1.RoundedCornerNodeView);
    client_1.configureModelElement(context, 'task:manual', model_1.TaskNode, client_1.RoundedCornerNodeView);
    client_1.configureModelElement(context, 'label:heading', client_1.SLabel, client_1.SLabelView, { enable: [client_1.editLabelFeature] });
    client_1.configureModelElement(context, 'comp:comp', client_1.SCompartment, client_1.SCompartmentView);
    client_1.configureModelElement(context, 'comp:header', client_1.SCompartment, client_1.SCompartmentView);
    client_1.configureModelElement(context, 'label:icon', client_1.SLabel, client_1.SLabelView);
    client_1.configureModelElement(context, protocol_1.DefaultTypes.EDGE, client_1.SEdge, workflow_views_1.WorkflowEdgeView);
    client_1.configureModelElement(context, 'edge:weighted', model_1.WeightedEdge, workflow_views_1.WorkflowEdgeView);
    client_1.configureModelElement(context, 'icon', model_1.Icon, workflow_views_1.IconView);
    client_1.configureModelElement(context, 'activityNode:merge', model_1.ActivityNode, client_1.DiamondNodeView);
    client_1.configureModelElement(context, 'activityNode:decision', model_1.ActivityNode, client_1.DiamondNodeView);
    client_1.configureModelElement(context, 'activityNode:fork', model_1.ActivityNode, client_1.RectangularNodeView);
    client_1.configureModelElement(context, 'activityNode:join', model_1.ActivityNode, client_1.RectangularNodeView);
    client_1.configureModelElement(context, 'category', model_1.CategoryNode, client_1.RoundedCornerNodeView);
    client_1.configureModelElement(context, 'struct', client_1.SCompartment, client_1.StructureCompartmentView);
});
function createContainer(widgetId) {
    const container = client_1.createClientContainer(workflowDiagramModule, di_config_1.directTaskEditor);
    client_1.overrideViewerOptions(container, {
        baseDiv: widgetId,
        hiddenDiv: widgetId + '_hidden'
    });
    return container;
}
exports.default = createContainer;
//# sourceMappingURL=di.config.js.map