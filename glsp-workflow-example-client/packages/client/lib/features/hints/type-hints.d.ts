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
import { Action, EdgeTypeHint, ShapeTypeHint } from '@eclipse-glsp/protocol';
import { CommandExecutionContext, CommandReturn, IActionHandler, ICommand, SModelElement } from 'sprotty';
import { IFeedbackActionDispatcher } from '../tool-feedback/feedback-action-dispatcher';
import { FeedbackCommand } from '../tool-feedback/model';
export declare class ApplyTypeHintsAction implements Action {
    readonly kind: string;
}
export declare class ApplyTypeHintsCommand extends FeedbackCommand {
    protected action: ApplyTypeHintsAction;
    static KIND: string;
    readonly priority = 10;
    protected typeHintProvider: ITypeHintProvider;
    constructor(action: ApplyTypeHintsAction);
    execute(context: CommandExecutionContext): CommandReturn;
    protected applyEdgeTypeHint(element: SModelElement): void;
    protected applyShapeTypeHint(element: SModelElement): void;
}
export interface ITypeHintProvider {
    getShapeTypeHint(input: SModelElement | SModelElement | string): ShapeTypeHint | undefined;
    getEdgeTypeHint(input: SModelElement | SModelElement | string): EdgeTypeHint | undefined;
    getValidEdgeElementTypes(input: SModelElement | SModelElement | string, role: 'source' | 'target'): string[];
}
export declare class TypeHintProvider implements IActionHandler, ITypeHintProvider {
    protected feedbackActionDispatcher: IFeedbackActionDispatcher;
    protected shapeHints: Map<string, ShapeTypeHint>;
    protected edgeHints: Map<string, EdgeTypeHint>;
    handle(action: Action): ICommand | Action | void;
    getValidEdgeElementTypes(input: SModelElement | SModelElement | string, role: 'source' | 'target'): string[];
    getShapeTypeHint(input: SModelElement | SModelElement | string): ShapeTypeHint | undefined;
    getEdgeTypeHint(input: SModelElement | SModelElement | string): EdgeTypeHint | undefined;
}
//# sourceMappingURL=type-hints.d.ts.map