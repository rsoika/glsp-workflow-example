"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaveModelKeyboardListener = void 0;
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
const protocol_1 = require("@eclipse-glsp/protocol");
const sprotty_1 = require("sprotty");
const keyboard_1 = require("sprotty/lib/utils/keyboard");
class SaveModelKeyboardListener extends sprotty_1.KeyListener {
    keyDown(_element, event) {
        if (keyboard_1.matchesKeystroke(event, 'KeyS', 'ctrlCmd')) {
            return [new protocol_1.SaveModelAction()];
        }
        return [];
    }
}
exports.SaveModelKeyboardListener = SaveModelKeyboardListener;
//# sourceMappingURL=save-keylistener.js.map