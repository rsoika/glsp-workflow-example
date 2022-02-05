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
import { Action } from '@eclipse-glsp/protocol';
import { MouseListener, SModelElement } from 'sprotty';
/**
 * A mouse listener that is aware of prior mouse dragging.
 *
 * Therefore, this listener distinguishes between mouse up events after dragging and
 * mouse up events without prior dragging. Subclasses may override the methods
 * `draggingMouseUp` and/or `nonDraggingMouseUp` to react to only these specific kinds
 * of mouse up events.
 */
export declare class DragAwareMouseListener extends MouseListener {
    private _isMouseDown;
    private _isMouseDrag;
    mouseDown(target: SModelElement, event: MouseEvent): Action[];
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    mouseUp(element: SModelElement, event: MouseEvent): Action[];
    nonDraggingMouseUp(element: SModelElement, event: MouseEvent): Action[];
    draggingMouseUp(element: SModelElement, event: MouseEvent): Action[];
    get isMouseDrag(): boolean;
    get isMouseDown(): boolean;
}
//# sourceMappingURL=drag-aware-mouse-listener.d.ts.map