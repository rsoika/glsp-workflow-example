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
import { Action, UpdateModelAction } from '@eclipse-glsp/protocol';
import { ActionHandlerRegistry, Command, CommandExecutionContext, CommandReturn, IActionHandler, ILogger, SModelRoot, UpdateModelCommand } from 'sprotty';
import { IFeedbackActionDispatcher } from '../../features/tool-feedback/feedback-action-dispatcher';
export declare class SetModelActionHandler implements IActionHandler {
    handle(action: Action): Action | void;
}
export interface SModelRootListener {
    modelRootChanged(root: Readonly<SModelRoot>): void;
}
/**
 * A special`UpdateModelCommand` that retrieves all registered `actions` from the `IFeedbackActionDispatcher` (if present) and applies their
 * feedback to the `newRoot` before performing the update
 */
export declare class FeedbackAwareUpdateModelCommand extends UpdateModelCommand {
    protected logger: ILogger;
    protected readonly feedbackActionDispatcher: IFeedbackActionDispatcher;
    protected actionHandlerRegistryProvider: () => Promise<ActionHandlerRegistry>;
    protected modelRootListeners: SModelRootListener[];
    protected actionHandlerRegistry?: ActionHandlerRegistry;
    constructor(action: UpdateModelAction);
    protected initialize(): void;
    protected performUpdate(oldRoot: SModelRoot, newRoot: SModelRoot, context: CommandExecutionContext): CommandReturn;
    protected getFeedbackCommands(registry: ActionHandlerRegistry): Command[];
}
//# sourceMappingURL=update-model-command.d.ts.map