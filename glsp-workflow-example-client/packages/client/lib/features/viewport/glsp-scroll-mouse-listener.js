"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLSPScrollMouseListener = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const marquee_mouse_tool_1 = require("../tools/marquee-mouse-tool");
let GLSPScrollMouseListener = class GLSPScrollMouseListener extends sprotty_1.ScrollMouseListener {
    constructor() {
        super(...arguments);
        this.preventScrolling = false;
    }
    handle(action) {
        if (action instanceof sprotty_1.EnableToolsAction) {
            if (action.toolIds.includes(marquee_mouse_tool_1.MarqueeMouseTool.ID)) {
                this.preventScrolling = true;
            }
        }
        else if (action instanceof sprotty_1.EnableDefaultToolsAction) {
            this.preventScrolling = false;
        }
    }
    mouseDown(target, event) {
        if (this.preventScrolling) {
            return [];
        }
        return super.mouseDown(target, event);
    }
};
GLSPScrollMouseListener = __decorate([
    inversify_1.injectable()
], GLSPScrollMouseListener);
exports.GLSPScrollMouseListener = GLSPScrollMouseListener;
//# sourceMappingURL=glsp-scroll-mouse-listener.js.map