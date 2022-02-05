/********************************************************************************
 * Copyright (c) 2020-2022 EclipseSource and others.
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
import { DiamondNode, EditableLabel, LayoutContainer, Nameable, RectangularNode, SChildElement, SEdge, SModelElement, SShapeElement, WithEditableLabel } from '@eclipse-glsp/client';
export declare class TaskNode extends RectangularNode implements Nameable, WithEditableLabel {
    static readonly DEFAULT_FEATURES: symbol[];
    duration?: number;
    taskType?: string;
    reference?: string;
    get editableLabel(): (SChildElement & EditableLabel) | undefined;
    get name(): string;
}
export declare function isTaskNode(element: SModelElement): element is TaskNode;
export declare class WeightedEdge extends SEdge {
    probability?: string;
}
export declare class ActivityNode extends DiamondNode {
    nodeType: string;
    size: {
        width: number;
        height: number;
    };
    strokeWidth: number;
}
export declare namespace ActivityNode {
    namespace Type {
        const INITIAL = "initalNode";
        const FINAL = "finalNode";
        const DECISION = "decisionNode";
        const MERGE = "mergeNode";
        const JOIN = "joinNode";
        const FORK = "forkNode";
        const UNDEFINED = "undefined";
    }
}
export declare class Icon extends SShapeElement implements LayoutContainer {
    static readonly DEFAULT_FEATURES: symbol[];
    layout: string;
    layoutOptions?: {
        [key: string]: string | number | boolean;
    };
    size: {
        width: number;
        height: number;
    };
}
export declare class CategoryNode extends RectangularNode implements Nameable, WithEditableLabel {
    static readonly DEFAULT_FEATURES: symbol[];
    name: string;
    get editableLabel(): (SChildElement & EditableLabel) | undefined;
}
//# sourceMappingURL=model.d.ts.map