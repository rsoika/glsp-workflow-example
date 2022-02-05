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
import { Point } from '@eclipse-glsp/protocol';
import { BoundsAware, SModelElement } from 'sprotty';
import { ModifyCSSFeedbackAction } from '../tool-feedback/css-feedback';
export interface IMovementRestrictor {
    validate(newLocation: Point, element: SModelElement): boolean;
    cssClasses?: string[];
}
export declare function createMovementRestrictionFeedback(element: SModelElement, movementRestrictor: IMovementRestrictor): ModifyCSSFeedbackAction;
export declare function removeMovementRestrictionFeedback(element: SModelElement, movementRestrictor: IMovementRestrictor): ModifyCSSFeedbackAction;
export declare class NoOverlapMovmentRestrictor implements IMovementRestrictor {
    cssClasses: string[];
    validate(newLocation: Point, element: SModelElement): boolean;
}
export declare function areOverlapping(element1: SModelElement & BoundsAware, element2: SModelElement & BoundsAware): boolean;
//# sourceMappingURL=movement-restrictor.d.ts.map