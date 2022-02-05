/********************************************************************************
 * Copyright (c) 2021 EclipseSource and others.
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
import { KeyListener, KeyTool, SModelElement } from 'sprotty';
import { BaseGLSPTool } from '../tools/base-glsp-tool';
export declare class MarqueeTool extends BaseGLSPTool {
    static ID: string;
    protected marqueeKeyListener: MarqueeKeyListener;
    protected readonly keytool: KeyTool;
    get id(): string;
    enable(): void;
    disable(): void;
}
export declare class MarqueeKeyListener extends KeyListener {
    keyDown(element: SModelElement, event: KeyboardEvent): Action[];
}
//# sourceMappingURL=marquee-tool.d.ts.map