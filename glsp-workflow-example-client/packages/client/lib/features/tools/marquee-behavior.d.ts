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
import { Bounds, Point } from '@eclipse-glsp/protocol';
import { DrawMarqueeAction } from '../tool-feedback/marquee-tool-feedback';
export interface IMarqueeBehavior {
    readonly entireElement: boolean;
    readonly entireEdge: boolean;
}
export declare class MarqueeUtil {
    protected startPoint: Point;
    protected currentPoint: Point;
    protected marqueeBehavior: IMarqueeBehavior;
    constructor(marqueeBehavior?: IMarqueeBehavior);
    updateStartPoint(position: Point): void;
    updateCurrentPoint(position: Point): void;
    drawMarqueeAction(): DrawMarqueeAction;
    isEdgePathMarked(path: string | null): boolean;
    isEdgeMarked(points: Point[]): boolean;
    isNodeMarked(elementBounds: Bounds): boolean;
    private isEntireEdgeMarked;
    private isPartOfEdgeMarked;
    private isLineMarked;
    private lineIntersect;
    private pointInRect;
    private isElementBetweenXAxis;
    private isElementBetweenYAxis;
    private isBetween;
}
//# sourceMappingURL=marquee-behavior.d.ts.map