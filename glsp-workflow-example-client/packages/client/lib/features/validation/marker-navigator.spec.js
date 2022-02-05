"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
/* eslint-disable import/no-deprecated,no-unused-expressions */
const chai_1 = require("chai");
const inversify_1 = require("inversify");
require("mocha");
require("reflect-metadata");
const sprotty_1 = require("sprotty");
const di_config_1 = require("sprotty/lib/base/di.config");
const sgraph_factory_1 = require("sprotty/lib/graph/sgraph-factory");
const di_config_2 = require("./di.config");
const marker_navigator_1 = require("./marker-navigator");
describe('MarkerNavigator', () => {
    const container = new inversify_1.Container();
    container.load(di_config_1.default, sprotty_1.decorationModule, di_config_2.markerNavigatorModule);
    container.rebind(sprotty_1.TYPES.IModelFactory).to(sgraph_factory_1.SGraphFactory).inSingletonScope();
    const graphFactory = container.get(sprotty_1.TYPES.IModelFactory);
    const markerNavigator = container.get(marker_navigator_1.MarkerNavigator);
    const rootWithoutAnyMarkers = graphFactory.createRoot({
        id: 'root',
        type: 'graph',
        children: [
            {
                id: '1',
                type: 'node'
            }
        ]
    });
    const rootWithMarkers = graphFactory.createRoot({
        id: 'root',
        type: 'graph',
        children: [
            {
                id: 'bottom-right',
                type: 'node'
            },
            {
                id: 'top-right',
                type: 'node'
            },
            {
                id: 'top-left',
                type: 'node'
            },
            {
                id: 'bottom-left',
                type: 'node'
            }
        ]
    });
    const elementTopLeft = rootWithMarkers.children[2];
    elementTopLeft.bounds = { width: 10, height: 10, x: 100, y: 100 };
    const elementTopRight = rootWithMarkers.children[1];
    elementTopRight.bounds = { width: 10, height: 10, x: 200, y: 100 };
    const elementBottomLeft = rootWithMarkers.children[3];
    elementBottomLeft.bounds = { width: 10, height: 10, x: 100, y: 200 };
    const elementBottomRight = rootWithMarkers.children[0];
    elementBottomRight.bounds = { width: 10, height: 10, x: 200, y: 200 };
    beforeEach('clear issue marker', () => {
        [elementTopLeft, elementTopRight, elementBottomLeft, elementBottomRight].forEach(clearMarker);
    });
    it('next(undefined) without any markers returns undefined', () => {
        chai_1.expect(markerNavigator.next(rootWithoutAnyMarkers)).to.be.undefined;
    });
    it('previous(undefined) without any markers returns undefined', () => {
        chai_1.expect(markerNavigator.previous(rootWithoutAnyMarkers)).to.be.undefined;
    });
    it('next(undefined) with one marker returns the one marker', () => {
        const marker = setIssues(elementTopLeft, [{ message: 'msg', severity: 'error' }]);
        const next = markerNavigator.next(rootWithMarkers);
        chai_1.expect(next).to.eql(marker);
    });
    it('next(firstMarker) with only one marker returns again the first marker', () => {
        const marker = setIssues(elementTopLeft, [{ message: 'msg', severity: 'error' }]);
        const next = markerNavigator.next(rootWithMarkers, marker);
        chai_1.expect(next).to.eql(marker);
        // and again and again
        const nextNext = markerNavigator.next(rootWithMarkers, next);
        chai_1.expect(nextNext).to.eql(marker);
    });
    it('previous(firstMarker) with only one marker returns again the first marker', () => {
        const marker = setIssues(elementTopLeft, [{ message: 'msg', severity: 'error' }]);
        const previous = markerNavigator.previous(rootWithMarkers, marker);
        chai_1.expect(previous).to.eql(marker);
        // and again and again
        const previousPrevious = markerNavigator.previous(rootWithMarkers, previous);
        chai_1.expect(previousPrevious).to.eql(marker);
    });
    it('next(firstMarker) with two marker returns second marker then again first marker', () => {
        const marker1 = setIssues(elementTopLeft, [{ message: 'msg', severity: 'error' }]);
        const marker2 = setIssues(elementTopRight, [{ message: 'msg', severity: 'error' }]);
        const next = markerNavigator.next(rootWithMarkers, marker1);
        chai_1.expect(next).to.eql(marker2);
        // and again and again
        const nextNext = markerNavigator.next(rootWithMarkers, next);
        chai_1.expect(nextNext).to.eql(marker1);
    });
    it('previous(firstMarker) with two marker returns second marker then again first marker', () => {
        const marker1 = setIssues(elementTopLeft, [{ message: 'msg', severity: 'error' }]);
        const marker2 = setIssues(elementTopRight, [{ message: 'msg', severity: 'error' }]);
        const next = markerNavigator.previous(rootWithMarkers, marker1);
        chai_1.expect(next).to.eql(marker2);
        // and again and again
        const nextNext = markerNavigator.previous(rootWithMarkers, next);
        chai_1.expect(nextNext).to.eql(marker1);
    });
    it('returns markers in the order left-to-right, top-to-bottom with next()', () => {
        const marker1 = setIssues(elementTopLeft, [{ message: 'msg', severity: 'error' }]);
        const marker2 = setIssues(elementTopRight, [{ message: 'msg', severity: 'error' }]);
        const marker3 = setIssues(elementBottomLeft, [{ message: 'msg', severity: 'error' }]);
        const marker4 = setIssues(elementBottomRight, [{ message: 'msg', severity: 'error' }]);
        const found1 = markerNavigator.next(rootWithMarkers);
        const found2 = markerNavigator.next(rootWithMarkers, found1);
        const found3 = markerNavigator.next(rootWithMarkers, found2);
        const found4 = markerNavigator.next(rootWithMarkers, found3);
        const found5 = markerNavigator.next(rootWithMarkers, found4);
        chai_1.expect(found1).to.eql(marker1);
        chai_1.expect(found2).to.eql(marker2);
        chai_1.expect(found3).to.eql(marker3);
        chai_1.expect(found4).to.eql(marker4);
        chai_1.expect(found5).to.eql(marker1);
    });
    it('returns markers in the order left-to-right, top-to-bottom with previous()', () => {
        const marker1 = setIssues(elementTopLeft, [{ message: 'msg', severity: 'error' }]);
        const marker2 = setIssues(elementTopRight, [{ message: 'msg', severity: 'error' }]);
        const marker3 = setIssues(elementBottomLeft, [{ message: 'msg', severity: 'error' }]);
        const marker4 = setIssues(elementBottomRight, [{ message: 'msg', severity: 'error' }]);
        const found1 = markerNavigator.previous(rootWithMarkers);
        const found2 = markerNavigator.previous(rootWithMarkers, found1);
        const found3 = markerNavigator.previous(rootWithMarkers, found2);
        const found4 = markerNavigator.previous(rootWithMarkers, found3);
        const found5 = markerNavigator.previous(rootWithMarkers, found4);
        chai_1.expect(found1).to.eql(marker1);
        chai_1.expect(found2).to.eql(marker4);
        chai_1.expect(found3).to.eql(marker3);
        chai_1.expect(found4).to.eql(marker2);
        chai_1.expect(found5).to.eql(marker1);
    });
});
function clearMarker(elem) {
    elem.children.filter(isMarker).forEach(marker => elem.remove(marker));
}
function setIssues(elem, issues) {
    const marker = getOrCreateMarker(elem);
    marker.issues = issues;
    return marker;
}
function getOrCreateMarker(elem) {
    const marker = findMarker(elem);
    if (marker instanceof sprotty_1.SIssueMarker) {
        return marker;
    }
    return createMarker(elem);
}
function findMarker(elem) {
    return elem.children.find(isMarker);
}
function isMarker(element) {
    return element instanceof sprotty_1.SIssueMarker;
}
function createMarker(elem) {
    const newMarker = new sprotty_1.SIssueMarker();
    newMarker.type = 'marker';
    newMarker.id = `${elem.id}_marker`;
    elem.add(newMarker);
    return newMarker;
}
//# sourceMappingURL=marker-navigator.spec.js.map