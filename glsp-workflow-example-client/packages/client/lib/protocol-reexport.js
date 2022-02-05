"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Workaround for now to solve ambiguous exports in glsp-client. This module provides all glsp-only components.
 * i.e. typings that are not defined in sprotty
 */
var base_protocol_1 = require("@eclipse-glsp/protocol/lib/action-protocol/base-protocol");
Object.defineProperty(exports, "CompoundOperation", { enumerable: true, get: function () { return base_protocol_1.CompoundOperation; } });
Object.defineProperty(exports, "isActionKind", { enumerable: true, get: function () { return base_protocol_1.isActionKind; } });
Object.defineProperty(exports, "isCompoundOperation", { enumerable: true, get: function () { return base_protocol_1.isCompoundOperation; } });
Object.defineProperty(exports, "isRejectAction", { enumerable: true, get: function () { return base_protocol_1.isRejectAction; } });
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/client-notification"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/clipboard"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/contexts"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/edge-modification"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/element-creation"), exports);
var element_hover_1 = require("@eclipse-glsp/protocol/lib/action-protocol/element-hover");
Object.defineProperty(exports, "isRequestPopupModelAction", { enumerable: true, get: function () { return element_hover_1.isRequestPopupModelAction; } });
Object.defineProperty(exports, "isSetPopupModelAction", { enumerable: true, get: function () { return element_hover_1.isSetPopupModelAction; } });
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/element-navigation"), exports);
var element_selection_1 = require("@eclipse-glsp/protocol/lib/action-protocol/element-selection");
Object.defineProperty(exports, "isSelectAction", { enumerable: true, get: function () { return element_selection_1.isSelectAction; } });
Object.defineProperty(exports, "isSelectAllAction", { enumerable: true, get: function () { return element_selection_1.isSelectAllAction; } });
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/element-text-editing"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/element-type-hints"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/element-validation"), exports);
var mode_layout_1 = require("@eclipse-glsp/protocol/lib/action-protocol/mode-layout");
Object.defineProperty(exports, "LayoutOperation", { enumerable: true, get: function () { return mode_layout_1.LayoutOperation; } });
var model_data_1 = require("@eclipse-glsp/protocol/lib/action-protocol/model-data");
Object.defineProperty(exports, "isModelSourceChangedAction", { enumerable: true, get: function () { return model_data_1.isModelSourceChangedAction; } });
Object.defineProperty(exports, "isRequestModelAction", { enumerable: true, get: function () { return model_data_1.isRequestModelAction; } });
Object.defineProperty(exports, "isSetModelAction", { enumerable: true, get: function () { return model_data_1.isSetModelAction; } });
Object.defineProperty(exports, "ModelSourceChangedAction", { enumerable: true, get: function () { return model_data_1.ModelSourceChangedAction; } });
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/model-edit-mode"), exports);
var model_saving_1 = require("@eclipse-glsp/protocol/lib/action-protocol/model-saving");
Object.defineProperty(exports, "DirtyStateChangeReason", { enumerable: true, get: function () { return model_saving_1.DirtyStateChangeReason; } });
Object.defineProperty(exports, "isExportSvgAction", { enumerable: true, get: function () { return model_saving_1.isExportSvgAction; } });
Object.defineProperty(exports, "isSaveModelAction", { enumerable: true, get: function () { return model_saving_1.isSaveModelAction; } });
Object.defineProperty(exports, "isSetDirtyStateAction", { enumerable: true, get: function () { return model_saving_1.isSetDirtyStateAction; } });
Object.defineProperty(exports, "SaveModelAction", { enumerable: true, get: function () { return model_saving_1.SaveModelAction; } });
Object.defineProperty(exports, "SetDirtyStateAction", { enumerable: true, get: function () { return model_saving_1.SetDirtyStateAction; } });
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/node-modification"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/tool-palette"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/action-protocol/undo-redo"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/glsp-client"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/jsonrpc/base-jsonrpc-glsp-client"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/jsonrpc/glsp-jsonrpc-client"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/utils/array-util"), exports);
__exportStar(require("@eclipse-glsp/protocol/lib/utils/launch-util"), exports);
//# sourceMappingURL=protocol-reexport.js.map