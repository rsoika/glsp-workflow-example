"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureDefaultModelElements = void 0;
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
const protocol_1 = require("@eclipse-glsp/protocol");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const model_1 = require("../lib/model");
const glsp_edge_view_1 = require("./glsp-edge-view");
const issue_marker_view_1 = require("./issue-marker-view");
const rounded_corner_view_1 = require("./rounded-corner-view");
const baseViewModule = new inversify_1.ContainerModule((bind, unbind, isBound, rebind) => {
    const context = { bind, unbind, isBound, rebind };
    configureDefaultModelElements(context);
});
function configureDefaultModelElements(context) {
    // HTML elements
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.HTML, sprotty_1.HtmlRoot, sprotty_1.HtmlRootView);
    // generic elements
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.FOREIGN_OBJECT, sprotty_1.ForeignObjectElement, sprotty_1.ForeignObjectView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.PRE_RENDERED, sprotty_1.PreRenderedElement, sprotty_1.PreRenderedView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.SHAPE_PRE_RENDERED, sprotty_1.ShapedPreRenderedElement, sprotty_1.PreRenderedView);
    // SVG elements
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.SVG, sprotty_1.ViewportRootElement, sprotty_1.SvgViewportView);
    // graph elements
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.GRAPH, model_1.GLSPGraph, sprotty_1.SGraphView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.NODE, sprotty_1.SNode, rounded_corner_view_1.RoundedCornerNodeView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.COMPARTMENT, sprotty_1.SCompartment, sprotty_1.SCompartmentView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.COMPARTMENT_HEADER, sprotty_1.SCompartment, sprotty_1.SCompartmentView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.EDGE, sprotty_1.SEdge, glsp_edge_view_1.GEdgeView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.PORT, sprotty_1.SPort, sprotty_1.RectangularNodeView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.ROUTING_POINT, sprotty_1.SRoutingHandle, sprotty_1.SRoutingHandleView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.VOLATILE_ROUTING_POINT, sprotty_1.SRoutingHandle, sprotty_1.SRoutingHandleView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.LABEL, sprotty_1.SLabel, sprotty_1.SLabelView);
    // UI elements
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.BUTTON_EXPAND, sprotty_1.SButton, sprotty_1.ExpandButtonView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.ISSUE_MARKER, sprotty_1.SIssueMarker, issue_marker_view_1.GIssueMarkerView);
    // shapes
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.NODE_CIRCLE, sprotty_1.CircularNode, sprotty_1.CircularNodeView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.NODE_DIAMOND, sprotty_1.DiamondNode, sprotty_1.DiamondNodeView);
    sprotty_1.configureModelElement(context, protocol_1.DefaultTypes.NODE_RECTANGLE, sprotty_1.RectangularNode, sprotty_1.RectangularNodeView);
}
exports.configureDefaultModelElements = configureDefaultModelElements;
exports.default = baseViewModule;
//# sourceMappingURL=base-view-module.js.map