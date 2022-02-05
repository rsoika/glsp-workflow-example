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
/* eslint-disable import/no-deprecated,no-unused-expressions */
const protocol_1 = require("@eclipse-glsp/protocol");
const chai_1 = require("chai");
const inversify_1 = require("inversify");
require("mocha");
require("reflect-metadata");
const sprotty_1 = require("sprotty");
const types_1 = require("../../base/types");
const model_1 = require("../change-bounds/model");
const selection_service_1 = require("../select/selection-service");
const feedback_action_dispatcher_1 = require("../tool-feedback/feedback-action-dispatcher");
const layout_commands_1 = require("./layout-commands");
class MockActionDispatcher {
    constructor(dispatchedActions = []) {
        this.dispatchedActions = dispatchedActions;
    }
    dispatch(action) {
        this.dispatchedActions.push(action);
        return Promise.resolve();
    }
    dispatchAll(actions) {
        actions.forEach(action => this.dispatchedActions.push(action));
        return Promise.resolve();
    }
    request(action) {
        throw new Error('Method not implemented.');
    }
}
const container = new inversify_1.Container();
container.load(sprotty_1.defaultModule);
container.bind(types_1.GLSP_TYPES.IFeedbackActionDispatcher).to(feedback_action_dispatcher_1.FeedbackActionDispatcher).inSingletonScope();
container.bind(selection_service_1.SelectionService).toSelf().inSingletonScope();
container.bind(types_1.GLSP_TYPES.SelectionService).toService(selection_service_1.SelectionService);
container.rebind(sprotty_1.TYPES.IModelFactory).to(sprotty_1.SGraphFactory).inSingletonScope();
const graphFactory = container.get(sprotty_1.TYPES.IModelFactory);
const selectionService = container.get(types_1.GLSP_TYPES.SelectionService);
const actionDispatcher = new MockActionDispatcher();
const node1 = {
    id: 'node1',
    type: 'node:circle',
    selected: true
};
const node2 = {
    id: 'node2',
    type: 'node:circle',
    selected: true
};
const node3 = {
    id: 'node3',
    type: 'node:circle',
    selected: true
};
const model = createModel();
function createModel() {
    const root = graphFactory.createRoot({
        id: 'model1',
        type: 'graph',
        children: [node1, node2, node3]
    });
    root.children.forEach(child => applyFeature(child, model_1.resizeFeature));
    return root;
}
function applyFeature(element, feature) {
    element.features.add(feature);
}
const context = {
    root: model,
    modelFactory: graphFactory,
    duration: 0,
    modelChanged: undefined,
    logger: new sprotty_1.ConsoleLogger(),
    syncer: new sprotty_1.AnimationFrameSyncer()
};
const defaultSize = { height: 10, width: 10 };
describe('AlignElementsCommand', () => {
    it('should align all elements left', () => {
        actionDispatcher.dispatchedActions = [];
        const newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        const action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Left);
        const command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ['node1', { x: 111, y: 111, width: defaultSize.width, height: defaultSize.height }],
            ['node2', { x: 111, y: 222, width: defaultSize.width, height: defaultSize.height }],
            ['node3', { x: 111, y: 333, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
    it('should align all elements right', () => {
        actionDispatcher.dispatchedActions = [];
        const newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        const action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Right);
        const command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ['node1', { x: 333, y: 111, width: defaultSize.width, height: defaultSize.height }],
            ['node2', { x: 333, y: 222, width: defaultSize.width, height: defaultSize.height }],
            ['node3', { x: 333, y: 333, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
    it('should align all elements center', () => {
        actionDispatcher.dispatchedActions = [];
        const newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        const action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Center);
        const command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ['node1', { x: 222, y: 111, width: defaultSize.width, height: defaultSize.height }],
            ['node2', { x: 222, y: 222, width: defaultSize.width, height: defaultSize.height }],
            ['node3', { x: 222, y: 333, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
    it('should align all elements top', () => {
        actionDispatcher.dispatchedActions = [];
        const newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        const action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Top);
        const command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ['node1', { x: 111, y: 111, width: defaultSize.width, height: defaultSize.height }],
            ['node2', { x: 222, y: 111, width: defaultSize.width, height: defaultSize.height }],
            ['node3', { x: 333, y: 111, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
    it('should align all elements bottom', () => {
        actionDispatcher.dispatchedActions = [];
        const newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        const action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Bottom);
        const command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ['node1', { x: 111, y: 333, width: defaultSize.width, height: defaultSize.height }],
            ['node2', { x: 222, y: 333, width: defaultSize.width, height: defaultSize.height }],
            ['node3', { x: 333, y: 333, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
    it('should align all elements middle', () => {
        actionDispatcher.dispatchedActions = [];
        const newModel = initModel([
            { elementId: 'node1', newPosition: { x: 111, y: 111 }, newSize: defaultSize },
            { elementId: 'node2', newPosition: { x: 222, y: 222 }, newSize: defaultSize },
            { elementId: 'node3', newPosition: { x: 333, y: 333 }, newSize: defaultSize }
        ]);
        const action = new layout_commands_1.AlignElementsAction(['node1', 'node2', 'node3'], layout_commands_1.Alignment.Middle);
        const command = new layout_commands_1.AlignElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        assertAllBounds(new Map([
            ['node1', { x: 111, y: 222, width: defaultSize.width, height: defaultSize.height }],
            ['node2', { x: 222, y: 222, width: defaultSize.width, height: defaultSize.height }],
            ['node3', { x: 333, y: 222, width: defaultSize.width, height: defaultSize.height }]
        ]));
    });
});
describe('ResizeElementsCommand', () => {
    it('should make same width as last', () => {
        actionDispatcher.dispatchedActions = [];
        const newModel = initModel([
            { elementId: 'node1', newPosition: { x: 100, y: 100 }, newSize: { height: 10, width: 10 } },
            { elementId: 'node2', newPosition: { x: 100, y: 200 }, newSize: { height: 20, width: 20 } },
            { elementId: 'node3', newPosition: { x: 100, y: 300 }, newSize: { height: 30, width: 30 } }
        ]);
        const action = new layout_commands_1.ResizeElementsAction(['node1', 'node2', 'node3'], layout_commands_1.ResizeDimension.Width, layout_commands_1.Reduce.last);
        const command = new layout_commands_1.ResizeElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        // resize is keeping the center, so the X moves by diff / 2
        assertAllBoundsInChangeBounds(new Map([
            ['node1', { x: 90, y: 100, height: 10, width: 30 }],
            ['node2', { x: 95, y: 200, height: 20, width: 30 }],
            ['node3', { x: 100, y: 300, height: 30, width: 30 }]
        ]));
    });
    it('should make same height as last', () => {
        actionDispatcher.dispatchedActions = [];
        const newModel = initModel([
            { elementId: 'node1', newPosition: { x: 100, y: 100 }, newSize: { height: 10, width: 10 } },
            { elementId: 'node2', newPosition: { x: 100, y: 200 }, newSize: { height: 20, width: 20 } },
            { elementId: 'node3', newPosition: { x: 100, y: 300 }, newSize: { height: 30, width: 30 } }
        ]);
        const action = new layout_commands_1.ResizeElementsAction(['node1', 'node2', 'node3'], layout_commands_1.ResizeDimension.Height, layout_commands_1.Reduce.last);
        const command = new layout_commands_1.ResizeElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        // resize is keeping the center, so the Y moves by diff / 2
        assertAllBoundsInChangeBounds(new Map([
            ['node1', { x: 100, y: 90, height: 30, width: 10 }],
            ['node2', { x: 100, y: 195, height: 30, width: 20 }],
            ['node3', { x: 100, y: 300, height: 30, width: 30 }]
        ]));
    });
    it('should make same width and height as last', () => {
        actionDispatcher.dispatchedActions = [];
        const newModel = initModel([
            { elementId: 'node1', newPosition: { x: 100, y: 100 }, newSize: { height: 10, width: 10 } },
            { elementId: 'node2', newPosition: { x: 100, y: 200 }, newSize: { height: 20, width: 20 } },
            { elementId: 'node3', newPosition: { x: 100, y: 300 }, newSize: { height: 30, width: 30 } }
        ]);
        const action = new layout_commands_1.ResizeElementsAction(['node1', 'node2', 'node3'], layout_commands_1.ResizeDimension.Width_And_Height, layout_commands_1.Reduce.last);
        const command = new layout_commands_1.ResizeElementsCommand(action, actionDispatcher, selectionService);
        command.execute(newContext(newModel));
        // resize is keeping the center, so the Y moves by diff / 2
        assertAllBoundsInChangeBounds(new Map([
            ['node1', { x: 90, y: 90, height: 30, width: 30 }],
            ['node2', { x: 95, y: 195, height: 30, width: 30 }],
            ['node3', { x: 100, y: 300, height: 30, width: 30 }]
        ]));
    });
});
function initModel(elementAndBounds) {
    const mySetBoundsAction = new sprotty_1.SetBoundsAction(elementAndBounds);
    const setBoundsCommand = new sprotty_1.SetBoundsCommand(mySetBoundsAction);
    return setBoundsCommand.execute(context);
}
function newContext(root) {
    return {
        root: root,
        modelFactory: graphFactory,
        duration: 0,
        modelChanged: undefined,
        logger: new sprotty_1.ConsoleLogger(),
        syncer: new sprotty_1.AnimationFrameSyncer()
    };
}
function assertAllBounds(allBounds) {
    allBounds.forEach((bounds, nodeId) => assertBounds(nodeId, bounds));
}
function assertAllBoundsInChangeBounds(allBounds) {
    allBounds.forEach((bounds, nodeId) => assertBoundsInChangeBoundsActions(nodeId, bounds));
}
function assertBounds(nodeId, bounds) {
    assertBoundsInMoves(nodeId, bounds);
    assertBoundsInChangeBoundsActions(nodeId, bounds);
}
function assertBoundsInMoves(nodeId, bounds) {
    const moves = dispatchedElementMoves();
    const move = getMoveById(nodeId, moves);
    chai_1.expect(move.toPosition.x).to.be.equal(bounds.x);
    chai_1.expect(move.toPosition.y).to.be.equal(bounds.y);
}
function assertBoundsInChangeBoundsActions(nodeId, bounds) {
    const allChangeBounds = dispatchedChangeBounds();
    const changeBounds = getElementAndBoundsById(nodeId, allChangeBounds);
    chai_1.expect(changeBounds.newPosition.x).to.be.equal(bounds.x);
    chai_1.expect(changeBounds.newPosition.y).to.be.equal(bounds.y);
    chai_1.expect(changeBounds.newSize.height).to.be.equal(bounds.height);
    chai_1.expect(changeBounds.newSize.width).to.be.equal(bounds.width);
}
function getMoveById(id, moves) {
    return moves.filter(m => m.elementId === id)[0];
}
function getElementAndBoundsById(id, elementAndBounds) {
    return elementAndBounds.filter(m => m.elementId === id)[0];
}
function dispatchedElementMoves() {
    return actionDispatcher.dispatchedActions
        .filter(isMoveAction)
        .map(a => a.moves)
        .reduce((acc, val) => acc.concat(val), []);
}
function dispatchedChangeBounds() {
    return actionDispatcher.dispatchedActions
        .filter(isChangeBounds)
        .map(a => a.newBounds)
        .reduce((acc, val) => acc.concat(val), []);
}
function isMoveAction(action) {
    return action.kind === sprotty_1.MoveCommand.KIND;
}
function isChangeBounds(action) {
    return action.kind === protocol_1.ChangeBoundsOperation.KIND;
}
//# sourceMappingURL=layout-commands.spec.js.map