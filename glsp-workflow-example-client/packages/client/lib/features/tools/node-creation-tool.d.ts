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
import { Action, TriggerNodeCreationAction } from '@eclipse-glsp/protocol';
import { IActionHandler, ISnapper, SModelElement } from 'sprotty';
import { DragAwareMouseListener } from '../../base/drag-aware-mouse-listener';
import { Containable } from '../hints/model';
import { BaseGLSPTool } from './base-glsp-tool';
export declare class NodeCreationTool extends BaseGLSPTool implements IActionHandler {
    static ID: string;
    readonly snapper?: ISnapper;
    protected creationToolMouseListener: NodeCreationToolMouseListener;
    protected triggerAction: TriggerNodeCreationAction;
    get id(): string;
    enable(): void;
    disable(): void;
    handle(action: Action): Action | void;
}
export declare class NodeCreationToolMouseListener extends DragAwareMouseListener {
    protected triggerAction: TriggerNodeCreationAction;
    protected tool: NodeCreationTool;
    protected container?: SModelElement & Containable;
    constructor(triggerAction: TriggerNodeCreationAction, tool: NodeCreationTool);
    protected creationAllowed(elementTypeId: string): boolean | undefined;
    get elementTypeId(): string;
    nonDraggingMouseUp(target: SModelElement, event: MouseEvent): Action[];
    mouseOver(target: SModelElement, event: MouseEvent): Action[];
}
//# sourceMappingURL=node-creation-tool.d.ts.map