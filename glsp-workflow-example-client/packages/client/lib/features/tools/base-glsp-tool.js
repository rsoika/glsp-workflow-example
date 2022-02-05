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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseGLSPTool = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const editor_context_service_1 = require("../../base/editor-context-service");
const types_1 = require("../../base/types");
let BaseGLSPTool = class BaseGLSPTool {
    get isEditTool() {
        return true;
    }
    dispatchFeedback(actions, feedbackeEmitter) {
        this.feedbackDispatcher.registerFeedback(feedbackeEmitter ? feedbackeEmitter : this, actions);
    }
    dispatchActions(actions) {
        this.actionDispatcher.dispatchAll(actions);
    }
    deregisterFeedback(actions, feedbackeEmitter) {
        this.feedbackDispatcher.deregisterFeedback(feedbackeEmitter ? feedbackeEmitter : this, actions);
    }
};
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher),
    __metadata("design:type", Object)
], BaseGLSPTool.prototype, "feedbackDispatcher", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcher),
    __metadata("design:type", Object)
], BaseGLSPTool.prototype, "actionDispatcher", void 0);
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.MouseTool),
    __metadata("design:type", Object)
], BaseGLSPTool.prototype, "mouseTool", void 0);
__decorate([
    inversify_1.inject(sprotty_1.KeyTool),
    __metadata("design:type", sprotty_1.KeyTool)
], BaseGLSPTool.prototype, "keyTool", void 0);
__decorate([
    inversify_1.inject(editor_context_service_1.EditorContextService),
    __metadata("design:type", editor_context_service_1.EditorContextService)
], BaseGLSPTool.prototype, "editorContext", void 0);
BaseGLSPTool = __decorate([
    inversify_1.injectable()
], BaseGLSPTool);
exports.BaseGLSPTool = BaseGLSPTool;
//# sourceMappingURL=base-glsp-tool.js.map