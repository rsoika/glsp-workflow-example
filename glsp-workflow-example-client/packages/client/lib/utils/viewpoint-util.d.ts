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
import { Bounds, Point } from '@eclipse-glsp/protocol';
import { BoundsAware, Dimension, SModelElement } from 'sprotty';
/**
 * Return the position corresponding to this mouse event (Browser coordinates)
 * in the diagram coordinates system (i.e. relative to the Diagram's 0;0 point)
 *
 * This functions takes into account the following transformations:
 * - Location of the Diagram Canvas inside of the browser's page
 * - Current viewport Scroll and Zoom
 *
 * @param target
 *  An element from the diagram
 * @param mouseEvent
 *  A mouseEvent
 */
export declare function getAbsolutePosition(target: SModelElement, mouseEvent: MouseEvent): Point;
/**
 * Translates the bounds of the diagram element (local coordinates) into the diagram coordinates system
 * (i.e. relative to the Diagram's 0;0 point)
 *
 * @param target  A bounds-aware element from the diagram
 */
export declare function toAbsoluteBounds(element: SModelElement & BoundsAware): Bounds;
/**
 * Translates the position of the diagram element (local coordinates) into the diagram coordinates system
 * (i.e. relative to the Diagram's 0;0 point)
 *
 * @param target  A bounds-aware element from the diagram
 */
export declare function toAbsolutePosition(target: SModelElement & BoundsAware): Point;
/**
 * Translates the size of the diagram element (local coordinates) into the diagram coordinates system
 * (i.e. relative to the Diagram's 0;0 point)
 *
 * @param target  A bounds-aware element from the diagram
 */
export declare function toAbsoluteSize(target: SModelElement & BoundsAware): Dimension;
//# sourceMappingURL=viewpoint-util.d.ts.map