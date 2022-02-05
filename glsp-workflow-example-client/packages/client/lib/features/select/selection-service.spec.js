"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const types_1 = require("../../base/types");
const selection_service_1 = require("./selection-service");
let MockFeedbackActionDispatcher = class MockFeedbackActionDispatcher {
    constructor() {
        this.feedbackEmitters = new Map();
    }
    registerFeedback(feedbackEmitter, actions) {
        this.feedbackEmitters.set(feedbackEmitter, actions);
    }
    deregisterFeedback(feedbackEmitter, actions) {
        this.feedbackEmitters.delete(feedbackEmitter);
    }
    getRegisteredFeedback() {
        const result = [];
        this.feedbackEmitters.forEach((value, key) => result.push(...value));
        return result;
    }
    getSingleFeedbackAction() {
        const actions = this.getRegisteredFeedback();
        return actions.length === 1 ? actions[0] : undefined;
    }
};
MockFeedbackActionDispatcher = __decorate([
    inversify_1.injectable()
], MockFeedbackActionDispatcher);
class MockSelectionListener {
    constructor() {
        this.called = 0;
        this.selectedElements = [];
    }
    selectionChanged(newRoot, selectedElements) {
        this.called++;
        this.root = newRoot;
        this.selectedElements = selectedElements;
    }
    getRoot() {
        return this.root;
    }
    getSelectedElements() {
        return this.selectedElements;
    }
    getCalled() {
        return this.called;
    }
}
function createContainer() {
    const container = new inversify_1.Container();
    container.load(sprotty_1.defaultModule);
    container.rebind(sprotty_1.TYPES.IModelFactory).to(sprotty_1.SGraphFactory).inSingletonScope();
    container.bind(types_1.GLSP_TYPES.IFeedbackActionDispatcher).to(MockFeedbackActionDispatcher).inSingletonScope();
    container.bind(selection_service_1.SelectionService).toSelf().inSingletonScope();
    container.bind(types_1.GLSP_TYPES.SelectionService).toService(selection_service_1.SelectionService);
    return container;
}
describe('SelectionService', () => {
    let graphFactory;
    let root;
    let selectionService;
    let feedbackDispatcher;
    beforeEach(() => {
        const container = createContainer();
        graphFactory = container.get(sprotty_1.TYPES.IModelFactory);
        root = createRoot('node1', 'node2', 'node3', 'node4', 'node5');
        selectionService = container.get(types_1.GLSP_TYPES.SelectionService);
        feedbackDispatcher = container.get(types_1.GLSP_TYPES.IFeedbackActionDispatcher);
    });
    describe('Initial State', () => {
        it('On creation nothing should be selected and no feedback should be dispatched.', () => {
            assertSelectionAndFeedback([], []);
        });
    });
    describe('Single Selection', () => {
        it('Selecting a single element should be tracked correctly and trigger feedback.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1'], []);
            assertSelectionAndFeedback(['node1'], []);
        });
        it('Selecting the same element twice in one operation should not make a difference.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1', 'node1'], []);
            assertSelectionAndFeedback(['node1'], []);
        });
        it('Selecting and then deselecting the same element should result in an empty selection.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1'], []);
            selectionService.updateSelection(root, [], ['node1']);
            assertSelectionAndFeedback([], ['node1']);
        });
        it('Selecting and deselecting the same element in the same operation should have no effect.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1'], ['node1']);
            assertSelectionAndFeedback([], []);
        });
        it('Selecting and deselecting not-existing nodes should have no effect.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['not-existing'], []);
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, [], ['not-existing']);
            assertSelectionAndFeedback([], []);
        });
    });
    describe('Multi Selection', () => {
        it('Selecting multiple elements should be tracked correctly and trigger feedback.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1', 'node2'], []);
            assertSelectionAndFeedback(['node1', 'node2'], []);
        });
        it('Selecting multiple elements should have the selection order in the dispatched feedback.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node2', 'node1'], []);
            chai_1.expect(() => assertSelectionAndFeedback(['node1', 'node2'], [])).to.throw(chai_1.AssertionError, 'ordered members');
        });
        it('Selecting the same elements twice in one operation should not make a difference.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1', 'node1', 'node2', 'node2'], []);
            assertSelectionAndFeedback(['node1', 'node2'], []);
        });
        it('Selecting and then deselecting the same elements should result in an empty selection.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1', 'node2'], []);
            selectionService.updateSelection(root, [], ['node1', 'node2']);
            assertSelectionAndFeedback([], ['node1', 'node2']);
        });
        it('Selecting and deselecting the same elements in one operation should have no effect.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1', 'node2'], ['node1', 'node2']);
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1', 'node2', 'node3'], ['node1', 'node2']);
            assertSelectionAndFeedback(['node3'], []);
        });
        it('Selecting three elements and deselecting one should result in two selected and one deselected element.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1', 'node2', 'node3'], []);
            assertSelectionAndFeedback(['node1', 'node2', 'node3'], []);
            selectionService.updateSelection(root, [], ['node2']);
            assertSelectionAndFeedback(['node1', 'node3'], ['node2']);
        });
        it('A series of selection and deselection operations should be tracked correctly.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1', 'node2', 'node3'], []);
            assertSelectionAndFeedback(['node1', 'node2', 'node3'], []);
            selectionService.updateSelection(root, ['node4'], ['node2']);
            assertSelectionAndFeedback(['node1', 'node3', 'node4'], ['node2']);
            selectionService.updateSelection(root, ['node3', 'node1'], ['node2', 'node4']);
            assertSelectionAndFeedback(['node1', 'node3'], ['node4']);
            selectionService.updateSelection(root, ['node3'], ['node3']);
            assertSelectionAndFeedback(['node1', 'node3'], ['node4']);
        });
    });
    describe('Changing Root', () => {
        it('Changing root deselects all selected elements if there are no matching elements.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1'], []);
            assertSelectionAndFeedback(['node1'], []);
            const newRoot = createRoot('newNode1', 'newNode2', 'newNode3');
            selectionService.modelRootChanged(newRoot);
            assertSelectionAndFeedback([], ['node1']);
        });
        it('Changing root keeps selected elements if there are matching elements.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1', 'node2'], []);
            assertSelectionAndFeedback(['node1', 'node2'], []);
            const newRoot = createRoot('node1', 'newNode2', 'newNode3');
            selectionService.modelRootChanged(newRoot);
            assertSelectionAndFeedback(['node1'], ['node2']);
        });
        it('Changing root with new selection correctly selects matchting elements and deselects not matching elements.', () => {
            assertSelectionAndFeedback([], []);
            selectionService.updateSelection(root, ['node1', 'node2'], []);
            assertSelectionAndFeedback(['node1', 'node2'], []);
            const newRoot = createRoot('newNode1', 'newNode2', 'newNode3');
            selectionService.updateSelection(newRoot, ['newNode1'], []);
            assertSelectionAndFeedback(['newNode1'], ['node1', 'node2']);
        });
    });
    describe('Listeners', () => {
        it('A registered listener should be notified of a single selection change.', () => {
            const listener = new MockSelectionListener();
            selectionService.register(listener);
            assertListener(listener, undefined, [], 0);
            selectionService.updateSelection(root, ['node1', 'node1'], []);
            assertListener(listener, root, ['node1'], 1);
        });
        it('A registered listener should be notified of a multi-selection change.', () => {
            const listener = new MockSelectionListener();
            selectionService.register(listener);
            assertListener(listener, undefined, [], 0);
            selectionService.updateSelection(root, ['node1', 'node2', 'node3'], []);
            assertListener(listener, root, ['node1', 'node2', 'node3'], 1);
        });
        it('A registered listener should be notified of series of selection changes.', () => {
            const listener = new MockSelectionListener();
            selectionService.register(listener);
            assertListener(listener, undefined, [], 0);
            selectionService.updateSelection(root, ['node1'], []);
            assertListener(listener, root, ['node1'], 1);
            selectionService.updateSelection(root, ['node2'], ['node1']);
            assertListener(listener, root, ['node2'], 2);
            selectionService.updateSelection(root, ['node3', 'node4'], []);
            assertListener(listener, root, ['node2', 'node3', 'node4'], 3);
            selectionService.updateSelection(root, [], ['node4']);
            assertListener(listener, root, ['node2', 'node3'], 4);
        });
        it('A registered listener should receive the selected elements in the right order.', () => {
            const listener = new MockSelectionListener();
            selectionService.register(listener);
            assertListener(listener, undefined, [], 0);
            selectionService.updateSelection(root, ['node2', 'node1'], []);
            chai_1.expect(() => assertListener(listener, root, ['node1', 'node2'], 1)).to.throw(chai_1.AssertionError, 'ordered members');
        });
        it('A registered listener should be notified of root changes.', () => {
            const listener = new MockSelectionListener();
            selectionService.register(listener);
            assertListener(listener, undefined, [], 0);
            selectionService.updateSelection(root, [], []);
            assertListener(listener, root, [], 1);
            const newRoot = createRoot('node1', 'newNode2', 'newNode3');
            selectionService.updateSelection(newRoot, [], []);
            assertListener(listener, newRoot, [], 2);
        });
        it('Registering an already registered listener should have no effect.', () => {
            const listener = new MockSelectionListener();
            selectionService.register(listener);
            selectionService.register(listener);
            selectionService.register(listener);
            assertListener(listener, undefined, [], 0);
            selectionService.updateSelection(root, ['node1', 'node2', 'node3'], []);
            assertListener(listener, root, ['node1', 'node2', 'node3'], 1);
            selectionService.register(listener);
            selectionService.updateSelection(root, [], ['node2']);
            assertListener(listener, root, ['node1', 'node3'], 2);
        });
        it('Selecting the same elements consecutively should not trigger a listener update.', () => {
            const listener = new MockSelectionListener();
            selectionService.register(listener);
            assertListener(listener, undefined, [], 0);
            selectionService.updateSelection(root, ['node1'], []);
            assertListener(listener, root, ['node1'], 1);
            selectionService.updateSelection(root, ['node1'], []);
            assertListener(listener, root, ['node1'], 1);
        });
        it('Selecting a not-existing elements should not trigger a listener update.', () => {
            const listener = new MockSelectionListener();
            selectionService.register(listener);
            assertListener(listener, undefined, [], 0);
            selectionService.updateSelection(root, ['node1'], []);
            assertListener(listener, root, ['node1'], 1);
            selectionService.updateSelection(root, ['not-existing'], []);
            assertListener(listener, root, ['node1'], 1);
        });
        it('All registered listeners should be called on selection changes.', () => {
            const listener = new MockSelectionListener();
            const listener2 = new MockSelectionListener();
            selectionService.register(listener);
            selectionService.register(listener2);
            assertListener(listener, undefined, [], 0);
            assertListener(listener2, undefined, [], 0);
            selectionService.updateSelection(root, ['node1'], []);
            assertListener(listener, root, ['node1'], 1);
            assertListener(listener2, root, ['node1'], 1);
            selectionService.updateSelection(root, ['node2'], ['node1']);
            assertListener(listener, root, ['node2'], 2);
            assertListener(listener2, root, ['node2'], 2);
            selectionService.updateSelection(root, ['node3', 'node4'], []);
            assertListener(listener, root, ['node2', 'node3', 'node4'], 3);
            assertListener(listener2, root, ['node2', 'node3', 'node4'], 3);
            selectionService.updateSelection(root, [], ['node4']);
            assertListener(listener, root, ['node2', 'node3'], 4);
            assertListener(listener2, root, ['node2', 'node3'], 4);
        });
        it('A deregistered listener should not receive further updates.', () => {
            const listener = new MockSelectionListener();
            selectionService.register(listener);
            assertListener(listener, undefined, [], 0);
            selectionService.updateSelection(root, ['node1'], []);
            assertListener(listener, root, ['node1'], 1);
            selectionService.deregister(listener);
            selectionService.updateSelection(root, ['node2'], ['node1']);
            assertListener(listener, root, ['node1'], 1);
            selectionService.updateSelection(root, ['node3', 'node4'], []);
            assertListener(listener, root, ['node1'], 1);
            selectionService.updateSelection(root, [], ['node4']);
            assertListener(listener, root, ['node1'], 1);
            const newRoot = createRoot('node1', 'newNode2', 'newNode3');
            selectionService.updateSelection(newRoot, [], []);
            assertListener(listener, root, ['node1'], 1);
        });
    });
    function createRoot(...nodes) {
        const children = [];
        nodes.forEach(node => children.push({ id: node, type: 'node:circle' }));
        return graphFactory.createRoot({
            id: 'selection-service-spec',
            type: 'graph',
            children: children
        });
    }
    function assertSelectionAndFeedback(expectedSelection, expectedDeselection) {
        assertSelectionService(expectedSelection);
        assertDispatchedFeedback(expectedSelection, expectedDeselection);
    }
    function assertSelectionService(expectedSelection) {
        chai_1.expect(selectionService.isSingleSelection()).to.equal(expectedSelection.length === 1);
        chai_1.expect(selectionService.isMultiSelection()).to.equal(expectedSelection.length > 1);
        chai_1.expect(selectionService.hasSelectedElements()).to.equal(expectedSelection.length > 0);
        chai_1.expect(selectionService.getSelectedElementIDs()).to.have.lengthOf(expectedSelection.length);
        if (expectedSelection.length > 0) {
            chai_1.expect(selectionService.getSelectedElementIDs()).to.have.all.keys(...expectedSelection);
        }
    }
    function assertDispatchedFeedback(expectedSelection, expectedDeselection) {
        // a single feedback action reflects aggregated selection/deselection
        const hasFeedback = expectedSelection.length > 0 || expectedDeselection.length > 0;
        if (hasFeedback) {
            chai_1.expect(feedbackDispatcher.getRegisteredFeedback()).to.have.lengthOf(1);
            chai_1.expect(feedbackDispatcher.getSingleFeedbackAction().selectedElementsIDs).to.have.lengthOf(expectedSelection.length);
            chai_1.expect(feedbackDispatcher.getSingleFeedbackAction().selectedElementsIDs).to.have.ordered.members(expectedSelection);
            chai_1.expect(feedbackDispatcher.getSingleFeedbackAction().deselectedElementsIDs).to.have.lengthOf(expectedDeselection.length);
            chai_1.expect(feedbackDispatcher.getSingleFeedbackAction().deselectedElementsIDs).to.have.ordered.members(expectedDeselection);
        }
        else {
            chai_1.expect(feedbackDispatcher.getRegisteredFeedback()).to.have.lengthOf(0);
            chai_1.expect(feedbackDispatcher.getSingleFeedbackAction()).to.be.undefined;
        }
    }
    function assertListener(listener, expectedRoot, expectedSelection, expectedCalled) {
        chai_1.expect(listener.getRoot()).to.equal(expectedRoot);
        chai_1.expect(listener.getSelectedElements()).to.have.lengthOf(expectedSelection.length);
        chai_1.expect(listener.getSelectedElements()).to.have.ordered.members(expectedSelection);
        chai_1.expect(listener.getCalled()).to.equal(expectedCalled);
    }
});
//# sourceMappingURL=selection-service.spec.js.map