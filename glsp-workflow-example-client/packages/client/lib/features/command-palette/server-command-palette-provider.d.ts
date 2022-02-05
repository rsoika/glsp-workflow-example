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
import { ICommandPaletteActionProvider, SModelElement } from 'sprotty';
import { GLSPActionDispatcher } from '../../base/action-dispatcher';
import { EditorContextService } from '../../base/editor-context-service';
export declare namespace ServerCommandPalette {
    const CONTEXT_ID = "command-palette";
    const TEXT = "text";
    const INDEX = "index";
}
export declare class ServerCommandPaletteActionProvider implements ICommandPaletteActionProvider {
    protected actionDispatcher: GLSPActionDispatcher;
    protected editorContext: EditorContextService;
    getActions(_root: Readonly<SModelElement>, text: string, _lastMousePosition?: Point, index?: number): Promise<LabeledAction[]>;
    getPaletteActionsFromResponse(action: Action): LabeledAction[];
}
//# sourceMappingURL=server-command-palette-provider.d.ts.map