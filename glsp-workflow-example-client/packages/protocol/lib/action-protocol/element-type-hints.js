"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isSetTypeHintsAction = exports.SetTypeHintsAction = exports.isRequestTypeHintsAction = exports.RequestTypeHintsAction = void 0;
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
/**
 * Sent from the client to the server in order to request hints on whether certain modifications are allowed for a specific element type.
 * The `RequestTypeHintsAction` is optional, but should usually be among the first messages sent from the client to the server after
 * receiving the model via RequestModelAction. The response is a {@link SetTypeHintsAction}.
 */
class RequestTypeHintsAction {
    constructor(requestId = '', kind = RequestTypeHintsAction.KIND) {
        this.requestId = requestId;
        this.kind = kind;
    }
}
exports.RequestTypeHintsAction = RequestTypeHintsAction;
RequestTypeHintsAction.KIND = 'requestTypeHints';
function isRequestTypeHintsAction(action) {
    return base_protocol_1.isActionKind(action, RequestTypeHintsAction.KIND);
}
exports.isRequestTypeHintsAction = isRequestTypeHintsAction;
/**
 * Sent from the server to the client in order to provide hints certain modifications are allowed for a specific element type.
 */
class SetTypeHintsAction {
    constructor(shapeHints, edgeHints, responseId = '', kind = SetTypeHintsAction.KIND) {
        this.shapeHints = shapeHints;
        this.edgeHints = edgeHints;
        this.responseId = responseId;
        this.kind = kind;
    }
}
exports.SetTypeHintsAction = SetTypeHintsAction;
SetTypeHintsAction.KIND = 'setTypeHints';
function isSetTypeHintsAction(action) {
    return base_protocol_1.isActionKind(action, SetTypeHintsAction.KIND) && typeguard_util_1.isArray(action, 'shapeHints') && typeguard_util_1.isArray(action, 'edgeHints');
}
exports.isSetTypeHintsAction = isSetTypeHintsAction;
//# sourceMappingURL=element-type-hints.js.map