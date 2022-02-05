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
import { CommandExecutionContext, SModelElement, SModelRoot } from 'sprotty';
import { FeedbackCommand } from './model';
export declare class ModifyCSSFeedbackAction implements Action {
    readonly input?: string[] | SModelElement[] | undefined;
    readonly addClasses?: string[] | undefined;
    readonly removeClasses?: string[] | undefined;
    kind: string;
    readonly elementIds?: string[];
    constructor(input?: string[] | SModelElement[] | undefined, addClasses?: string[] | undefined, removeClasses?: string[] | undefined, kind?: string);
}
export declare class ModifyCssFeedbackCommand extends FeedbackCommand {
    readonly action: ModifyCSSFeedbackAction;
    static readonly KIND = "modifyCSSFeedback";
    constructor(action: ModifyCSSFeedbackAction);
    execute(context: CommandExecutionContext): SModelRoot;
}
export declare enum CursorCSS {
    DEFAULT = "default-mode",
    OVERLAP_FORBIDDEN = "overlap-forbidden-mode",
    NODE_CREATION = "node-creation-mode",
    EDGE_CREATION_SOURCE = "edge-creation-select-source-mode",
    EDGE_CREATION_TARGET = "edge-creation-select-target-mode",
    EDGE_RECONNECT = "edge-reconnect-select-target-mode",
    OPERATION_NOT_ALLOWED = "edge-modification-not-allowed-mode",
    ELEMENT_DELETION = "element-deletion-mode",
    RESIZE_NESW = "resize-nesw-mode",
    RESIZE_NWSE = "resize-nwse-mode",
    MOVE = "move-mode",
    MARQUEE = "marquee-mode"
}
export declare function cursorFeedbackAction(cursorCss?: CursorCSS): ModifyCSSFeedbackAction;
export declare function applyCssClasses(element: SModelElement, ...classes: string[]): ModifyCSSFeedbackAction;
export declare function deleteCssClasses(element: SModelElement, ...classes: string[]): ModifyCSSFeedbackAction;
//# sourceMappingURL=css-feedback.d.ts.map