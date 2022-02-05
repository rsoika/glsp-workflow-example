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
exports.MarkerNavigatorKeyListener = exports.MarkerNavigatorContextMenuItemProvider = exports.NavigateToMarkerCommand = exports.MarkerNavigator = exports.LeftToRightTopToBottomComparator = exports.SModelElementComparator = exports.NavigateToMarkerAction = void 0;
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
const keyboard_1 = require("sprotty/lib/utils/keyboard");
const types_1 = require("../../base/types");
const marker_1 = require("../../utils/marker");
const smodel_util_1 = require("../../utils/smodel-util");
const selection_service_1 = require("../select/selection-service");
class NavigateToMarkerAction {
    constructor(direction = 'next', selectedElementIds, severities = MarkerNavigator.ALL_SEVERITIES, kind = NavigateToMarkerAction.KIND) {
        this.direction = direction;
        this.selectedElementIds = selectedElementIds;
        this.severities = severities;
        this.kind = kind;
    }
}
exports.NavigateToMarkerAction = NavigateToMarkerAction;
NavigateToMarkerAction.KIND = 'navigateToMarker';
class SModelElementComparator {
    compare(_one, _other) {
        return 0;
    }
}
exports.SModelElementComparator = SModelElementComparator;
/** Specifies the order of two selectable and bounds-aware elements left-to-right and top-to-bottom. */
let LeftToRightTopToBottomComparator = class LeftToRightTopToBottomComparator {
    compare(one, other) {
        const boundsOne = sprotty_1.findParentByFeature(one, smodel_util_1.isSelectableAndBoundsAware);
        const boundsOther = sprotty_1.findParentByFeature(other, smodel_util_1.isSelectableAndBoundsAware);
        if (boundsOne && boundsOther) {
            if (boundsOne.bounds.y !== boundsOther.bounds.y) {
                return boundsOne.bounds.y - boundsOther.bounds.y;
            }
            if (boundsOne.bounds.x !== boundsOther.bounds.x) {
                return boundsOne.bounds.x - boundsOther.bounds.x;
            }
        }
        return 0;
    }
};
LeftToRightTopToBottomComparator = __decorate([
    inversify_1.injectable()
], LeftToRightTopToBottomComparator);
exports.LeftToRightTopToBottomComparator = LeftToRightTopToBottomComparator;
/**
 * Specifies the next/previous marker in a graph model.
 *
 * This navigator uses a `MarkerComparator` to determine the order of markers. It can also return next/previous
 */
