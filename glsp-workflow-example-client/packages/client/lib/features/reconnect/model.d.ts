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
import { RoutingHandleKind, SModelElement, SModelExtension, SRoutableElement, SRoutingHandle } from 'sprotty';
export declare const reconnectFeature: unique symbol;
export interface Reconnectable extends SModelExtension {
}
export declare function isReconnectable(element: SModelElement): element is SRoutableElement & Reconnectable;
export declare function isReconnectHandle(element: SModelElement | undefined): element is SReconnectHandle;
export declare function addReconnectHandles(element: SRoutableElement): void;
export declare function removeReconnectHandles(element: SRoutableElement): void;
export declare function isSourceRoutingHandle(edge: SRoutableElement, routingHandle: SReconnectHandle): boolean;
export declare function isTargetRoutingHandle(edge: SRoutableElement, routingHandle: SReconnectHandle): boolean;
export declare function createReconnectHandle(edge: SRoutableElement, kind: RoutingHandleKind, routingPointIndex: number): SReconnectHandle;
export declare class SReconnectHandle extends SRoutingHandle {
    hasFeature(feature: symbol): boolean;
}
//# sourceMappingURL=model.d.ts.map