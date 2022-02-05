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
var MarqueeTool_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarqueeKeyListener = exports.MarqueeTool = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const base_glsp_tool_1 = require("../tools/base-glsp-tool");
const marquee_mouse_tool_1 = require("./marquee-mouse-tool");
let MarqueeTool = MarqueeTool_1 = class MarqueeTool extends base_glsp_tool_1.BaseGLSPTool {
    constructor() {
        super(...arguments);
        this.marqueeKeyListener = new MarqueeKeyListener();
    }
    get id() {
        return MarqueeTool_1.ID;
    }
    enable() {
        this.keyTool.register(this.marqueeKeyListener);
    }
    disable() {
        this.keyTool.deregister(this.marqueeKeyListener);
    }
};
MarqueeTool.ID = 'glsp.marquee-tool';
__decorate([
    inversify_1.inject(sprotty_1.KeyTool),
    __metadata("design:type", sprotty_1.KeyTool)
], MarqueeTool.prototype, "keytool", void 0);
MarqueeTool = MarqueeTool_1 = __decorate([
    inversify_1.injectable()
], MarqueeTool);
exports.MarqueeTool = MarqueeTool;
let MarqueeKeyListener = class MarqueeKeyListener extends sprotty_1.KeyListener {
    keyDown(element, event) {
        if (event.shiftKey) {
            return [new sprotty_1.EnableToolsAction([marquee_mouse_tool_1.MarqueeMouseTool.ID])];
        }
        return [];
    }
};
MarqueeKeyListener = __decorate([
    inversify_1.injectable()
], MarqueeKeyListener);
exports.MarqueeKeyListener = MarqueeKeyListener;
//# sourceMappingURL=marquee-tool.js.map