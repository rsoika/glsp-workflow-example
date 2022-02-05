"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/********************************************************************************
 * Copyright (c) 2020-2021 EclipseSource and others.
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
/* eslint-disable no-unused-expressions */
const protocol_1 = require("@eclipse-glsp/protocol");
const chai_1 = require("chai");
require("mocha");
require("reflect-metadata");
describe('NavigationTarget', () => {
    it('should be able to set and get element IDs', () => {
        const navigationTarget = { uri: 'uri' };
        protocol_1.NavigationTarget.setElementIds(navigationTarget, ['id1', 'id2']);
        chai_1.expect(protocol_1.NavigationTarget.getElementIds(navigationTarget)).to.be.eql(['id1', 'id2']);
    });
    it('should be able to set and get textual positions', () => {
        const navigationTarget = { uri: 'uri' };
        protocol_1.NavigationTarget.setTextPosition(navigationTarget, { line: 1, character: 2 });
        chai_1.expect(protocol_1.NavigationTarget.getTextPosition(navigationTarget)).to.be.eql({ line: 1, character: 2 });
    });
    it('should be able to set and get custom query arguments', () => {
        const navigationTarget = { uri: 'uri' };
        protocol_1.NavigationTarget.addArgument(navigationTarget, 'name', 'test');
        chai_1.expect(navigationTarget.args.name).to.be.eql('test');
    });
    it('should specify whether it has arguments', () => {
        let navigationTarget = { uri: 'uri' };
        chai_1.expect(protocol_1.NavigationTarget.hasArguments(navigationTarget)).to.be.false;
        protocol_1.NavigationTarget.addArgument(navigationTarget, 'name', 'test');
        chai_1.expect(protocol_1.NavigationTarget.hasArguments(navigationTarget)).to.be.true;
        navigationTarget = { uri: 'uri' };
        chai_1.expect(protocol_1.NavigationTarget.hasArguments(navigationTarget)).to.be.false;
        protocol_1.NavigationTarget.setElementIds(navigationTarget, ['id1', 'id2']);
        chai_1.expect(protocol_1.NavigationTarget.hasArguments(navigationTarget)).to.be.true;
        navigationTarget = { uri: 'uri' };
        chai_1.expect(protocol_1.NavigationTarget.hasArguments(navigationTarget)).to.be.false;
        protocol_1.NavigationTarget.setTextPosition(navigationTarget, { line: 1, character: 2 });
        chai_1.expect(protocol_1.NavigationTarget.hasArguments(navigationTarget)).to.be.true;
    });
});
//# sourceMappingURL=navigation-target-resolver.spec.js.map