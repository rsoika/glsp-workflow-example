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
import { Point } from '@eclipse-glsp/protocol';
import { BoundsAware, Dimension, ElementAndBounds, ElementMove, ModelLayoutOptions, SModelElement } from 'sprotty';
import { IMovementRestrictor } from '../features/change-bounds/movement-restrictor';
export declare function minWidth(element: SModelElement & BoundsAware): number;
export declare function minHeight(element: SModelElement & BoundsAware): number;
export declare function getLayoutOptions(element: SModelElement): ModelLayoutOptions | undefined;
export declare function isValidSize(element: SModelElement & BoundsAware, size: Dimension): boolean;
export declare function isValidMove(element: SModelElement & BoundsAware, newPosition: Point, movementRestrictor?: IMovementRestrictor): boolean;
export declare function toValidElementMove(element: SModelElement & BoundsAware, move: WriteableElementMove, movementRestrictor?: IMovementRestrictor): WriteableElementMove | undefined;
export declare function toValidElementAndBounds(element: SModelElement & BoundsAware, bounds: WriteableElementAndBounds, movementRestrictor?: IMovementRestrictor): WriteableElementAndBounds | undefined;
export interface WriteablePoint extends Point {
    x: number;
    y: number;
}
export interface WriteableElementMove extends ElementMove {
    fromPosition?: WriteablePoint;
    toPosition: WriteablePoint;
}
export interface WriteableDimension extends Dimension {
    width: number;
    height: number;
}
export interface WriteableElementAndBounds extends ElementAndBounds {
    newPosition: WriteablePoint;
    newSize: WriteableDimension;
}
//# sourceMappingURL=layout-utils.d.ts.map