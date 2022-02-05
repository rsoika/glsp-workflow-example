"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSaveable = exports.saveFeature = void 0;
exports.saveFeature = Symbol.for('saveFeature');
function isSaveable(element) {
    return element.hasFeature(exports.saveFeature);
}
exports.isSaveable = isSaveable;
//# sourceMappingURL=model.js.map