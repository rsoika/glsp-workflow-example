/********************************************************************************
 * Copyright (c) 2021 STMicroelectronics and others.
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
import { Args, Point } from './types';
export interface CreateOperation extends Operation {
    elementTypeId: string;
    args?: Args;
}
export declare function isCreateOperation(action: any): action is CreateOperation;
/**
 * In order to create a node in the model the client can send a CreateNodeOperation with the necessary information to create that node.
 */
export declare class CreateNodeOperation implements CreateOperation {
    readonly elementTypeId: string;
    location?: Point | undefined;
    containerId?: string | undefined;
    args?: Args | undefined;
    readonly kind: string;
    static readonly KIND = "createNode";
    constructor(elementTypeId: string, location?: Point | undefined, containerId?: string | undefined, args?: Args | undefined, kind?: string);
}
export declare function isCreateNodeOperation(action: any): action is CreateNodeOperation;
/**
 * In order to create an edge in the model the client can send a `CreateEdgeOperation` with the necessary information to create that edge.
 */
export declare class CreateEdgeOperation implements CreateOperation {
    readonly elementTypeId: string;
    sourceElementId: string;
    targetElementId: string;
    args?: Args | undefined;
    readonly kind: string;
    static readonly KIND = "createEdge";
    constructor(elementTypeId: string, sourceElementId: string, targetElementId: string, args?: Args | undefined, kind?: string);
}
export declare function isCreateEdgeOperation(action: any): action is CreateEdgeOperation;
/**
 * The client sends a `DeleteElementOperation` to the server to request the deletion of an element from the model.
 */
export declare class DeleteElementOperation implements Operation {
    readonly elementIds: string[];
    readonly kind: string;
    static readonly KIND = "deleteElement";
    constructor(elementIds: string[], kind?: string);
}
export declare function isDeleteElementOperation(action: any): action is DeleteElementOperation;
//# sourceMappingURL=element-creation.d.ts.map