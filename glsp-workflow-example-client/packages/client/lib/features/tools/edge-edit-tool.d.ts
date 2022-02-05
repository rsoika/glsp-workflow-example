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
import { Action } from '@eclipse-glsp/protocol';
import { AnchorComputerRegistry, Connectable, EdgeRouterRegistry, SModelElement, SModelRoot, SRoutableElement, SRoutingHandle } from 'sprotty';
import { DragAwareMouseListener } from '../../base/drag-aware-mouse-listener';
import { SReconnectHandle } from '../reconnect/model';
import { SelectionListener, SelectionService } from '../select/selection-service';
import { FeedbackEdgeRouteMovingMouseListener, FeedbackEdgeSourceMovingMouseListener, FeedbackEdgeTargetMovingMouseListener } from '../tool-feedback/edge-edit-tool-feedback';
import { BaseGLSPTool } from './base-glsp-tool';
export declare class EdgeEditTool extends BaseGLSPTool {
    static ID: string;
    protected selectionService: SelectionService;
    protected anchorRegistry: AnchorComputerRegistry;
    protected edgeRouterRegistry?: EdgeRouterRegistry;
    protected feedbackEdgeSourceMovingListener: FeedbackEdgeSourceMovingMouseListener;
    protected feedbackEdgeTargetMovingListener: FeedbackEdgeTargetMovingMouseListener;
    protected feedbackMovingListener: FeedbackEdgeRouteMovingMouseListener;
    protected edgeEditListener: EdgeEditListener;
    get id(): string;
    enable(): void;
    registerFeedbackListeners(): void;
    deregisterFeedbackListeners(): void;
    disable(): void;
}
declare class EdgeEditListener extends DragAwareMouseListener implements SelectionListener {
    protected tool: EdgeEditTool;
    protected edge?: SRoutableElement;
    protected routingHandle?: SRoutingHandle;
    protected newConnectable?: SModelElement & Connectable;
    protected reconnectMode?: 'NEW_SOURCE' | 'NEW_TARGET';
    constructor(tool: EdgeEditTool);
    protected isValidEdge(edge?: SRoutableElement): edge is SRoutableElement;
    protected setEdgeSelected(edge: SRoutableElement): void;
    protected isEdgeSelected(): boolean;
    protected setReconnectHandleSelected(edge: SRoutableElement, reconnectHandle: SReconnectHandle): void;
    protected isReconnecting(): boolean;
    protected isReconnectingNewSource(): boolean;
    protected setRoutingHandleSelected(edge: SRoutableElement, routingHandle: SRoutingHandle): void;
    protected requiresReconnect(sourceId: string, targetId: string): boolean;
    protected setNewConnectable(connectable?: SModelElement & Connectable): void;
    protected isReadyToReconnect(): boolean | undefined;
    protected isReadyToReroute(): boolean;
    mouseDown(target: SModelElement, event: MouseEvent): Action[];
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    mouseUp(target: SModelElement, event: MouseEvent): Action[];
    mouseOver(target: SModelElement, event: MouseEvent): Action[];
    selectionChanged(root: Readonly<SModelRoot>, selectedElements: string[]): void;
    reset(): void;
    protected resetData(): void;
    protected resetFeedback(): void;
}
export {};
//# sourceMappingURL=edge-edit-tool.d.ts.map