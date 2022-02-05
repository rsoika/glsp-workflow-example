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
import { Action, TriggerEdgeCreationAction } from '@eclipse-glsp/protocol';
import { AnchorComputerRegistry, IActionHandler, SEdge, SModelElement } from 'sprotty';
import { DragAwareMouseListener } from '../../base/drag-aware-mouse-listener';
import { FeedbackEdgeEndMovingMouseListener } from '../tool-feedback/creation-tool-feedback';
import { BaseGLSPTool } from './base-glsp-tool';
/**
 * Tool to create connections in a Diagram, by selecting a source and target node.
 */
export declare class EdgeCreationTool extends BaseGLSPTool implements IActionHandler {
    static ID: string;
    protected anchorRegistry: AnchorComputerRegistry;
    protected triggerAction: TriggerEdgeCreationAction;
    protected creationToolMouseListener: EdgeCreationToolMouseListener;
    protected feedbackEndMovingMouseListener: FeedbackEdgeEndMovingMouseListener;
    get id(): string;
    enable(): void;
    disable(): void;
    handle(action: Action): Action | void;
}
export declare class EdgeCreationToolMouseListener extends DragAwareMouseListener {
    protected triggerAction: TriggerEdgeCreationAction;
    protected tool: EdgeCreationTool;
    protected source?: string;
    protected target?: string;
    protected currentTarget?: SModelElement;
    protected allowedTarget: boolean;
    protected proxyEdge: SEdge;
    constructor(triggerAction: TriggerEdgeCreationAction, tool: EdgeCreationTool);
    protected reinitialize(): void;
    nonDraggingMouseUp(_element: SModelElement, event: MouseEvent): Action[];
    protected isSourceSelected(): boolean;
    protected isTargetSelected(): boolean;
    mouseOver(target: SModelElement, event: MouseEvent): Action[];
    protected isAllowedSource(element: SModelElement | undefined): boolean;
    protected isAllowedTarget(element: SModelElement | undefined): boolean;
}
//# sourceMappingURL=edge-creation-tool.d.ts.map