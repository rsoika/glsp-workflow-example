"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DeleteMarkersAction_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.isDeleteMarkersAction = exports.DeleteMarkersAction = exports.isSetMarkersAction = exports.SetMarkersAction = exports.isRequestMarkersAction = exports.RequestMarkersAction = exports.MarkerKind = void 0;
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
const inversify_1 = require("inversify");
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
var MarkerKind;
(function (MarkerKind) {
    MarkerKind.INFO = 'info';
    MarkerKind.WARNING = 'warning';
    MarkerKind.ERROR = 'error';
})(MarkerKind = exports.MarkerKind || (exports.MarkerKind = {}));
/**
 * Action to retrieve markers for the specified model elements. Sent from the client to the server.
 */
class RequestMarkersAction {
    constructor(elementsIDs = [], requestId = '', kind = RequestMarkersAction.KIND) {
        this.elementsIDs = elementsIDs;
        this.requestId = requestId;
        this.kind = kind;
    }
}
exports.RequestMarkersAction = RequestMarkersAction;
RequestMarkersAction.KIND = 'requestMarkers';
function isRequestMarkersAction(action) {
    return base_protocol_1.isActionKind(action, RequestMarkersAction.KIND) && typeguard_util_1.isArray(action, 'elementsIDs');
}
exports.isRequestMarkersAction = isRequestMarkersAction;
/**
 * Response to the {@link RequestMarkersAction} containing all validation markers. Sent from the server to the client.
 */
class SetMarkersAction {
    constructor(markers, responseId = '', kind = SetMarkersAction.KIND) {
        this.markers = markers;
        this.responseId = responseId;
        this.kind = kind;
    }
}
exports.SetMarkersAction = SetMarkersAction;
SetMarkersAction.KIND = 'setMarkers';
function isSetMarkersAction(action) {
    return base_protocol_1.isActionKind(action, SetMarkersAction.KIND) && typeguard_util_1.isArray(action, 'markers');
}
exports.isSetMarkersAction = isSetMarkersAction;
/**
 * Action for clearing makers of a model
 */
let DeleteMarkersAction = DeleteMarkersAction_1 = class DeleteMarkersAction {
    constructor(markers, kind = DeleteMarkersAction_1.KIND) {
        this.markers = markers;
        this.kind = kind;
    }
};
DeleteMarkersAction.KIND = 'deleteMarkers';
DeleteMarkersAction = DeleteMarkersAction_1 = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Array, Object])
], DeleteMarkersAction);
exports.DeleteMarkersAction = DeleteMarkersAction;
function isDeleteMarkersAction(action) {
    return base_protocol_1.isActionKind(action, DeleteMarkersAction.KIND) && typeguard_util_1.isArray(action, 'markers');
}
exports.isDeleteMarkersAction = isDeleteMarkersAction;
//# sourceMappingURL=element-validation.js.map