"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSModelRootSchema = exports.isSModelElementSchema = void 0;
/********************************************************************************
 * Copyright (c) 2021 STMicroelectronics and others.
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
const typeguard_util_1 = require("../utils/typeguard-util");
function isSModelElementSchema(schema) {
    return schema !== undefined && typeof schema === 'object' && typeguard_util_1.isString(schema, 'type') && typeguard_util_1.isString(schema, 'id');
}
exports.isSModelElementSchema = isSModelElementSchema;
function isSModelRootSchema(schema) {
    return isSModelElementSchema(schema) && !('parent' in schema);
}
exports.isSModelRootSchema = isSModelRootSchema;
//# sourceMappingURL=model-structure.js.map