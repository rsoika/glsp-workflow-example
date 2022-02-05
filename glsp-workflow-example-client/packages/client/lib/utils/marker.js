"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.collectIssueMarkers = exports.MarkerPredicates = void 0;
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
var MarkerPredicates;
(function (MarkerPredicates) {
    MarkerPredicates.ALL = () => true;
    MarkerPredicates.ERRORS = (marker) => hasIssueWithSeverity(marker, protocol_1.MarkerKind.ERROR);
    MarkerPredicates.WARNINGS = (marker) => hasIssueWithSeverity(marker, protocol_1.MarkerKind.WARNING);
    MarkerPredicates.INFOS = (marker) => hasIssueWithSeverity(marker, protocol_1.MarkerKind.INFO);
    function hasIssueWithSeverity(marker, severity) {
        return marker.issues.find(issue => issue.severity === severity) !== undefined;
    }
    MarkerPredicates.hasIssueWithSeverity = hasIssueWithSeverity;
})(MarkerPredicates = exports.MarkerPredicates || (exports.MarkerPredicates = {}));
function collectIssueMarkers(root) {
    const markers = [];
    for (const child of root.children) {
        if (child instanceof sprotty_1.SIssueMarker) {
            markers.push(child);
        }
        markers.push(...collectIssueMarkers(child));
    }
    return markers;
}
exports.collectIssueMarkers = collectIssueMarkers;
//# sourceMappingURL=marker.js.map