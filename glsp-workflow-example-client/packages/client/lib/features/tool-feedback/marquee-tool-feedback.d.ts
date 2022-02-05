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
import { Action, Point } from '@eclipse-glsp/protocol';
import { AnchorComputerRegistry, CommandExecutionContext, CommandReturn, MouseListener, SModelElement, SModelRoot } from 'sprotty';
import { FeedbackCommand } from './model';
export declare class DrawMarqueeAction implements Action {
    readonly startPoint: Point;
    readonly endPoint: Point;
    readonly kind: string;
    constructor(startPoint: Point, endPoint: Point, kind?: string);
}
export declare class DrawMarqueeCommand extends FeedbackCommand {
    protected action: DrawMarqueeAction;
    static readonly KIND = "drawMarquee";
    constructor(action: DrawMarqueeAction);
    execute(context: CommandExecutionContext): CommandReturn;
}
export declare class RemoveMarqueeAction implements Action {
    readonly kind: string;
    constructor(kind?: string);
}
export declare class RemoveMarqueeCommand extends FeedbackCommand {
    static readonly KIND = "removeMarqueeCommand";
    execute(context: CommandExecutionContext): CommandReturn;
}
export declare class MarqueeEndMovingMouseListener extends MouseListener {
    protected anchorRegistry: AnchorComputerRegistry;
    constructor(anchorRegistry: AnchorComputerRegistry);
    mouseMove(target: SModelElement, event: MouseEvent): Action[];
}
export declare function marqueeId(root: SModelRoot): string;
export declare const MARQUEE = "marquee";
export declare function drawMarquee(context: CommandExecutionContext, startPoint: Point, endPoint: Point): void;
export declare function removeMarquee(root: SModelRoot): void;
//# sourceMappingURL=marquee-tool-feedback.d.ts.map