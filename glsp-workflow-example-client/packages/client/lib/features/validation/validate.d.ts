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
import { Action, DeleteMarkersAction, Marker, SetMarkersAction } from '@eclipse-glsp/protocol';
import { Command, CommandExecutionContext, CommandReturn, IActionDispatcher, SModelRoot } from 'sprotty';
import { EditorContextService } from '../../base/editor-context-service';
import { IFeedbackActionDispatcher, IFeedbackEmitter } from '../tool-feedback/feedback-action-dispatcher';
import { FeedbackCommand } from '../tool-feedback/model';
/**
 * Feedback emitter sending actions for visualizing model validation feedback and
 * re-establishing this feedback visualization after the model has been updated.
 */
export declare class ValidationFeedbackEmitter implements IFeedbackEmitter {
    protected feedbackActionDispatcher: IFeedbackActionDispatcher;
    protected actionDispatcher: () => Promise<IActionDispatcher>;
    private registeredAction;
    private constructor();
    /**
     * Register the action that should be emitted for visualizing validation feedback.
     * @param action the action that should be emitted when the model is updated and that will visualize the model validation feedback.
     */
    registerValidationFeedbackAction(action: MarkersAction): void;
}
/**
 * Manages current markers for the outside of the GLSP.
 *
 * Typically this is rebound by the surrounding tool, e.g. Theia, to be aware of
 * and propagate current markers.
 */
export declare abstract class ExternalMarkerManager {
    languageLabel: string;
    protected actionDispatcher?: IActionDispatcher;
    connect(actionDispatcher: IActionDispatcher): void;
    removeMarkers(markers: Marker[]): void;
    abstract setMarkers(markers: Marker[], sourceUri?: string): void;
}
/**
 * Command for handling `SetMarkersAction`
 */
export declare class SetMarkersCommand extends Command {
    action: SetMarkersAction;
    protected validationFeedbackEmitter: ValidationFeedbackEmitter;
    protected externalMarkerManager?: ExternalMarkerManager;
    protected editorContextService: EditorContextService;
    static readonly KIND = "setMarkers";
    constructor(action: SetMarkersAction);
    execute(context: CommandExecutionContext): Promise<SModelRoot>;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
/**
 * Interface for actions processing markers
 */
export interface MarkersAction extends Action {
    readonly markers: Marker[];
}
/**
 * Action for applying makers to a model
 */
export declare class ApplyMarkersAction implements MarkersAction {
    readonly markers: Marker[];
    readonly kind: string;
    constructor(markers: Marker[], kind?: string);
}
/**
 * Command for handling `ApplyMarkersAction`
 */
export declare class ApplyMarkersCommand extends FeedbackCommand {
    protected action: ApplyMarkersAction;
    static KIND: string;
    readonly priority = 0;
    constructor(action: ApplyMarkersAction);
    execute(context: CommandExecutionContext): CommandReturn;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
/**
 * Command for handling `DeleteMarkersAction`
 */
export declare class DeleteMarkersCommand extends Command {
    protected action: DeleteMarkersAction;
    static KIND: string;
    constructor(action: DeleteMarkersAction);
    execute(context: CommandExecutionContext): CommandReturn;
    undo(context: CommandExecutionContext): CommandReturn;
    redo(context: CommandExecutionContext): CommandReturn;
}
//# sourceMappingURL=validate.d.ts.map