/// <reference types="node" />
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
import { Action, RequestAction, ResponseAction } from '@eclipse-glsp/protocol';
import { ActionDispatcher } from 'sprotty';
import { ModelInitializationConstraint } from './model-initialization-constraint';
export declare class GLSPActionDispatcher extends ActionDispatcher {
    protected readonly timeouts: Map<string, NodeJS.Timeout>;
    protected initializedConstraint: boolean;
    protected initializationConstraint: ModelInitializationConstraint;
    initialize(): Promise<void>;
    startModelInitialization(): void;
    onceModelInitialized(): Promise<void>;
    dispatch(action: Action): Promise<void>;
    protected handleAction(action: Action): Promise<void>;
    /**
     * Dispatch a request and waits for a response until the timeout given in `timeoutMs` has
     * been reached. The returned promise is resolved when a response with matching identifier
     * is dispatched or when the timeout has been reached. That response is _not_ passed to the
     * registered action handlers. Instead, it is the responsibility of the caller of this method
     * to handle the response properly. For example, it can be sent to the registered handlers by
     * passing it again to the `dispatch` method.
     * If `rejectOnTimeout` is set to false (default) the returned promise will be resolved with
     * no value, otherwise it will be rejected.
     */
    requestUntil<Res extends ResponseAction>(action: RequestAction<Res>, timeoutMs?: number, rejectOnTimeout?: boolean): Promise<Res>;
}
//# sourceMappingURL=action-dispatcher.d.ts.map