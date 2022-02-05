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
import { Action } from '@eclipse-glsp/protocol';
import { BoundsAware, KeyListener, SModelElement, SModelRoot } from 'sprotty';
import { DOMHelper } from 'sprotty/lib/base/views/dom-helper';
import { DragAwareMouseListener } from '../../base/drag-aware-mouse-listener';
import { BaseGLSPTool } from './base-glsp-tool';
import { IMarqueeBehavior, MarqueeUtil } from './marquee-behavior';
export declare class MarqueeMouseTool extends BaseGLSPTool {
    static ID: string;
    protected domHelper: DOMHelper;
    protected marqueeBehavior: IMarqueeBehavior;
    protected marqueeMouseListener: MarqueeMouseListener;
    protected shiftKeyListener: ShiftKeyListener;
    get id(): string;
    enable(): void;
    disable(): void;
}
export declare class MarqueeMouseListener extends DragAwareMouseListener {
    protected domHelper: DOMHelper;
    protected marqueeUtil: MarqueeUtil;
    protected nodes: (SModelElement & BoundsAware)[];
    protected edges: SVGGElement[];
    protected previouslySelected: string[];
    protected isActive: boolean;
    constructor(domHelper: DOMHelper, root: SModelRoot, marqueeBehavior: IMarqueeBehavior | undefined);
    mouseDown(target: SModelElement, event: MouseEvent): Action[];
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    mouseUp(target: SModelElement, event: MouseEvent): Action[];
    isEdgeMarked(element: SVGElement): boolean;
}
export declare class ShiftKeyListener extends KeyListener {
    keyUp(element: SModelElement, event: KeyboardEvent): Action[];
}
//# sourceMappingURL=marquee-mouse-tool.d.ts.map