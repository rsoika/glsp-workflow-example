"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/********************************************************************************
 * Copyright (c) 2020-2022 EclipseSource and others.
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
const popup_position_updater_1 = require("sprotty/lib/features/hover/popup-position-updater");
const focus_change_action_1 = require("../../base/actions/focus-change-action");
const hover_1 = require("./hover");
const glspHoverModule = new inversify_1.ContainerModule((bind, _unbind, isBound) => {
    bind(sprotty_1.TYPES.PopupVNodePostprocessor).to(popup_position_updater_1.PopupPositionUpdater).inSingletonScope();
    bind(hover_1.GlspHoverMouseListener).toSelf().inSingletonScope();
    bind(sprotty_1.TYPES.MouseListener).toService(hover_1.GlspHoverMouseListener);
    bind(sprotty_1.TYPES.PopupMouseListener).to(sprotty_1.PopupHoverMouseListener);
    bind(sprotty_1.TYPES.KeyListener).to(sprotty_1.HoverKeyListener);
    bind(sprotty_1.TYPES.HoverState).toConstantValue({
        mouseOverTimer: undefined,
        mouseOutTimer: undefined,
        popupOpen: false,
        previousPopupElement: undefined
    });
    bind(sprotty_1.ClosePopupActionHandler).toSelf().inSingletonScope();
    const context = { bind, isBound };
    sprotty_1.configureCommand(context, sprotty_1.HoverFeedbackCommand);
    sprotty_1.configureCommand(context, sprotty_1.SetPopupModelCommand);
    sprotty_1.configureActionHandler(context, sprotty_1.SetPopupModelCommand.KIND, sprotty_1.ClosePopupActionHandler);
    sprotty_1.configureActionHandler(context, sprotty_1.FitToScreenCommand.KIND, sprotty_1.ClosePopupActionHandler);
    sprotty_1.configureActionHandler(context, sprotty_1.CenterCommand.KIND, sprotty_1.ClosePopupActionHandler);
    sprotty_1.configureActionHandler(context, sprotty_1.SetViewportCommand.KIND, sprotty_1.ClosePopupActionHandler);
    sprotty_1.configureActionHandler(context, sprotty_1.MoveCommand.KIND, sprotty_1.ClosePopupActionHandler);
    sprotty_1.configureActionHandler(context, focus_change_action_1.FocusStateChangedAction.KIND, sprotty_1.ClosePopupActionHandler);
    sprotty_1.configureActionHandler(context, focus_change_action_1.FocusStateChangedAction.KIND, hover_1.GlspHoverMouseListener);
});
exports.default = glspHoverModule;
//# sourceMappingURL=di.config.js.map