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
import { SModelElementSchema } from '@eclipse-glsp/protocol';
import { SModelElement, SModelExtension } from 'sprotty';
export declare const containerFeature: unique symbol;
export interface Containable extends SModelExtension {
    isContainableElement(input: SModelElement | SModelElementSchema | string): boolean;
}
export declare function isContainable(element: SModelElement): element is SModelElement & Containable;
export declare const reparentFeature: unique symbol;
export interface Reparentable extends SModelExtension {
}
export declare function isReparentable(element: SModelElement): element is SModelElement & Reparentable;
//# sourceMappingURL=model.d.ts.map