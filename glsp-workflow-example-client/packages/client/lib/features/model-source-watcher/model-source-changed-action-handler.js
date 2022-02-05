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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ModelSourceChangedActionHandler = exports.ExternalModelSourceChangedHandler = void 0;
/********************************************************************************
 * Copyright (c) 2020-2021 EclipseSource and others.
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
/**
 * An external handler of the model source change event.
 *
 * This allows external applications to react specifically to this event, e.g. by bringing up the diagram,
 * check their dirty state, show a dialog, etc.
 */
let ExternalModelSourceChangedHandler = class ExternalModelSourceChangedHandler {
};
ExternalModelSourceChangedHandler = __decorate([
    inversify_1.injectable()
], ExternalModelSourceChangedHandler);
exports.ExternalModelSourceChangedHandler = ExternalModelSourceChangedHandler;
let ModelSourceChangedActionHandler = class ModelSourceChangedActionHandler {
    handle(action) {
        if (protocol_1.isModelSourceChangedAction(action)) {
            if (this.externalModelSourceChangedHandler) {
                this.externalModelSourceChangedHandler
                    .notifyModelSourceChange(action.modelSourceName, this.options)
                    .then(actions => this.dispatcher.dispatchAll(actions));
                return;
            }
            this.showSimpleNotification(action);
        }
    }
    showSimpleNotification(action) {
        const message = `The model source ${action.modelSourceName} has changed. You might want to consider reloading.`;
        const timeout = 0;
        const severity = 'WARNING';
        this.dispatcher.dispatchAll([
            { kind: protocol_1.GLSPServerStatusAction.KIND, severity, timeout, message },
            { kind: protocol_1.ServerMessageAction.KIND, severity, timeout, message }
        ]);
    }
};
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcher),
    __metadata("design:type", Object)
], ModelSourceChangedActionHandler.prototype, "dispatcher", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ViewerOptions),
    __metadata("design:type", Object)
], ModelSourceChangedActionHandler.prototype, "options", void 0);
__decorate([
    inversify_1.inject(ExternalModelSourceChangedHandler),
    inversify_1.optional(),
    __metadata("design:type", ExternalModelSourceChangedHandler)
], ModelSourceChangedActionHandler.prototype, "externalModelSourceChangedHandler", void 0);
ModelSourceChangedActionHandler = __decorate([
    inversify_1.injectable()
], ModelSourceChangedActionHandler);
exports.ModelSourceChangedActionHandler = ModelSourceChangedActionHandler;
//# sourceMappingURL=model-source-changed-action-handler.js.map