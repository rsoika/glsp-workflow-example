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
import { Action } from '@eclipse-glsp/protocol';
import { IActionDispatcher, KeyTool } from 'sprotty';
import { EditorContextService } from '../../base/editor-context-service';
import { GLSPTool } from '../../base/tool-manager/glsp-tool-manager';
import { IMouseTool } from '../mouse-tool/mouse-tool';
import { IFeedbackActionDispatcher, IFeedbackEmitter } from '../tool-feedback/feedback-action-dispatcher';
export declare abstract class BaseGLSPTool implements GLSPTool {
    protected feedbackDispatcher: IFeedbackActionDispatcher;
    protected actionDispatcher: IActionDispatcher;
    protected mouseTool: IMouseTool;
    protected keyTool: KeyTool;
    protected readonly editorContext: EditorContextService;
    abstract enable(): void;
    abstract disable(): void;
    abstract id: string;
    get isEditTool(): boolean;
    dispatchFeedback(actions: Action[], feedbackeEmitter?: IFeedbackEmitter): void;
    dispatchActions(actions: Action[]): void;
    deregisterFeedback(actions: Action[], feedbackeEmitter?: IFeedbackEmitter): void;
}
//# sourceMappingURL=base-glsp-tool.d.ts.map