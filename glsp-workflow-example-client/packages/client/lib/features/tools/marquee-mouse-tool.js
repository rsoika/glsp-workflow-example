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
var MarqueeMouseTool_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShiftKeyListener = exports.MarqueeMouseListener = exports.MarqueeMouseTool = void 0;
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
const protocol_1 = require("@eclipse-glsp/protocol");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const dom_helper_1 = require("sprotty/lib/base/views/dom-helper");
const types_1 = require("../../base/types");
const drag_aware_mouse_listener_1 = require("../../base/drag-aware-mouse-listener");
const viewpoint_util_1 = require("../../utils/viewpoint-util");
const css_feedback_1 = require("../tool-feedback/css-feedback");
const marquee_tool_feedback_1 = require("../tool-feedback/marquee-tool-feedback");
const base_glsp_tool_1 = require("./base-glsp-tool");
const marquee_behavior_1 = require("./marquee-behavior");
let MarqueeMouseTool = MarqueeMouseTool_1 = class MarqueeMouseTool extends base_glsp_tool_1.BaseGLSPTool {
    constructor() {
        super(...arguments);
        this.shiftKeyListener = new ShiftKeyListener();
    }
    get id() {
        return MarqueeMouseTool_1.ID;
    }
    enable() {
        this.marqueeMouseListener = new MarqueeMouseListener(this.domHelper, this.editorContext.modelRoot, this.marqueeBehavior);
        this.mouseTool.register(this.marqueeMouseListener);
        this.keyTool.register(this.shiftKeyListener);
        this.dispatchFeedback([css_feedback_1.cursorFeedbackAction(css_feedback_1.CursorCSS.MARQUEE)]);
    }
    disable() {
        this.mouseTool.deregister(this.marqueeMouseListener);
        this.keyTool.deregister(this.shiftKeyListener);
        this.deregisterFeedback([css_feedback_1.cursorFeedbackAction()]);
    }
};
MarqueeMouseTool.ID = 'glsp.marquee-mouse-tool';
__decorate([
    inversify_1.inject(sprotty_1.TYPES.DOMHelper),
    __metadata("design:type", dom_helper_1.DOMHelper)
], MarqueeMouseTool.prototype, "domHelper", void 0);
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IMarqueeBehavior),
    inversify_1.optional(),
    __metadata("design:type", Object)
], MarqueeMouseTool.prototype, "marqueeBehavior", void 0);
MarqueeMouseTool = MarqueeMouseTool_1 = __decorate([
    inversify_1.injectable()
], MarqueeMouseTool);
exports.MarqueeMouseTool = MarqueeMouseTool;
class MarqueeMouseListener extends drag_aware_mouse_listener_1.DragAwareMouseListener {
    constructor(domHelper, root, marqueeBehavior) {
        super();
        this.isActive = false;
        this.domHelper = domHelper;
        this.marqueeUtil = new marquee_behavior_1.MarqueeUtil(marqueeBehavior);
        this.nodes = Array.from(root.index
            .all()
            .map(e => e)
            .filter(e => sprotty_1.isSelectable(e))
            .filter(e => e instanceof sprotty_1.SNode));
        const sEdges = Array.from(root.index
            .all()
            .filter(e => e instanceof sprotty_1.SEdge)
            .filter(e => sprotty_1.isSelectable(e))
            .map(e => e.id));
        this.edges = Array.from(document.querySelectorAll('g')).filter(e => sEdges.includes(this.domHelper.findSModelIdByDOMElement(e)));
    }
    mouseDown(target, event) {
        this.isActive = true;
        this.marqueeUtil.updateStartPoint(viewpoint_util_1.getAbsolutePosition(target, event));
        if (event.ctrlKey) {
            this.previouslySelected = Array.from(target.root.index
                .all()
                .map(e => e)
                .filter(e => sprotty_1.isSelected(e))
                .map(e => e.id));
        }
        return [];
    }
    mouseMove(target, event) {
        this.marqueeUtil.updateCurrentPoint(viewpoint_util_1.getAbsolutePosition(target, event));
        if (this.isActive) {
            const nodeIdsSelected = this.nodes.filter(e => this.marqueeUtil.isNodeMarked(viewpoint_util_1.toAbsoluteBounds(e))).map(e => e.id);
            const edgeIdsSelected = this.edges.filter(e => this.isEdgeMarked(e)).map(e => this.domHelper.findSModelIdByDOMElement(e));
            const selected = nodeIdsSelected.concat(edgeIdsSelected);
            return [
                new protocol_1.SelectAction([], Array.from(target.root.index.all().map(e => e.id))),
                new protocol_1.SelectAction(selected.concat(this.previouslySelected), []),
                this.marqueeUtil.drawMarqueeAction()
            ];
        }
        return [];
    }
    mouseUp(target, event) {
        this.isActive = false;
        if (event.shiftKey) {
            return [new marquee_tool_feedback_1.RemoveMarqueeAction()];
        }
        return [new marquee_tool_feedback_1.RemoveMarqueeAction(), new sprotty_1.EnableDefaultToolsAction()];
    }
    isEdgeMarked(element) {
        if (!element.getAttribute('transform')) {
            if (element.children[0]) {
                const path = element.children[0].getAttribute('d');
                return this.marqueeUtil.isEdgePathMarked(path);
            }
        }
        return false;
    }
}
exports.MarqueeMouseListener = MarqueeMouseListener;
let ShiftKeyListener = class ShiftKeyListener extends sprotty_1.KeyListener {
    keyUp(element, event) {
        if (event.shiftKey) {
            return [];
        }
        return [new marquee_tool_feedback_1.RemoveMarqueeAction(), new sprotty_1.EnableDefaultToolsAction()];
    }
};
ShiftKeyListener = __decorate([
    inversify_1.injectable()
], ShiftKeyListener);
exports.ShiftKeyListener = ShiftKeyListener;
//# sourceMappingURL=marquee-mouse-tool.js.map