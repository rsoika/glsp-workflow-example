"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRank = exports.isRanked = exports.DEFAULT_RANK = void 0;
exports.DEFAULT_RANK = 0;
function isRanked(arg) {
    return arg !== undefined && arg.rank !== undefined && typeof arg.rank === 'number';
}
exports.isRanked = isRanked;
function getRank(arg) {
    return isRanked(arg) ? arg.rank : exports.DEFAULT_RANK;
}
exports.getRank = getRank;
//# sourceMappingURL=model.js.map