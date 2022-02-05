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
exports.FeedbackActionDispatcher = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
let FeedbackActionDispatcher = class FeedbackActionDispatcher {
    constructor() {
        this.feedbackEmitters = new Map();
    }
    registerFeedback(feedbackEmitter, actions) {
        this.feedbackEmitters.set(feedbackEmitter, actions);
        this.dispatch(actions, feedbackEmitter);
    }
    deregisterFeedback(feedbackEmitter, actions) {
        this.feedbackEmitters.delete(feedbackEmitter);
        this.dispatch(actions, feedbackEmitter);
    }
    dispatch(actions, feedbackEmitter) {
        this.actionDispatcher()
            .then(dispatcher => dispatcher.dispatchAll(actions))
            .then(() => this.logger.info(this, `Dispatched feedback actions for ${feedbackEmitter}`))
            .catch(reason => this.logger.error(this, 'Failed to dispatch feedback actions', reason));
    }
    getRegisteredFeedback() {
        const result = [];
        this.feedbackEmitters.forEach((value, key) => result.push(...value));
        return result;
    }
    getRegisteredFeedbackEmitters(action) {
        const result = [];
        this.feedbackEmitters.forEach((value, key) => {
            if (value.find(a => a === action)) {
                result.push(key);
            }
        });
        return result;
    }
};
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcherProvider),
    __metadata("design:type", Function)
], FeedbackActionDispatcher.prototype, "actionDispatcher", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ILogger),
    __metadata("design:type", Object)
], FeedbackActionDispatcher.prototype, "logger", void 0);
FeedbackActionDispatcher = __decorate([
    inversify_1.injectable()
], FeedbackActionDispatcher);
exports.FeedbackActionDispatcher = FeedbackActionDispatcher;
//# sourceMappingURL=feedback-action-dispatcher.js.map