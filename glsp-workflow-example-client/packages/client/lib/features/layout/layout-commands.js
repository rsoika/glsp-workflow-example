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
exports.AlignElementsCommand = exports.ResizeElementsCommand = exports.AlignElementsAction = exports.Select = exports.Alignment = exports.ResizeElementsAction = exports.Reduce = exports.ResizeDimension = void 0;
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
const layout_utils_1 = require("../../utils/layout-utils");
const model_1 = require("../change-bounds/model");
const selection_service_1 = require("../select/selection-service");
// eslint-disable-next-line no-shadow
var ResizeDimension;
(function (ResizeDimension) {
    ResizeDimension[ResizeDimension["Width"] = 0] = "Width";
    ResizeDimension[ResizeDimension["Height"] = 1] = "Height";
    ResizeDimension[ResizeDimension["Width_And_Height"] = 2] = "Width_And_Height";
})(ResizeDimension = exports.ResizeDimension || (exports.ResizeDimension = {}));
var Reduce;
(function (Reduce) {
    function min(...values) {
        return Math.min(...values);
    }
    Reduce.min = min;
    function max(...values) {
        return Math.max(...values);
    }
    Reduce.max = max;
    function avg(...values) {
        return values.reduce((a, b) => a + b, 0) / values.length;
    }
    Reduce.avg = avg;
    function first(...values) {
        return values[0];
    }
    Reduce.first = first;
    function last(...values) {
        return values[values.length - 1];
    }
    Reduce.last = last;
})(Reduce = exports.Reduce || (exports.Reduce = {}));
class ResizeElementsAction {
    constructor(
    /**
     * IDs of the elements that should be resized. If no IDs are given, the selected elements will be resized.
     */
    elementIds = [], 
    /**
     * Resize dimension.
     */
    dimension = ResizeDimension.Width, 
    /**
     * Function to reduce the dimension to a target dimension value, see Reduce.* for potential functions.
     */
    reductionFunction, kind = ResizeElementsCommand.KIND) {
        this.elementIds = elementIds;
        this.dimension = dimension;
        this.reductionFunction = reductionFunction;
        this.kind = kind;
    }
}
exports.ResizeElementsAction = ResizeElementsAction;
// eslint-disable-next-line no-shadow
var Alignment;
(function (Alignment) {
    Alignment[Alignment["Left"] = 0] = "Left";
    Alignment[Alignment["Center"] = 1] = "Center";
    Alignment[Alignment["Right"] = 2] = "Right";
    Alignment[Alignment["Top"] = 3] = "Top";
    Alignment[Alignment["Middle"] = 4] = "Middle";
    Alignment[Alignment["Bottom"] = 5] = "Bottom";
})(Alignment = exports.Alignment || (exports.Alignment = {}));
var Select;
(function (Select) {
    function all(elements) {
        return elements;
    }
    Select.all = all;
    function first(elements) {
        return [elements[0]];
    }
    Select.first = first;
    function last(elements) {
        return [elements[elements.length - 1]];
    }
    Select.last = last;
})(Select = exports.Select || (exports.Select = {}));
class AlignElementsAction {
    constructor(
    /**
     * IDs of the elements that should be aligned. If no IDs are given, the selected elements will be aligned.
     */
    elementIds = [], 
    /**
     * Alignment direction.
     */
    alignment = Alignment.Left, 
    /**
     * Function to selected elements that are considered during alignment calculation, see Select.* for potential functions.
     */
    selectionFunction = Select.all, kind = AlignElementsCommand.KIND) {
        this.elementIds = elementIds;
        this.alignment = alignment;
        this.selectionFunction = selectionFunction;
        this.kind = kind;
    }
}
exports.AlignElementsAction = AlignElementsAction;
let LayoutElementsCommand = class LayoutElementsCommand extends sprotty_1.Command {
    constructor(action, actionDispatcher, selectionService, movementRestrictor) {
        super();
        this.action = action;
        this.actionDispatcher = actionDispatcher;
        this.selectionService = selectionService;
        this.movementRestrictor = movementRestrictor;
    }
    getActionElements(context) {
        const model = context.root;
        const elementIDs = this.action.elementIds;
        if (elementIDs.length === 0) {
            // collect the selected elements from the selection service (selection order is kept by service)
            this.selectionService.getSelectedElementIDs().forEach(elementID => elementIDs.push(elementID));
        }
        const boundsAwareElements = [];
        elementIDs.forEach(id => {
            const element = model.index.getById(id);
            if (element && this.isActionElement(element)) {
                boundsAwareElements.push(element);
            }
        });
        return boundsAwareElements;
    }
    dispatchAction(action) {
        this.actionDispatcher.dispatch(action);
    }
    dispatchActions(actions) {
        this.actionDispatcher.dispatchAll(actions);
    }
};
LayoutElementsCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __param(1, inversify_1.inject(sprotty_1.TYPES.IActionDispatcher)),
    __param(2, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
    __param(3, inversify_1.inject(types_1.GLSP_TYPES.IMovementRestrictor)), __param(3, inversify_1.optional()),
    __metadata("design:paramtypes", [Object, Object, selection_service_1.SelectionService, Object])
], LayoutElementsCommand);
let ResizeElementsCommand = class ResizeElementsCommand extends LayoutElementsCommand {
    constructor(action, actionDispatcher, selectionService, movementRestrictor) {
        super(action, actionDispatcher, selectionService, movementRestrictor);
        this.action = action;
        this.actionDispatcher = actionDispatcher;
        this.selectionService = selectionService;
        this.movementRestrictor = movementRestrictor;
    }
    isActionElement(element) {
        return model_1.isResizable(element);
    }
    execute(context) {
        const elements = this.getActionElements(context);
        if (elements.length > 1) {
            switch (this.action.dimension) {
                case ResizeDimension.Width:
                    this.resizeWidth(elements);
                    break;
                case ResizeDimension.Height:
                    this.resizeHeight(elements);
                    break;
                case ResizeDimension.Width_And_Height:
                    this.resizeWidthAndHeight(elements);
                    break;
            }
        }
        return context.root;
    }
    resizeWidth(elements) {
        const targetWidth = this.action.reductionFunction(...elements.map(element => element.bounds.width));
        this.dispatchResizeActions(elements, (element, bounds) => {
            // resize around center
            const halfDiffWidth = 0.5 * (targetWidth - element.bounds.width);
            bounds.newPosition.x = element.bounds.x - halfDiffWidth;
            bounds.newSize.width = targetWidth;
        });
    }
    resizeHeight(elements) {
        const targetHeight = this.action.reductionFunction(...elements.map(element => element.bounds.height));
        this.dispatchResizeActions(elements, (element, bounds) => {
            // resize around middle
            const halfDiffHeight = 0.5 * (targetHeight - element.bounds.height);
            bounds.newPosition.y = element.bounds.y - halfDiffHeight;
            bounds.newSize.height = targetHeight;
        });
    }
    resizeWidthAndHeight(elements) {
        const targetWidth = this.action.reductionFunction(...elements.map(element => element.bounds.width));
        const targetHeight = this.action.reductionFunction(...elements.map(element => element.bounds.height));
        this.dispatchResizeActions(elements, (element, bounds) => {
            // resize around center and middle
            const halfDiffWidth = 0.5 * (targetWidth - element.bounds.width);
            const halfDiffHeight = 0.5 * (targetHeight - element.bounds.height);
            bounds.newPosition.x = element.bounds.x - halfDiffWidth;
            bounds.newPosition.y = element.bounds.y - halfDiffHeight;
            bounds.newSize.width = targetWidth;
            bounds.newSize.height = targetHeight;
        });
    }
    dispatchResizeActions(elements, change) {
        const elementAndBounds = []; // client- and server-side resize
        elements.forEach(element => {
            const elementChange = this.createElementAndBounds(element, change);
            if (elementChange) {
                // simply skip invalid changes
                elementAndBounds.push(elementChange);
            }
        });
        this.dispatchActions([new sprotty_1.SetBoundsAction(elementAndBounds), new protocol_1.ChangeBoundsOperation(elementAndBounds)]);
    }
    createElementAndBounds(element, change) {
        const bounds = {
            elementId: element.id,
            newPosition: {
                x: element.bounds.x,
                y: element.bounds.y
            },
            newSize: {
                width: element.bounds.width,
                height: element.bounds.height
            }
        };
        change(element, bounds);
        return layout_utils_1.toValidElementAndBounds(element, bounds, this.movementRestrictor);
    }
    undo(context) {
        // we dispatch another action which can be undone, so no explicit implementation necessary
        return context.root;
    }
    redo(context) {
        // we dispatch another action which can be redone, so no explicit implementation necessary
        return context.root;
    }
};
ResizeElementsCommand.KIND = 'layout:resize';
ResizeElementsCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __param(1, inversify_1.inject(sprotty_1.TYPES.IActionDispatcher)),
    __param(2, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
    __param(3, inversify_1.inject(types_1.GLSP_TYPES.IMovementRestrictor)), __param(3, inversify_1.optional()),
    __metadata("design:paramtypes", [ResizeElementsAction, Object, selection_service_1.SelectionService, Object])
], ResizeElementsCommand);
exports.ResizeElementsCommand = ResizeElementsCommand;
let AlignElementsCommand = class AlignElementsCommand extends LayoutElementsCommand {
    constructor(action, actionDispatcher, selectionService, movementRestrictor) {
        super(action, actionDispatcher, selectionService, movementRestrictor);
        this.action = action;
        this.actionDispatcher = actionDispatcher;
        this.selectionService = selectionService;
        this.movementRestrictor = movementRestrictor;
    }
    isActionElement(element) {
        return model_1.isBoundsAwareMoveable(element);
    }
    execute(context) {
        const elements = this.getActionElements(context);
        if (elements.length > 1) {
            switch (this.action.alignment) {
                case Alignment.Left:
                    this.alignLeft(elements);
                    break;
                case Alignment.Center:
                    this.alignCenter(elements);
                    break;
                case Alignment.Right:
                    this.alignRight(elements);
                    break;
                case Alignment.Top:
                    this.alignTop(elements);
                    break;
                case Alignment.Middle:
                    this.alignMiddle(elements);
                    break;
                case Alignment.Bottom:
                    this.alignBottom(elements);
                    break;
            }
        }
        return context.root;
    }
    alignLeft(elements) {
        const calculationElements = this.action.selectionFunction(elements);
        const minX = calculationElements.map(element => element.bounds.x).reduce((a, b) => Math.min(a, b));
        this.dispatchAlignActions(elements, (_, move) => (move.toPosition.x = minX));
    }
    alignCenter(elements) {
        const calculationElements = this.action.selectionFunction(elements);
        const minX = calculationElements.map(element => element.bounds.x).reduce((a, b) => Math.min(a, b));
        const maxX = calculationElements.map(element => element.bounds.x + element.bounds.width).reduce((a, b) => Math.max(a, b));
        const diffX = maxX - minX;
        const centerX = minX + 0.5 * diffX;
        this.dispatchAlignActions(elements, (element, move) => (move.toPosition.x = centerX - 0.5 * element.bounds.width));
    }
    alignRight(elements) {
        const calculationElements = this.action.selectionFunction(elements);
        const maxX = calculationElements.map(element => element.bounds.x + element.bounds.width).reduce((a, b) => Math.max(a, b));
        this.dispatchAlignActions(elements, (element, move) => (move.toPosition.x = maxX - element.bounds.width));
    }
    alignTop(elements) {
        const calculationElements = this.action.selectionFunction(elements);
        const minY = calculationElements.map(element => element.bounds.y).reduce((a, b) => Math.min(a, b));
        this.dispatchAlignActions(elements, (_, move) => (move.toPosition.y = minY));
    }
    alignMiddle(elements) {
        const calculationElements = this.action.selectionFunction(elements);
        const minY = calculationElements.map(element => element.bounds.y).reduce((a, b) => Math.min(a, b));
        const maxY = calculationElements.map(element => element.bounds.y + element.bounds.height).reduce((a, b) => Math.max(a, b));
        const diffY = maxY - minY;
        const middleY = minY + 0.5 * diffY;
        this.dispatchAlignActions(elements, (element, move) => (move.toPosition.y = middleY - 0.5 * element.bounds.height));
    }
    alignBottom(elements) {
        const calculationElements = this.action.selectionFunction(elements);
        const maxY = calculationElements.map(element => element.bounds.y + element.bounds.height).reduce((a, b) => Math.max(a, b));
        this.dispatchAlignActions(elements, (element, move) => (move.toPosition.y = maxY - element.bounds.height));
    }
    dispatchAlignActions(elements, change) {
        const moves = []; // client-side move
        const elementAndBounds = []; // server-side move
        elements.forEach(element => {
            const move = this.createElementMove(element, change);
            if (move) {
                // simply skip invalid changes
                moves.push(move);
                const elementAndBound = this.createElementAndBounds(element, move);
                elementAndBounds.push(elementAndBound);
            }
        });
        this.dispatchActions([new sprotty_1.MoveAction(moves), new protocol_1.ChangeBoundsOperation(elementAndBounds)]);
    }
    createElementMove(element, change) {
        const move = {
            elementId: element.id,
            fromPosition: {
                x: element.bounds.x,
                y: element.bounds.y
            },
            toPosition: {
                x: element.bounds.x,
                y: element.bounds.y
            }
        };
        change(element, move);
        return layout_utils_1.toValidElementMove(element, move, this.movementRestrictor);
    }
    createElementAndBounds(element, move) {
        return {
            elementId: element.id,
            newPosition: {
                x: move.toPosition.x,
                y: move.toPosition.y
            },
            newSize: {
                width: element.bounds.width,
                height: element.bounds.height
            }
        };
    }
    undo(context) {
        // we dispatch another action which can be undone, so no explicit implementation necessary
        return context.root;
    }
    redo(context) {
        // we dispatch another action which can be redone, so no explicit implementation necessary
        return context.root;
    }
};
AlignElementsCommand.KIND = 'layout:align';
AlignElementsCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __param(1, inversify_1.inject(sprotty_1.TYPES.IActionDispatcher)),
    __param(2, inversify_1.inject(types_1.GLSP_TYPES.SelectionService)),
    __param(3, inversify_1.inject(types_1.GLSP_TYPES.IMovementRestrictor)), __param(3, inversify_1.optional()),
    __metadata("design:paramtypes", [AlignElementsAction, Object, selection_service_1.SelectionService, Object])
], AlignElementsCommand);
exports.AlignElementsCommand = AlignElementsCommand;
//# sourceMappingURL=layout-commands.js.map