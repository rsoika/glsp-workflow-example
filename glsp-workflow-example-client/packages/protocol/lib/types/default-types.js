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
exports.DefaultTypes = void 0;
var DefaultTypes;
(function (DefaultTypes) {
    // HTML elements
    DefaultTypes.HTML = 'html';
    // generic types
    DefaultTypes.FOREIGN_OBJECT = 'foreign-object';
    DefaultTypes.PRE_RENDERED = 'pre-rendered';
    DefaultTypes.SHAPE_PRE_RENDERED = 'shape-pre-rendered';
    // SVG elements
    DefaultTypes.SVG = 'svg';
    // graph types
    DefaultTypes.GRAPH = 'graph';
    DefaultTypes.NODE = 'node';
    DefaultTypes.COMPARTMENT = 'comp';
    DefaultTypes.COMPARTMENT_HEADER = 'comp:header';
    DefaultTypes.EDGE = 'edge';
    DefaultTypes.PORT = 'port';
    DefaultTypes.ROUTING_POINT = 'routing-point';
    DefaultTypes.VOLATILE_ROUTING_POINT = `volatile-${DefaultTypes.ROUTING_POINT}`;
    DefaultTypes.LABEL = 'label';
    // UI elements
    DefaultTypes.BUTTON_EXPAND = 'button:expand';
    DefaultTypes.ISSUE_MARKER = 'marker';
    // shapes
    DefaultTypes.NODE_CIRCLE = 'node:circle';
    DefaultTypes.NODE_RECTANGLE = 'node:rectangle';
    DefaultTypes.NODE_DIAMOND = 'node:diamond';
})(DefaultTypes = exports.DefaultTypes || (exports.DefaultTypes = {}));
//# sourceMappingURL=default-types.js.map