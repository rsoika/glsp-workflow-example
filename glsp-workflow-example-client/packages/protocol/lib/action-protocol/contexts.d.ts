/********************************************************************************
 * Copyright (c) 2021 STMicroelectronics and others.
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
import { RequestAction, ResponseAction } from './base-protocol';
import { Args, EditorContext, LabeledAction } from './types';
/**
 * The `RequestContextActions` is sent from the client to the server to request the available actions for the context with id contextId.
 */
export declare class RequestContextActions implements RequestAction<SetContextActions> {
    readonly contextId: string;
    readonly editorContext: EditorContext;
    readonly requestId: string;
    readonly kind: string;
    static readonly KIND = "requestContextActions";
    constructor(contextId: string, editorContext: EditorContext, requestId?: string, kind?: string);
}
export declare function isRequestContextActions(action: any): action is RequestContextActions;
/**
 * The `SetContextActions` is the response to a {@link RequestContextActions} containing all actions for the queried context.
 */
export declare class SetContextActions implements ResponseAction {
    readonly actions: LabeledAction[];
    readonly responseId: string;
    readonly args?: Args | undefined;
    readonly kind: string;
    static readonly KIND = "setContextActions";
    constructor(actions: LabeledAction[], responseId?: string, args?: Args | undefined, kind?: string);
}
export declare function isSetContextActionsAction(action: any): action is SetContextActions;
//# sourceMappingURL=contexts.d.ts.map