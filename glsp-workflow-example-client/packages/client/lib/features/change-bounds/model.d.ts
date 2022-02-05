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
import { BoundsAware, Hoverable, Locateable, SChildElement, Selectable, SModelElement, SParentElement } from 'sprotty';
export declare const resizeFeature: unique symbol;
export interface Resizable extends BoundsAware, Selectable {
}
export declare function isResizable(element: SModelElement): element is SParentElement & Resizable;
export declare enum ResizeHandleLocation {
    TopLeft = "top-left",
    TopRight = "top-right",
    BottomLeft = "bottom-left",
    BottomRight = "bottom-right"
}
export declare function isBoundsAwareMoveable(element: SModelElement): element is SModelElement & Locateable & BoundsAware;
export declare class SResizeHandle extends SChildElement implements Hoverable {
    readonly location?: ResizeHandleLocation | undefined;
    readonly type: string;
    readonly hoverFeedback: boolean;
    static readonly TYPE = "resize-handle";
    constructor(location?: ResizeHandleLocation | undefined, type?: string, hoverFeedback?: boolean);
    hasFeature(feature: symbol): boolean;
    isNwSeResize(): boolean;
    isNeSwResize(): boolean;
}
export declare function addResizeHandles(element: SParentElement): void;
export declare function removeResizeHandles(element: SParentElement): void;
//# sourceMappingURL=model.d.ts.map