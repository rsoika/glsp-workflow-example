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
import { Marker } from '@eclipse-glsp/protocol';
import { SIssue, SIssueMarker, SParentElement } from 'sprotty';
export declare class GIssueMarker extends SIssueMarker {
    constructor();
}
/**
 * Retrieves the `SIssueMarker` contained by the provided model element as
 * direct child or a newly instantiated `SIssueMarker` if no child
 * `SIssueMarker` exists.
 * @param modelElement for which the `SIssueMarker` should be retrieved or created.
 * @returns the child `SIssueMarker` or a new `SIssueMarker` if no such child exists.
 */
export declare function getOrCreateSIssueMarker(modelElement: SParentElement): SIssueMarker;
/**
 * Retrieves the `SIssueMarker` contained by the provided model element as
 * direct child or `undefined` if such an `SIssueMarker` does not exist.
 * @param modelElement for which the `SIssueMarker` should be retrieved.
 * @returns the child `SIssueMarker` or `undefined` if no such child exists.
 */
export declare function getSIssueMarker(modelElement: SParentElement): SIssueMarker | undefined;
/**
 * Creates an `SIssue` with `severity` and `message` set according to
 * the `kind` and `description` of the provided `Marker`.
 * @param marker `Marker` for that an `SIssue` should be created.
 * @returns the created `SIssue`.
 */
export declare function createSIssue(marker: Marker): SIssue;
//# sourceMappingURL=issue-marker.d.ts.map