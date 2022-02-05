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
import { Action, ModelSourceChangedAction } from '@eclipse-glsp/protocol';
import { IActionDispatcher, IActionHandler, ViewerOptions } from 'sprotty';
/**
 * An external handler of the model source change event.
 *
 * This allows external applications to react specifically to this event, e.g. by bringing up the diagram,
 * check their dirty state, show a dialog, etc.
 */
export declare abstract class ExternalModelSourceChangedHandler {
    /**
     * Notifies about a change of the model source.
     * @returns actions to be dispatched after the notification.
     */
    abstract notifyModelSourceChange(modelSourceName: string, options: ViewerOptions): Promise<Action[]>;
}
export declare class ModelSourceChangedActionHandler implements IActionHandler {
    protected dispatcher: IActionDispatcher;
    protected options: ViewerOptions;
    protected externalModelSourceChangedHandler?: ExternalModelSourceChangedHandler;
    handle(action: Action): void;
    protected showSimpleNotification(action: ModelSourceChangedAction): void;
}
//# sourceMappingURL=model-source-changed-action-handler.d.ts.map