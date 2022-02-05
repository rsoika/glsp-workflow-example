"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RankingMouseTool = void 0;
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
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const model_1 = require("../rank/model");
let RankingMouseTool = class RankingMouseTool extends sprotty_1.MouseTool {
    constructor(mouseListeners = []) {
        super(mouseListeners);
        this.mouseListeners = mouseListeners;
        this.rankedMouseListeners = groupBy(mouseListeners, listener => model_1.getRank(listener));
    }
    register(mouseListener) {
        super.register(mouseListener);
        this.rankedMouseListeners = groupBy(this.mouseListeners, listener => model_1.getRank(listener));
    }
    deregister(mouseListener) {
        super.deregister(mouseListener);
        this.rankedMouseListeners = groupBy(this.mouseListeners, listener => model_1.getRank(listener));
    }
    decorate(vnode, element) {
        // we need to overwrite the existing event handlers registered by the original mouse tool
        if (element instanceof sprotty_1.SModelRoot) {
            overwriteOn(vnode, 'mouseover', this.mouseOver.bind(this, element), element);
            overwriteOn(vnode, 'mouseout', this.mouseOut.bind(this, element), element);
            overwriteOn(vnode, 'mouseenter', this.mouseEnter.bind(this, element), element);
            overwriteOn(vnode, 'mouseleave', this.mouseLeave.bind(this, element), element);
            overwriteOn(vnode, 'mousedown', this.mouseDown.bind(this, element), element);
            overwriteOn(vnode, 'mouseup', this.mouseUp.bind(this, element), element);
            overwriteOn(vnode, 'mousemove', this.mouseMove.bind(this, element), element);
            overwriteOn(vnode, 'wheel', this.wheel.bind(this, element), element);
            overwriteOn(vnode, 'contextmenu', this.contextMenu.bind(this, element), element);
            overwriteOn(vnode, 'dblclick', this.doubleClick.bind(this, element), element);
        }
        vnode = this.mouseListeners.reduce((n, listener) => listener.decorate(n, element), vnode);
        return vnode;
    }
    contextMenu(model, event) {
        event.preventDefault();
    }
    handleEvent(methodName, model, event) {
        this.focusOnMouseEvent(methodName, model);
        const element = this.getTargetElement(model, event);
        if (!element) {
            return;
        }
        this.notifyListenersByRank(element, methodName, model, event);
    }
    async notifyListenersByRank(element, methodName, model, event) {
        for (const rank of this.rankedMouseListeners) {
            await this.dispatchActions(rank[1], methodName, element, event);
        }
    }
    async dispatchActions(mouseListeners, methodName, element, event) {
        const actions = mouseListeners
            .map(listener => listener[methodName].apply(listener, [element, event]))
            .reduce((a, b) => a.concat(b));
        if (actions.length > 0) {
            event.preventDefault();
            for (const actionOrPromise of actions) {
                if (protocol_1.isAction(actionOrPromise)) {
                    await this.actionDispatcher.dispatch(actionOrPromise);
                }
                else {
                    actionOrPromise.then((action) => {
                        this.actionDispatcher.dispatch(action);
                    });
                }
            }
        }
    }
};
RankingMouseTool = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.multiInject(sprotty_1.TYPES.MouseListener)), __param(0, inversify_1.optional()),
    __metadata("design:paramtypes", [Array])
], RankingMouseTool);
exports.RankingMouseTool = RankingMouseTool;
function groupBy(array, keyFunction) {
    const unsortedMap = array.reduce((result, item) => {
        const key = keyFunction(item);
        if (!result.has(key)) {
            result.set(key, [item]);
        }
        else {
            const entries = result.get(key);
            if (entries) {
                entries.push(item);
            }
        }
        return result;
    }, new Map());
    return new Map([...unsortedMap.entries()].sort());
}
function overwriteOn(vnode, event, listener, element) {
    const val = getOn(vnode);
    // ignore any previous val[event] registrations
    val[event] = [listener, element];
}
function getOn(vnode) {
    const data = getData(vnode);
    if (!data.on) {
        data.on = {};
    }
    return data.on;
}
function getData(vnode) {
    if (!vnode.data) {
        vnode.data = {};
    }
    return vnode.data;
}
//# sourceMappingURL=mouse-tool.js.map