"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configureServerActions = void 0;
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
require("@vscode/codicons/dist/codicon.css");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
require("../../css/glsp-sprotty.css");
const action_dispatcher_1 = require("./action-dispatcher");
const focus_change_action_1 = require("./actions/focus-change-action");
const command_stack_1 = require("./command-stack");
const editor_context_service_1 = require("./editor-context-service");
const focus_tracker_1 = require("./focus-tracker");
const model_initialization_constraint_1 = require("./model-initialization-constraint");
const model_registry_1 = require("./model/model-registry");
const update_model_command_1 = require("./model/update-model-command");
const selection_clearing_mouse_listener_1 = require("./selection-clearing-mouse-listener");
const glsp_tool_manager_1 = require("./tool-manager/glsp-tool-manager");
const types_1 = require("./types");
const view_registry_1 = require("./view/view-registry");
const defaultGLSPModule = new inversify_1.ContainerModule((bind, _unbind, isBound, rebind) => {
    const context = { bind, _unbind, isBound, rebind };
    bind(editor_context_service_1.EditorContextService).toSelf().inSingletonScope();
    bind(types_1.GLSP_TYPES.IEditorContextServiceProvider).toProvider(ctx => () => new Promise((resolve, reject) => {
        if (ctx.container.isBound(editor_context_service_1.EditorContextService)) {
            resolve(ctx.container.get(editor_context_service_1.EditorContextService));
        }
        else {
            reject();
        }
    }));
    sprotty_1.configureActionHandler(context, protocol_1.SetEditModeAction.KIND, editor_context_service_1.EditorContextService);
    bind(focus_tracker_1.FocusTracker).toSelf().inSingletonScope();
    sprotty_1.configureActionHandler(context, focus_change_action_1.FocusStateChangedAction.KIND, focus_tracker_1.FocusTracker);
    // Model update initialization ------------------------------------
    sprotty_1.configureCommand(context, update_model_command_1.FeedbackAwareUpdateModelCommand);
    sprotty_1.configureActionHandler(context, sprotty_1.SetModelCommand.KIND, update_model_command_1.SetModelActionHandler);
    bind(sprotty_1.TYPES.MouseListener).to(selection_clearing_mouse_listener_1.SelectionClearingMouseListener);
    rebind(sprotty_1.TYPES.ICommandStack).to(command_stack_1.GLSPCommandStack);
    bind(glsp_tool_manager_1.GLSPToolManager).toSelf().inSingletonScope();
    bind(types_1.GLSP_TYPES.IGLSPToolManager).toService(glsp_tool_manager_1.GLSPToolManager);
    rebind(sprotty_1.TYPES.IToolManager).toService(glsp_tool_manager_1.GLSPToolManager);
    bind(action_dispatcher_1.GLSPActionDispatcher).toSelf().inSingletonScope();
    rebind(sprotty_1.TYPES.IActionDispatcher).toService(action_dispatcher_1.GLSPActionDispatcher);
    bind(model_initialization_constraint_1.ModelInitializationConstraint).to(model_initialization_constraint_1.DefaultModelInitializationConstraint).inSingletonScope();
    // support re-registration of model elements and views
    rebind(sprotty_1.TYPES.SModelRegistry).to(model_registry_1.GLSPModelRegistry).inSingletonScope();
    rebind(sprotty_1.TYPES.ViewRegistry).to(view_registry_1.GLSPViewRegistry).inSingletonScope();
});
exports.default = defaultGLSPModule;
/**
 * Utility function to configure the {@link ModelSource}, i.e. the `DiagramServer`, as action handler for all server actions for the given
 * diagramType.
 * @param result A promise that resolves after all server actions have been registered.
 * @param diagramType The diagram type.
 * @param container The di container.
 */
async function configureServerActions(result, diagramType, container) {
    const modelSource = container.get(sprotty_1.TYPES.ModelSource);
    const actionHandlerRegistry = container.get(sprotty_1.ActionHandlerRegistry);
    const serverActions = result.serverActions[diagramType];
    if (serverActions.length === 0) {
        throw new Error(`No server-handled actions could be derived from the initialize result for diagramType: ${diagramType}!`);
    }
    serverActions.forEach(actionKind => actionHandlerRegistry.register(actionKind, modelSource));
}
exports.configureServerActions = configureServerActions;
//# sourceMappingURL=di.config.js.map