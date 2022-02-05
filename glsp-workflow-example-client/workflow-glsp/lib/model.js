"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryNode = exports.Icon = exports.ActivityNode = exports.WeightedEdge = exports.isTaskNode = exports.TaskNode = void 0;
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
const client_1 = require("@eclipse-glsp/client");
class TaskNode extends client_1.RectangularNode {
    get editableLabel() {
        const label = this.children.find(element => element.type === 'label:heading');
        if (label && client_1.isEditableLabel(label)) {
            return label;
        }
        return undefined;
    }
    get name() {
        var _a;
        const labelText = (_a = this.editableLabel) === null || _a === void 0 ? void 0 : _a.text;
        return labelText ? labelText : '<unknown>';
    }
}
exports.TaskNode = TaskNode;
TaskNode.DEFAULT_FEATURES = [
    client_1.connectableFeature,
    client_1.deletableFeature,
    client_1.selectFeature,
    client_1.boundsFeature,
    client_1.moveFeature,
    client_1.layoutContainerFeature,
    client_1.fadeFeature,
    client_1.hoverFeedbackFeature,
    client_1.popupFeature,
    client_1.nameFeature,
    client_1.withEditLabelFeature
];
function isTaskNode(element) {
    return element instanceof TaskNode || false;
}
exports.isTaskNode = isTaskNode;
class WeightedEdge extends client_1.SEdge {
}
exports.WeightedEdge = WeightedEdge;
class ActivityNode extends client_1.DiamondNode {
    constructor() {
        super(...arguments);
        this.nodeType = ActivityNode.Type.UNDEFINED;
        this.size = {
            width: 32,
            height: 32
        };
        this.strokeWidth = 1;
    }
}
exports.ActivityNode = ActivityNode;
(function (ActivityNode) {
    let Type;
    (function (Type) {
        Type.INITIAL = 'initalNode';
        Type.FINAL = 'finalNode';
        Type.DECISION = 'decisionNode';
        Type.MERGE = 'mergeNode';
        Type.JOIN = 'joinNode';
        Type.FORK = 'forkNode';
        Type.UNDEFINED = 'undefined';
    })(Type = ActivityNode.Type || (ActivityNode.Type = {}));
})(ActivityNode = exports.ActivityNode || (exports.ActivityNode = {}));
class Icon extends client_1.SShapeElement {
    constructor() {
        super(...arguments);
        this.size = {
            width: 32,
            height: 32
        };
    }
}
exports.Icon = Icon;
Icon.DEFAULT_FEATURES = [client_1.boundsFeature, client_1.layoutContainerFeature, client_1.layoutableChildFeature, client_1.fadeFeature];
class CategoryNode extends client_1.RectangularNode {
    constructor() {
        super(...arguments);
        this.name = '';
    }
    get editableLabel() {
        const label = this.children.find(element => element.type === 'label:heading');
        if (label && client_1.isEditableLabel(label)) {
            return label;
        }
        return undefined;
    }
}
exports.CategoryNode = CategoryNode;
CategoryNode.DEFAULT_FEATURES = [
    client_1.deletableFeature,
    client_1.selectFeature,
    client_1.boundsFeature,
    client_1.moveFeature,
    client_1.layoutContainerFeature,
    client_1.fadeFeature,
    client_1.hoverFeedbackFeature,
    client_1.popupFeature,
    client_1.nameFeature,
    client_1.withEditLabelFeature
];
//# sourceMappingURL=model.js.map