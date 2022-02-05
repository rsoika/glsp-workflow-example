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
import { Action, Point } from '@eclipse-glsp/protocol';
import { IActionDispatcher, IActionHandler, IContextMenuItemProvider, MenuItem, SModelRoot } from 'sprotty';
export declare class InvokeCopyAction implements Action {
    readonly kind: string;
    static readonly KIND = "invoke-copy";
    constructor(kind?: string);
}
export declare class InvokePasteAction implements Action {
    readonly kind: string;
    static readonly KIND = "invoke-paste";
    constructor(kind?: string);
}
export declare class InvokeCutAction implements Action {
    readonly kind: string;
    static readonly KIND = "invoke-cut";
    constructor(kind?: string);
}
export declare class InvokeCopyPasteActionHandler implements IActionHandler {
    protected dispatcher: IActionDispatcher;
    handle(action: Action): void;
    protected notifyUserToUseShortcut(operation: string): void;
}
export declare class CopyPasteContextMenuItemProvider implements IContextMenuItemProvider {
    getItems(root: Readonly<SModelRoot>, _lastMousePosition?: Point): Promise<MenuItem[]>;
    protected createPasteMenuItem(): MenuItem;
    protected createCutMenuItem(hasSelectedElements: boolean): MenuItem;
    protected createCopyMenuItem(hasSelectedElements: boolean): MenuItem;
}
export declare function supportsCopy(): boolean;
export declare function supportsCut(): boolean;
export declare function supportsPaste(): boolean;
export declare function isNative(): boolean;
//# sourceMappingURL=copy-paste-context-menu.d.ts.map