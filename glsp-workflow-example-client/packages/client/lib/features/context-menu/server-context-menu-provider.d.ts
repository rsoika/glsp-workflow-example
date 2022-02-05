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
import { Action, LabeledAction, Point } from '@eclipse-glsp/protocol';
import { IContextMenuItemProvider, SModelElement } from 'sprotty';
import { GLSPActionDispatcher } from '../../base/action-dispatcher';
import { EditorContextService } from '../../base/editor-context-service';
export declare namespace ServerContextMenu {
    const CONTEXT_ID = "context-menu";
}
export declare class ServerContextMenuItemProvider implements IContextMenuItemProvider {
    protected actionDispatcher: GLSPActionDispatcher;
    protected editorContext: EditorContextService;
    getItems(root: Readonly<SModelElement>, lastMousePosition?: Point): Promise<LabeledAction[]>;
    getContextActionsFromResponse(action: Action): LabeledAction[];
}
//# sourceMappingURL=server-context-menu-provider.d.ts.map