let MarkerNavigator = class MarkerNavigator {
    next(root, current, predicate = marker_1.MarkerPredicates.ALL) {
        const markers = this.getMarkers(root, predicate);
        if (current === undefined) {
            return markers.length > 0 ? markers[0] : undefined;
        }
        return markers[this.getNextIndex(current, markers) % markers.length];
    }
    previous(root, current, predicate = marker_1.MarkerPredicates.ALL) {
        const markers = this.getMarkers(root, predicate);
        if (current === undefined) {
            return markers.length > 0 ? markers[0] : undefined;
        }
        return markers[this.getPreviousIndex(current, markers) % markers.length];
    }
    getMarkers(root, predicate) {
        const markers = marker_1.collectIssueMarkers(root);
        return markers.filter(predicate).sort(this.markerComparator.compare);
    }
    getNextIndex(current, markers) {
        for (let index = 0; index < markers.length; index++) {
            if (this.markerComparator.compare(markers[index], current) > 0) {
                return index;
            }
        }
        return 0;
    }
    getPreviousIndex(current, markers) {
        for (let index = markers.length - 1; index >= 0; index--) {
            if (this.markerComparator.compare(markers[index], current) < 0) {
                return index;
            }
        }
        return markers.length - 1;
    }
};
MarkerNavigator.ALL_SEVERITIES = ['error', 'warning', 'info'];
__decorate([
    inversify_1.inject(SModelElementComparator),
    __metadata("design:type", SModelElementComparator)
], MarkerNavigator.prototype, "markerComparator", void 0);
MarkerNavigator = __decorate([
    inversify_1.injectable()
], MarkerNavigator);
exports.MarkerNavigator = MarkerNavigator;
let NavigateToMarkerCommand = class NavigateToMarkerCommand extends sprotty_1.Command {
    constructor(action) {
        super();
        this.action = action;
    }
    execute(context) {
        const root = context.root;
        const selected = this.getSelectedElements(root);
        const target = this.getTarget(selected, root);
        if (target === undefined) {
            return root;
        }
        const selectableTarget = sprotty_1.findParentByFeature(target, sprotty_1.isSelectable);
        if (selectableTarget) {
            const deselect = selected.map(e => e.id).filter(id => id !== selectableTarget.id);
            this.selectCommand = new selection_service_1.SelectCommand(new sprotty_1.SelectAction([selectableTarget.id], deselect), this.selectionService);
            this.centerCommand = new sprotty_1.CenterCommand(new protocol_1.CenterAction([selectableTarget.id]));
            this.centerCommand.execute(context);
            return this.selectCommand.execute(context);
        }
        return root;
    }
    getSelectedElements(root) {
        let selectedIds = [];
        if (this.action.selectedElementIds !== undefined && this.action.selectedElementIds.length > 0) {
            selectedIds = this.action.selectedElementIds;
        }
        else {
            selectedIds = Array.from(this.selectionService.getSelectedElementIDs());
        }
        return selectedIds.map(id => root.index.getById(id)).filter(sprotty_1.isSelectable);
    }
    getTarget(selected, root) {
        const selectedBoundsAware = selected.filter(sprotty_1.isBoundsAware).sort(this.markerComparator.compare);
        const currentTopmost = selectedBoundsAware.length > 0 ? selectedBoundsAware[0] : undefined;
        if (this.action.direction === 'previous') {
            return this.markerNavigator.previous(root, currentTopmost, marker => this.matchesSeverities(marker));
        }
        else {
            return this.markerNavigator.next(root, currentTopmost, marker => this.matchesSeverities(marker));
        }
    }
    matchesSeverities(marker) {
        return marker.issues.find(issue => this.action.severities.includes(issue.severity)) !== undefined;
    }
    undo(context) {
        if (this.selectCommand) {
            context.root = this.selectCommand.undo(context);
        }
        return this.centerCommand ? this.centerCommand.undo(context) : context.root;
    }
    redo(context) {
        if (this.selectCommand) {
            context.root = this.selectCommand.redo(context);
        }
        return this.centerCommand ? this.centerCommand.redo(context) : context.root;
    }
};
NavigateToMarkerCommand.KIND = NavigateToMarkerAction.KIND;
__decorate([
    inversify_1.inject(SModelElementComparator),
    __metadata("design:type", SModelElementComparator)
], NavigateToMarkerCommand.prototype, "markerComparator", void 0);
__decorate([
    inversify_1.inject(MarkerNavigator),
    __metadata("design:type", MarkerNavigator)
], NavigateToMarkerCommand.prototype, "markerNavigator", void 0);
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.SelectionService),
    __metadata("design:type", selection_service_1.SelectionService)
], NavigateToMarkerCommand.prototype, "selectionService", void 0);
NavigateToMarkerCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [NavigateToMarkerAction])
], NavigateToMarkerCommand);
exports.NavigateToMarkerCommand = NavigateToMarkerCommand;
let MarkerNavigatorContextMenuItemProvider = class MarkerNavigatorContextMenuItemProvider {
    getItems(root, lastMousePosition) {
        const selectedElementIds = Array.from(this.selectionService.getSelectedElementIDs());
        const hasMarkers = marker_1.collectIssueMarkers(root).length > 0;
        return Promise.resolve([
            {
                id: 'navigate',
                label: 'Go to',
                group: 'navigate',
                actions: [],
                children: [
                    {
                        id: 'next-marker',
                        label: 'Next marker',
                        group: 'marker',
                        actions: [new NavigateToMarkerAction('next', selectedElementIds)],
                        isEnabled: () => hasMarkers
                    },
                    {
                        id: 'previous-marker',
                        label: 'Previous marker',
                        group: 'marker',
                        actions: [new NavigateToMarkerAction('previous', selectedElementIds)],
                        isEnabled: () => hasMarkers
                    }
                ]
            }
        ]);
    }
};
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.SelectionService),
    __metadata("design:type", selection_service_1.SelectionService)
], MarkerNavigatorContextMenuItemProvider.prototype, "selectionService", void 0);
MarkerNavigatorContextMenuItemProvider = __decorate([
    inversify_1.injectable()
], MarkerNavigatorContextMenuItemProvider);
exports.MarkerNavigatorContextMenuItemProvider = MarkerNavigatorContextMenuItemProvider;
let MarkerNavigatorKeyListener = class MarkerNavigatorKeyListener extends sprotty_1.KeyListener {
    keyDown(_element, event) {
        if (keyboard_1.matchesKeystroke(event, 'Period', 'ctrl')) {
            return [new NavigateToMarkerAction('next')];
        }
        else if (keyboard_1.matchesKeystroke(event, 'Comma', 'ctrl')) {
            return [new NavigateToMarkerAction('previous')];
        }
        return [];
    }
};
MarkerNavigatorKeyListener = __decorate([
    inversify_1.injectable()
], MarkerNavigatorKeyListener);
exports.MarkerNavigatorKeyListener = MarkerNavigatorKeyListener;
//# sourceMappingURL=marker-navigator.js.map