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
import { Action, Bounds } from '@eclipse-glsp/protocol';
import { HoverMouseListener, IActionHandler, ICommand, SIssueMarker, SIssueSeverity, SModelElement, SModelElementSchema, SModelRootSchema } from 'sprotty';
import { GIssueMarker } from '../validation/issue-marker';
export declare class GlspHoverMouseListener extends HoverMouseListener implements IActionHandler {
    /**
     * Stops mouse over timer and remove hover feedback, if focus is lost.
     *
     * This fixes strange effects that appear if the mouse left the element via e.g. a context menu,
     * which explicitly removes the focus of the diagram.
     * @see SelectionServiceAwareContextMenuMouseListener
     * @param action should be a `FocusStateChangedAction`
     * @returns a `HoverFeedbackAction` resetting the state, if the specified action indicates lost focus
     */
    handle(action: Action): void | Action | ICommand;
    protected startMouseOverTimer(target: SModelElement, event: MouseEvent): Promise<Action>;
    protected createPopupModel(marker: GIssueMarker, bounds: Bounds): SModelRootSchema;
    protected createMarkerIssuePopup(marker: GIssueMarker): SModelElementSchema;
    protected createIssueMessage(marker: GIssueMarker): string;
    protected modifyBounds(bounds: Bounds): Bounds;
}
export declare function getSeverity(marker: SIssueMarker): SIssueSeverity;
//# sourceMappingURL=hover.d.ts.map