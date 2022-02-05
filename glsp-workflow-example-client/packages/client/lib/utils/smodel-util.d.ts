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
import { ElementAndRoutingPoints } from '@eclipse-glsp/protocol';
import { BoundsAware, ElementAndBounds, Selectable, SModelElement, SModelElementSchema, SModelIndex, SRoutableElement, SRoutingHandle } from 'sprotty';
export declare function getIndex(element: SModelElement): SModelIndex<SModelElement>;
export declare function forEachElement<T>(element: SModelElement, predicate: (modelElement: SModelElement) => modelElement is SModelElement & T, runnable: (modelElement: SModelElement & T) => void): void;
export declare function getMatchingElements<T>(element: SModelElement, predicate: (modelElement: SModelElement) => modelElement is SModelElement & T): (SModelElement & T)[];
export declare function hasSelectedElements(element: SModelElement): boolean;
export declare function getSelectedElementCount(element: SModelElement): number;
export declare function isNotUndefined<T>(element: T | undefined): element is T;
export declare function addCssClasses(root: SModelElement, cssClasses: string[]): void;
export declare function removeCssClasses(root: SModelElement, cssClasses: string[]): void;
export declare function isNonRoutableSelectedMovableBoundsAware(element: SModelElement): element is SelectableBoundsAware;
export declare function isNonRoutableSelectedBoundsAware(element: SModelElement): element is SelectableBoundsAware;
export declare function isRoutable<T extends SModelElement>(element: T): element is T & SRoutableElement;
export declare function isRoutingHandle(element: SModelElement | undefined): element is SRoutingHandle;
export declare function isSelectableAndBoundsAware(element: SModelElement): element is BoundsAware & Selectable & SModelElement;
export declare type SelectableBoundsAware = SModelElement & BoundsAware & Selectable;
export declare type BoundsAwareModelElement = SModelElement & BoundsAware;
export declare function toElementAndBounds(element: SModelElement & BoundsAware): ElementAndBounds;
export declare function toElementAndRoutingPoints(element: SRoutableElement): ElementAndRoutingPoints;
/**
 * Checks if the model is compatible with the passed type string.
 * (either has the same type or a subtype of this type)
 */
export declare function hasCompatibleType(input: SModelElement | SModelElementSchema | string, type: string): boolean;
export declare function getElementTypeId(input: SModelElement | SModelElementSchema | string): string;
//# sourceMappingURL=smodel-util.d.ts.map