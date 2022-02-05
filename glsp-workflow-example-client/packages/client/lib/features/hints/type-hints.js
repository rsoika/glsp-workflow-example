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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeHintProvider = exports.ApplyTypeHintsCommand = exports.ApplyTypeHintsAction = void 0;
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
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const types_1 = require("../../base/types");
const smodel_util_1 = require("../../utils/smodel-util");
const model_1 = require("../change-bounds/model");
const model_2 = require("../reconnect/model");
const model_3 = require("../tool-feedback/model");
const model_4 = require("./model");
let ApplyTypeHintsAction = class ApplyTypeHintsAction {
    constructor() {
        this.kind = ApplyTypeHintsCommand.KIND;
    }
};
ApplyTypeHintsAction = __decorate([
    inversify_1.injectable()
], ApplyTypeHintsAction);
exports.ApplyTypeHintsAction = ApplyTypeHintsAction;
let ApplyTypeHintsCommand = class ApplyTypeHintsCommand extends model_3.FeedbackCommand {
    constructor(action) {
        super();
        this.action = action;
        this.priority = 10;
    }
    execute(context) {
        context.root.index.all().forEach(element => {
            if (element instanceof sprotty_1.SShapeElement || element instanceof sprotty_1.SModelRoot) {
                this.applyShapeTypeHint(element);
            }
            else if (element instanceof sprotty_1.SEdge) {
                return this.applyEdgeTypeHint(element);
            }
        });
        return context.root;
    }
    applyEdgeTypeHint(element) {
        const hint = this.typeHintProvider.getEdgeTypeHint(element);
        if (hint && isModifiableFetureSet(element.features)) {
            addOrRemove(element.features, sprotty_1.deletableFeature, hint.deletable);
            addOrRemove(element.features, sprotty_1.editFeature, hint.routable);
            addOrRemove(element.features, model_2.reconnectFeature, hint.repositionable);
        }
    }
    applyShapeTypeHint(element) {
        const hint = this.typeHintProvider.getShapeTypeHint(element);
        if (hint && isModifiableFetureSet(element.features)) {
            addOrRemove(element.features, sprotty_1.deletableFeature, hint.deletable);
            addOrRemove(element.features, sprotty_1.moveFeature, hint.repositionable);
            addOrRemove(element.features, model_1.resizeFeature, hint.resizable);
            addOrRemove(element.features, model_4.reparentFeature, hint.reparentable);
            addOrRemove(element.features, model_4.containerFeature, true);
            const containable = createContainable(hint);
            Object.assign(element, containable);
            addOrRemove(element.features, sprotty_1.connectableFeature, true);
            const validSourceEdges = this.typeHintProvider.getValidEdgeElementTypes(element, 'source');
            const validTargetEdges = this.typeHintProvider.getValidEdgeElementTypes(element, 'target');
            const connectable = createConnectable(validSourceEdges, validTargetEdges);
            Object.assign(element, connectable);
        }
    }
};
ApplyTypeHintsCommand.KIND = 'applyTypeHints';
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.ITypeHintProvider),
    __metadata("design:type", Object)
], ApplyTypeHintsCommand.prototype, "typeHintProvider", void 0);
ApplyTypeHintsCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [ApplyTypeHintsAction])
], ApplyTypeHintsCommand);
exports.ApplyTypeHintsCommand = ApplyTypeHintsCommand;
function createConnectable(validSourceEdges, validTargetEdges) {
    return {
        canConnect: (routable, role) => role === 'source' ? validSourceEdges.includes(routable.type) : validTargetEdges.includes(routable.type)
    };
}
function createContainable(hint) {
    return {
        isContainableElement: element => hint.containableElementTypeIds ? hint.containableElementTypeIds.includes(smodel_util_1.getElementTypeId(element)) : false
    };
}
function addOrRemove(features, feature, add) {
    if (add && !features.has(feature)) {
        features.add(feature);
    }
    else if (!add && features.has(feature)) {
        features.delete(feature);
    }
}
function isModifiableFetureSet(featureSet) {
    return featureSet !== undefined && featureSet instanceof Set;
}
let TypeHintProvider = class TypeHintProvider {
    constructor() {
        this.shapeHints = new Map();
        this.edgeHints = new Map();
    }
    handle(action) {
        if (protocol_1.isSetTypeHintsAction(action)) {
            action.shapeHints.forEach(hint => this.shapeHints.set(hint.elementTypeId, hint));
            action.edgeHints.forEach(hint => this.edgeHints.set(hint.elementTypeId, hint));
            this.feedbackActionDispatcher.registerFeedback(this, [new ApplyTypeHintsAction()]);
        }
    }
    getValidEdgeElementTypes(input, role) {
        const elementTypeId = smodel_util_1.getElementTypeId(input);
        if (role === 'source') {
            return Array.from(Array.from(this.edgeHints.values())
                .filter(hint => hint.sourceElementTypeIds.some(sourceElementTypeId => smodel_util_1.hasCompatibleType(elementTypeId, sourceElementTypeId)))
                .map(hint => hint.elementTypeId));
        }
        else {
            return Array.from(Array.from(this.edgeHints.values())
                .filter(hint => hint.targetElementTypeIds.some(targetElementTypeId => smodel_util_1.hasCompatibleType(elementTypeId, targetElementTypeId)))
                .map(hint => hint.elementTypeId));
        }
    }
    getShapeTypeHint(input) {
        return getTypeHint(input, this.shapeHints);
    }
    getEdgeTypeHint(input) {
        return getTypeHint(input, this.edgeHints);
    }
};
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher),
    __metadata("design:type", Object)
], TypeHintProvider.prototype, "feedbackActionDispatcher", void 0);
TypeHintProvider = __decorate([
    inversify_1.injectable()
], TypeHintProvider);
exports.TypeHintProvider = TypeHintProvider;
function getTypeHint(input, hints) {
    const type = smodel_util_1.getElementTypeId(input);
    let hint = hints.get(type);
    // Check subtypes
    if (hint === undefined) {
        const subtypes = type.split(':');
        while (hint === undefined && subtypes.length > 0) {
            subtypes.pop();
            hint = hints.get(subtypes.join(':'));
        }
    }
    return hint;
}
//# sourceMappingURL=type-hints.js.map