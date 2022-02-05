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
import { Point } from '@eclipse-glsp/protocol';
import { VNode } from 'snabbdom';
import { IView, RenderingContext, SModelElement } from 'sprotty';
import { SResizeHandle } from '../change-bounds/model';
/**
 * This view is used for the invisible end of the feedback edge.
 * A feedback edge is shown as a visual feedback when creating edges.
 */
export declare class FeedbackEdgeEndView implements IView {
    render(model: Readonly<SModelElement>, context: RenderingContext): VNode;
}
export declare class SResizeHandleView implements IView {
    render(handle: SResizeHandle, context: RenderingContext): VNode;
    protected getPosition(handle: SResizeHandle): Point | undefined;
    getRadius(): number;
}
//# sourceMappingURL=view.d.ts.map