"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isFocusStateChangedAction = exports.FocusStateChangedAction = void 0;
class FocusStateChangedAction {
    constructor(hasFocus) {
        this.hasFocus = hasFocus;
        this.kind = FocusStateChangedAction.KIND;
    }
}
exports.FocusStateChangedAction = FocusStateChangedAction;
FocusStateChangedAction.KIND = 'focusStateChanged';
function isFocusStateChangedAction(action) {
    return action.kind === FocusStateChangedAction.KIND;
}
exports.isFocusStateChangedAction = isFocusStateChangedAction;
//# sourceMappingURL=focus-change-action.js.map