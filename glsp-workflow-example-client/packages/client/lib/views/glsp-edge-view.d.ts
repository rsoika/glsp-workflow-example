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
import { Point } from '@eclipse-glsp/protocol';
import { Classes, VNode } from 'snabbdom';
import { PolylineEdgeView, RenderingContext, SEdge } from 'sprotty';
export declare class GEdgeView extends PolylineEdgeView {
    render(edge: Readonly<SEdge>, context: RenderingContext): VNode;
    protected addtionalClasses(_edge: Readonly<SEdge>, _context: RenderingContext): Classes;
    protected renderLine(_edge: SEdge, segments: Point[], _context: RenderingContext): VNode;
    protected renderAdditionals(edge: SEdge, segments: Point[], _context: RenderingContext): VNode[];
    protected renderMouseHandle(segments: Point[], padding: number): VNode;
    protected createPathForSegments(segments: Point[]): string;
}
//# sourceMappingURL=glsp-edge-view.d.ts.map