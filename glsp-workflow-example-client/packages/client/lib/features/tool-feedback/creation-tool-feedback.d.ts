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
import { Action, Point } from '@eclipse-glsp/protocol';
import { AnchorComputerRegistry, CommandExecutionContext, CommandReturn, MouseListener, SConnectableElement, SDanglingAnchor, SEdgeSchema, SModelElement, SModelRoot, SRoutableElement } from 'sprotty';
import { FeedbackCommand } from './model';
export declare class DrawFeedbackEdgeAction implements Action {
    readonly elementTypeId: string;
    readonly sourceId: string;
    readonly edgeSchema?: SEdgeSchema | undefined;
    readonly kind: string;
    constructor(elementTypeId: string, sourceId: string, edgeSchema?: SEdgeSchema | undefined, kind?: string);
}
export declare class DrawFeedbackEdgeCommand extends FeedbackCommand {
    protected action: DrawFeedbackEdgeAction;
    static readonly KIND = "drawFeedbackEdge";
    constructor(action: DrawFeedbackEdgeAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
export declare class RemoveFeedbackEdgeAction implements Action {
    readonly kind: string;
    constructor(kind?: string);
}
export declare class RemoveFeedbackEdgeCommand extends FeedbackCommand {
    static readonly KIND = "removeFeedbackEdgeCommand";
    execute(context: CommandExecutionContext): CommandReturn;
}
export declare class FeedbackEdgeEnd extends SDanglingAnchor {
    readonly sourceId: string;
    readonly elementTypeId: string;
    feedbackEdge: SRoutableElement | undefined;
    readonly type: string;
    static readonly TYPE = "feedback-edge-end";
    constructor(sourceId: string, elementTypeId: string, feedbackEdge?: SRoutableElement | undefined, type?: string);
}
export declare class FeedbackEdgeEndMovingMouseListener extends MouseListener {
    protected anchorRegistry: AnchorComputerRegistry;
    constructor(anchorRegistry: AnchorComputerRegistry);
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
    protected computeAbsoluteAnchor(element: SConnectableElement, absoluteReferencePoint: Point, offset?: number): Point;
}
export declare function feedbackEdgeId(root: SModelRoot): string;
export declare function feedbackEdgeEndId(root: SModelRoot): string;
export declare const defaultFeedbackEdgeSchema: SEdgeSchema;
export declare function drawFeedbackEdge(context: CommandExecutionContext, sourceId: string, elementTypeId: string, feedbackEdgeSchema: SEdgeSchema): void;
export declare function removeFeedbackEdge(root: SModelRoot): void;
//# sourceMappingURL=creation-tool-feedback.d.ts.map