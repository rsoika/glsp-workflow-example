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
import { NavigationTarget, SetResolvedNavigationTargetAction } from '@eclipse-glsp/protocol';
import { IActionDispatcher, ILogger, ResponseAction } from 'sprotty';
import { EditorContextServiceProvider } from '../../base/editor-context-service';
/**
 * Resolves `NavigationTargets` to element ids.
 *
 * If the `NavigationTarget` doesn't have element ids itself, this resolver queries the server via a
 * `ResolveNavigationTargetAction` for element ids.
 */
export declare class NavigationTargetResolver {
    protected editorContextService: EditorContextServiceProvider;
    protected dispatcher: IActionDispatcher;
    protected readonly logger: ILogger;
    resolve(navigationTarget: NavigationTarget): Promise<SetResolvedNavigationTargetAction | undefined>;
    resolveWithSourceUri(sourceUri: string | undefined, target: NavigationTarget): Promise<SetResolvedNavigationTargetAction | undefined>;
    protected requestResolution(target: NavigationTarget): Promise<ResponseAction>;
}
//# sourceMappingURL=navigation-target-resolver.d.ts.map