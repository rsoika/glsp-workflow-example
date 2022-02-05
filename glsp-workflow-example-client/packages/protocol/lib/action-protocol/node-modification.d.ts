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
import { Operation } from './base-protocol';
import { ElementAndBounds, Point } from './types';
/**
 * Triggers the position or size change of elements. This action concerns only the element's graphical size and position.
 * Whether an element can be resized or repositioned may be specified by the server with a `TypeHint` to allow for immediate user feedback
 * before resizing or repositioning.
 */
export declare class ChangeBoundsOperation implements Operation {
    newBounds: ElementAndBounds[];
    readonly kind: string;
    static readonly KIND = "changeBounds";
    constructor(newBounds: ElementAndBounds[], kind?: string);
}
export declare function isChangeBoundsOperation(action: any): action is ChangeBoundsOperation;
/**
 * The client sends a `ChangeContainerOperation` to the server to request the execution of a changeContainer operation.
 */
export declare class ChangeContainerOperation implements Operation {
    readonly elementId: string;
    readonly targetContainerId: string;
    readonly location?: Point | undefined;
    readonly kind: string;
    static readonly KIND = "changeContainer";
    constructor(elementId: string, targetContainerId: string, location?: Point | undefined, kind?: string);
}
export declare function isChangeContainerOperation(action: any): action is ChangeContainerOperation;
//# sourceMappingURL=node-modification.d.ts.map