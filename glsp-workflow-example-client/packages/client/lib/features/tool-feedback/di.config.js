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
const types_1 = require("../../base/types");
const model_1 = require("../change-bounds/model");
const change_bounds_tool_feedback_1 = require("./change-bounds-tool-feedback");
const creation_tool_feedback_1 = require("./creation-tool-feedback");
const css_feedback_1 = require("./css-feedback");
const edge_edit_tool_feedback_1 = require("./edge-edit-tool-feedback");
const feedback_action_dispatcher_1 = require("./feedback-action-dispatcher");
const marquee_tool_feedback_1 = require("./marquee-tool-feedback");
const view_1 = require("./view");
const toolFeedbackModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(types_1.GLSP_TYPES.IFeedbackActionDispatcher).to(feedback_action_dispatcher_1.FeedbackActionDispatcher).inSingletonScope();
    sprotty_1.configureCommand({ bind, isBound }, css_feedback_1.ModifyCssFeedbackCommand);
    // create node and edge tool feedback
    sprotty_1.configureCommand({ bind, isBound }, creation_tool_feedback_1.DrawFeedbackEdgeCommand);
    sprotty_1.configureCommand({ bind, isBound }, creation_tool_feedback_1.RemoveFeedbackEdgeCommand);
    sprotty_1.configureCommand({ bind, isBound }, marquee_tool_feedback_1.DrawMarqueeCommand);
    sprotty_1.configureCommand({ bind, isBound }, marquee_tool_feedback_1.RemoveMarqueeCommand);
    sprotty_1.configureView({ bind, isBound }, creation_tool_feedback_1.FeedbackEdgeEnd.TYPE, view_1.FeedbackEdgeEndView);
    // move tool feedback: we use sprotties MoveCommand as client-side visual feedback
    sprotty_1.configureCommand({ bind, isBound }, sprotty_1.MoveCommand);
    // resize tool feedback
    sprotty_1.configureCommand({ bind, isBound }, change_bounds_tool_feedback_1.ShowChangeBoundsToolResizeFeedbackCommand);
    sprotty_1.configureCommand({ bind, isBound }, change_bounds_tool_feedback_1.HideChangeBoundsToolResizeFeedbackCommand);
    sprotty_1.configureView({ bind, isBound }, model_1.SResizeHandle.TYPE, view_1.SResizeHandleView);
    // reconnect edge tool feedback
    sprotty_1.configureCommand({ bind, isBound }, edge_edit_tool_feedback_1.ShowEdgeReconnectHandlesFeedbackCommand);
    sprotty_1.configureCommand({ bind, isBound }, edge_edit_tool_feedback_1.HideEdgeReconnectHandlesFeedbackCommand);
    sprotty_1.configureCommand({ bind, isBound }, edge_edit_tool_feedback_1.DrawFeedbackEdgeSourceCommand);
    sprotty_1.configureCommand({ bind, isBound }, edge_edit_tool_feedback_1.SwitchRoutingModeCommand);
    bind(sprotty_1.TYPES.IVNodePostprocessor).to(sprotty_1.LocationPostprocessor);
    bind(sprotty_1.TYPES.HiddenVNodePostprocessor).to(sprotty_1.LocationPostprocessor);
});
exports.default = toolFeedbackModule;
//# sourceMappingURL=di.config.js.map