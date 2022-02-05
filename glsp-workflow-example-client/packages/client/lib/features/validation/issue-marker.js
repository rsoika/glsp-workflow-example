"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSIssue = exports.getSIssueMarker = exports.getOrCreateSIssueMarker = exports.GIssueMarker = void 0;
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
const sprotty_1 = require("sprotty");
class GIssueMarker extends sprotty_1.SIssueMarker {
    constructor() {
        super();
        this.features = new Set(sprotty_1.SDecoration.DEFAULT_FEATURES);
    }
}
exports.GIssueMarker = GIssueMarker;
/**
 * Retrieves the `SIssueMarker` contained by the provided model element as
 * direct child or a newly instantiated `SIssueMarker` if no child
 * `SIssueMarker` exists.
 * @param modelElement for which the `SIssueMarker` should be retrieved or created.
 * @returns the child `SIssueMarker` or a new `SIssueMarker` if no such child exists.
 */
function getOrCreateSIssueMarker(modelElement) {
    let issueMarker;
    issueMarker = getSIssueMarker(modelElement);
    if (issueMarker === undefined) {
        issueMarker = new GIssueMarker();
        issueMarker.type = 'marker';
        issueMarker.issues = new Array();
        modelElement.add(issueMarker);
    }
    return issueMarker;
}
exports.getOrCreateSIssueMarker = getOrCreateSIssueMarker;
/**
 * Retrieves the `SIssueMarker` contained by the provided model element as
 * direct child or `undefined` if such an `SIssueMarker` does not exist.
 * @param modelElement for which the `SIssueMarker` should be retrieved.
 * @returns the child `SIssueMarker` or `undefined` if no such child exists.
 */
function getSIssueMarker(modelElement) {
    let issueMarker;
    for (const child of modelElement.children) {
        if (child instanceof sprotty_1.SIssueMarker) {
            issueMarker = child;
        }
    }
    return issueMarker;
}
exports.getSIssueMarker = getSIssueMarker;
/**
 * Creates an `SIssue` with `severity` and `message` set according to
 * the `kind` and `description` of the provided `Marker`.
 * @param marker `Marker` for that an `SIssue` should be created.
 * @returns the created `SIssue`.
 */
function createSIssue(marker) {
    const issue = new sprotty_1.SIssue();
    issue.message = marker.description;
    switch (marker.kind) {
        case protocol_1.MarkerKind.ERROR: {
            issue.severity = 'error';
            break;
        }
        case protocol_1.MarkerKind.INFO: {
            issue.severity = 'info';
            break;
        }
        case protocol_1.MarkerKind.WARNING: {
            issue.severity = 'warning';
            break;
        }
    }
    return issue;
}
exports.createSIssue = createSIssue;
//# sourceMappingURL=issue-marker.js.map