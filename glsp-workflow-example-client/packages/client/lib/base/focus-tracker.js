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
exports.FocusTracker = void 0;
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const focus_change_action_1 = require("./actions/focus-change-action");
let FocusTracker = class FocusTracker {
    constructor() {
        this.inActiveCssClass = 'inactive';
        this._hasFocus = true;
    }
    get hasFocus() {
        return this._hasFocus;
    }
    handle(action) {
        if (focus_change_action_1.isFocusStateChangedAction(action)) {
            this._hasFocus = action.hasFocus;
            const placeholder = document.getElementById(this.options.baseDiv);
            if (!placeholder) {
                return;
            }
            if (this.hasFocus) {
                if (placeholder.classList.contains(this.inActiveCssClass)) {
                    placeholder.classList.remove(this.inActiveCssClass);
                }
            }
            else {
                placeholder.classList.add(this.inActiveCssClass);
            }
        }
    }
};
__decorate([
    inversify_1.inject(sprotty_1.TYPES.ViewerOptions),
    __metadata("design:type", Object)
], FocusTracker.prototype, "options", void 0);
FocusTracker = __decorate([
    inversify_1.injectable()
], FocusTracker);
exports.FocusTracker = FocusTracker;
//# sourceMappingURL=focus-tracker.js.map