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
import { Action } from '@eclipse-glsp/protocol';
import { KeyListener, KeyTool, MouseListener, SModelElement } from 'sprotty';
import { GLSPTool } from '../../base/tool-manager/glsp-tool-manager';
import { IMouseTool } from '../mouse-tool/mouse-tool';
import { IFeedbackActionDispatcher } from '../tool-feedback/feedback-action-dispatcher';
/**
 * Deletes selected elements when hitting the `Del` key.
 */
export declare class DelKeyDeleteTool implements GLSPTool {
    static ID: string;
    isEditTool: boolean;
    protected deleteKeyListener: DeleteKeyListener;
    protected readonly keytool: KeyTool;
    get id(): string;
    enable(): void;
    disable(): void;
}
export declare class DeleteKeyListener extends KeyListener {
    keyDown(element: SModelElement, event: KeyboardEvent): Action[];
}
/**
 * Deletes selected elements when clicking on them.
 */
export declare class MouseDeleteTool implements GLSPTool {
    static ID: string;
    isEditTool: boolean;
    protected deleteToolMouseListener: DeleteToolMouseListener;
    protected mouseTool: IMouseTool;
    protected readonly feedbackDispatcher: IFeedbackActionDispatcher;
    get id(): string;
    enable(): void;
    disable(): void;
}
export declare class DeleteToolMouseListener extends MouseListener {
    mouseUp(target: SModelElement, event: MouseEvent): Action[];
}
//# sourceMappingURL=delete-tool.d.ts.map