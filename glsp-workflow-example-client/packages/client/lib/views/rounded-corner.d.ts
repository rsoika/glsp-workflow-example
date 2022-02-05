/********************************************************************************
 * Copyright (c) 2021 EclipseSource and others.
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
import { Dimension } from '@eclipse-glsp/protocol';
import { Hoverable, Selectable, SShapeElement } from 'sprotty';
import { CornerRadius } from '../utils/argument-utils';
export interface RoundedCorner {
    radiusX: number;
    radiusY: number;
}
export declare class RoundedCornerWrapper {
    readonly element: SShapeElement & Hoverable & Selectable;
    readonly cornerRadius: CornerRadius;
    protected _topLeftCorner: RoundedCorner;
    protected _topRightCorner: RoundedCorner;
    protected _bottomRightCorner: RoundedCorner;
    protected _bottomLeftCorner: RoundedCorner;
    constructor(element: SShapeElement & Hoverable & Selectable, cornerRadius: CornerRadius);
    get size(): Dimension;
    get topLeftCorner(): RoundedCorner;
    get topRightCorner(): RoundedCorner;
    get bottomRightCorner(): RoundedCorner;
    get bottomLeftCorner(): RoundedCorner;
}
export declare function scaledRadius(radius: number, maximalLength: number): number;
//# sourceMappingURL=rounded-corner.d.ts.map