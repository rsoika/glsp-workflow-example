"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLabeledAction = exports.LabeledAction = exports.EMPTY_BOUNDS = exports.EMPTY_DIMENSION = exports.ORIGIN_POINT = void 0;
exports.ORIGIN_POINT = Object.freeze({
    x: 0,
    y: 0
});
exports.EMPTY_DIMENSION = Object.freeze({
    width: -1,
    height: -1
});
exports.EMPTY_BOUNDS = Object.freeze(Object.assign(Object.assign({}, exports.EMPTY_DIMENSION), exports.ORIGIN_POINT));
/**
 *Labeled actions are used to denote a group of actions in a user-interface context, e.g., to define an entry in the command palette or
 *in the context menu.
 */
class LabeledAction {
    constructor(label, actions, icon) {
        this.label = label;
        this.actions = actions;
        this.icon = icon;
    }
}
exports.LabeledAction = LabeledAction;
function isLabeledAction(element) {
    return element !== undefined && typeof element === 'object' && 'label' in element && 'actions' in element;
}
exports.isLabeledAction = isLabeledAction;
//# sourceMappingURL=types.js.map