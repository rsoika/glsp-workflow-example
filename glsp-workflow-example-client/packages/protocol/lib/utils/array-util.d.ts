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
export declare type MaybeArray<T> = T | T[];
export declare function remove<T>(array: T[], value: T): boolean;
export declare function flatPush<T>(array: T[], toPush: MaybeArray<T>[]): void;
export declare function distinctAdd<T>(array: T[], value: T): boolean;
interface Constructor<T> {
    new (...args: any[]): T;
}
declare type PrimitiveType = 'bigint' | 'boolean' | 'function' | 'number' | 'object' | 'string' | 'symbol' | 'undefined';
export declare function isArrayOfType<T>(object: any, typeGuard: (elem: any) => elem is T, supportEmpty?: boolean): object is T[];
export declare function isArrayOfClass<T>(object: any, className: Constructor<T>, supportEmpty?: boolean): object is T[];
export declare function isArrayOfPrimitive<T>(object: any, primitiveType: PrimitiveType, supportEmpty?: boolean): object is T[];
export declare function isStringArray(object: any, supportEmpty?: boolean): object is string[];
export declare function isArrayMatching(object: any, predicate: (elem: any) => boolean, supportEmpty?: boolean): boolean;
export {};
//# sourceMappingURL=array-util.d.ts.map