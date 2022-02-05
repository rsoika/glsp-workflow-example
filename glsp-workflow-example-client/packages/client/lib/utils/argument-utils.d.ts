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
import { SModelElement } from 'sprotty';
export declare namespace GArgument {
    function asNumber(argValue: string | number | boolean): number | undefined;
    function asNumbers(argValues: (string | number | boolean)[]): (number | undefined)[];
    function asString(argValue: string | number | boolean): string | undefined;
    function asStrings(argValues: (string | number | boolean)[]): (string | undefined)[];
    function asBoolean(argValue: string | number | boolean): boolean | undefined;
    function asBooleans(argValues: (string | number | boolean)[]): (boolean | undefined)[];
    function getArgument(element: SModelElement | undefined, key: string): string | number | boolean | undefined;
    function getNumber(element: SModelElement | undefined, key: string): number | undefined;
    function getString(element: SModelElement | undefined, key: string): string | undefined;
    function getBoolean(element: SModelElement | undefined, key: string): boolean | undefined;
    function getArguments(element: SModelElement | undefined, ...keys: string[]): (number | boolean | string)[] | undefined;
    function getNumbers(element: SModelElement | undefined, ...keys: string[]): (number | undefined)[] | undefined;
    function getStrings(element: SModelElement | undefined, ...keys: string[]): (string | undefined)[] | undefined;
    function getBooleans(element: SModelElement | undefined, ...keys: string[]): (boolean | undefined)[] | undefined;
    function hasNValues<T>(values: (T | undefined)[], length: number): values is T[];
}
export declare namespace EdgePadding {
    function from(element: SModelElement | undefined): number | undefined;
}
export declare class CornerRadius {
    readonly topLeft: number;
    readonly topRight: number;
    readonly bottomRight: number;
    readonly bottomLeft: number;
    static NO_RADIUS: CornerRadius;
    static KEY_RADIUS_TOP_LEFT: string;
    static KEY_RADIUS_TOP_RIGHT: string;
    static KEY_RADIUS_BOTTOM_RIGHT: string;
    static KEY_RADIUS_BOTTOM_LEFT: string;
    constructor(topLeft?: number, topRight?: number, bottomRight?: number, bottomLeft?: number);
    static from(element: SModelElement | undefined): CornerRadius | undefined;
}
//# sourceMappingURL=argument-utils.d.ts.map