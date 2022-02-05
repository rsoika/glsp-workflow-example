"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isArray = exports.isObject = exports.isNumber = exports.isBoolean = exports.isString = void 0;
/**
 * Validates whether the given object as a property of type `string` with the given key.
 * @param object The object that should be validated
 * @param propertyKey The key of the property
 * @returns `true` if the object has property with matching key of type `string`.
 */
function isString(object, propertyKey) {
    return propertyKey in object && typeof object[propertyKey] === 'string';
}
exports.isString = isString;
/**
 * Validates whether the given object as a property of type `boolean` with the given key.
 * @param object The object that should be validated
 * @param propertyKey The key of the property
 * @returns `true` if the object has property with matching key of type `boolean`.
 */
function isBoolean(object, propertyKey) {
    return propertyKey in object && typeof object[propertyKey] === 'boolean';
}
exports.isBoolean = isBoolean;
/**
 * Validates whether the given object as a property of type `number` with the given key.
 * @param object The object that should be validated
 * @param propertyKey The key of the property
 * @returns `true` if the object has property with matching key of type `number`.
 */
function isNumber(object, propertyKey) {
    return propertyKey in object && typeof object[propertyKey] === 'number';
}
exports.isNumber = isNumber;
/**
 * Validates whether the given object as a property of type `object` with the given key.
 * @param object The object that should be validated
 * @param propertyKey The key of the property
 * @returns `true` if the object has property with matching key of type `object`.
 */
function isObject(object, propertyKey) {
    return propertyKey in object && typeof object[propertyKey] === 'object';
}
exports.isObject = isObject;
/**
 * Validates whether the given object as a property of type `Array` with the given key.
 * @param object The object that should be validated
 * @param propertyKey The key of the property
 * @returns `true` if the object has property with matching key of type `Array`.
 */
function isArray(object, propertyKey) {
    return propertyKey in object && Array.isArray(object[propertyKey]);
}
exports.isArray = isArray;
//# sourceMappingURL=typeguard-util.js.map