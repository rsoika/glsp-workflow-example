"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultModelInitializationConstraint = exports.ModelInitializationConstraint = void 0;
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
const async_1 = require("sprotty/lib/utils/async");
/**
 * The constraint defining when the initialization of the GLSP model is completed.
 *
 * Many actions, such as the `CenterAction`, can only be successfully processed if
 * the GLSP model initialization is completed, that is, the model has been set,
 * its bounds have been computed, the canvas bounds are available, etc.
 *
 * An injectable implementation of this constraint will be used by the
 * `GLSPActionDispatcher` to determine when the initialization is completed.
 * The action dispatcher therefore provides a promise via `onceInitialized()`
 * to trigger clients that want to dispatch an action, once the initialization
 * is done.
 *
 * For most of the cases `DefaultInitializationConstraint` can be used. In fact,
 * it is bound by default. However, custom implementations can rebind other
 * implementations of this constraint to, for instance, delay further before the
 * `onceInitialized()` promise is fulfilled by the `GLSPActionDispatcher`.
 */
let ModelInitializationConstraint = class ModelInitializationConstraint {
    constructor() {
        this.completion = new async_1.Deferred();
        this.completed = false;
    }
    get isCompleted() {
        return this.completed;
    }
    setCompleted(isCompleted) {
        this.completed = isCompleted;
        if (isCompleted) {
            this.completion.resolve();
        }
    }
    onInitialized() {
        return this.completion.promise;
    }
    notifyDispatched(action) {
        if (this.isCompleted) {
            return;
        }
        if (this.isInitializedAfter(action)) {
            this.setCompleted(true);
        }
    }
};
ModelInitializationConstraint = __decorate([
    inversify_1.injectable()
], ModelInitializationConstraint);
exports.ModelInitializationConstraint = ModelInitializationConstraint;
/**
 * Default initialization constraint triggers after a non-empty `UpdateModelAction`
 * and a subsequent `InitializeCanvasBoundsAction`.
 */
let DefaultModelInitializationConstraint = class DefaultModelInitializationConstraint extends ModelInitializationConstraint {
    constructor() {
        super(...arguments);
        this.seenNonEmptyUpdateModel = false;
    }
    isInitializedAfter(action) {
        if (this.isNonEmptyUpdateModel(action)) {
            this.seenNonEmptyUpdateModel = true;
        }
        else if (this.seenNonEmptyUpdateModel && action.kind === sprotty_1.InitializeCanvasBoundsAction.KIND) {
            return true;
        }
        return false;
    }
    isNonEmptyUpdateModel(action) {
        if (action && action.kind === protocol_1.UpdateModelAction.KIND) {
            const updateModelAction = action;
            return updateModelAction.newRoot !== undefined && updateModelAction.newRoot.type !== 'NONE';
        }
        return false;
    }
};
DefaultModelInitializationConstraint = __decorate([
    inversify_1.injectable()
], DefaultModelInitializationConstraint);
exports.DefaultModelInitializationConstraint = DefaultModelInitializationConstraint;
//# sourceMappingURL=model-initialization-constraint.js.map