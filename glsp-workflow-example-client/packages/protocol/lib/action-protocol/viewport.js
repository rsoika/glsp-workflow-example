"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFitToScreenAction = exports.FitToScreenAction = exports.isCenterAction = exports.CenterAction = void 0;
/********************************************************************************
 * Copyright (c) 2021 STMicroelectronics and others.
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
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
/**
 * Centers the viewport on the elements with the given identifiers. It changes the scroll setting of the viewport accordingly and resets
 * the zoom to its default. This action can also be created on the client but it can also be sent by the server in order to perform such
 *  a viewport change remotely.
 */
class CenterAction {
    constructor(elementIds, animate = true, retainZoom = false) {
        this.elementIds = elementIds;
        this.animate = animate;
        this.retainZoom = retainZoom;
        this.kind = CenterAction.KIND;
    }
}
exports.CenterAction = CenterAction;
CenterAction.KIND = 'center';
function isCenterAction(action) {
    return base_protocol_1.isActionKind(action, CenterAction.KIND) && typeguard_util_1.isBoolean(action, 'animate') && typeguard_util_1.isBoolean(action, 'retainZoom');
}
exports.isCenterAction = isCenterAction;
class FitToScreenAction {
    constructor(elementIds, padding, maxZoom, animate = true) {
        this.elementIds = elementIds;
        this.padding = padding;
        this.maxZoom = maxZoom;
        this.animate = animate;
        this.kind = FitToScreenAction.KIND;
    }
}
exports.FitToScreenAction = FitToScreenAction;
FitToScreenAction.KIND = 'fit';
function isFitToScreenAction(action) {
    return base_protocol_1.isActionKind(action, FitToScreenAction.KIND) && typeguard_util_1.isArray(action, 'elementIds') && typeguard_util_1.isBoolean(action, 'animate');
}
exports.isFitToScreenAction = isFitToScreenAction;
//# sourceMappingURL=viewport.js.map