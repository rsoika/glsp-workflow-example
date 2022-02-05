"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNavigateToExternalTargetAction = exports.NavigateToExternalTargetAction = exports.isSetResolvedNavigationTargets = exports.SetResolvedNavigationTargetAction = exports.isResolveNavigationTargetAction = exports.ResolveNavigationTargetAction = exports.isNavigateToTargetAction = exports.NavigateToTargetAction = exports.isSetNavigationTargetsAction = exports.SetNavigationTargetsAction = exports.isRequestNavigationTargetsAction = exports.RequestNavigationTargetsAction = exports.NavigationTarget = void 0;
/********************************************************************************
 * Copyright (c) 2020-2021 EclipseSource and others.
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
const typeguard_util_1 = require("../utils/typeguard-util");
const base_protocol_1 = require("./base-protocol");
var NavigationTarget;
(function (NavigationTarget) {
    NavigationTarget.ELEMENT_IDS = 'elementIds';
    NavigationTarget.ELEMENT_IDS_SEPARATOR = '&';
    NavigationTarget.TEXT_LINE = 'line';
    NavigationTarget.TEXT_COLUMN = 'column';
    function hasArguments(target) {
        return target.args !== undefined && Object.keys(target.args).length > 0;
    }
    NavigationTarget.hasArguments = hasArguments;
    function addArgument(target, key, value) {
        if (target.args === undefined) {
            target.args = {};
        }
        target.args[key] = value;
    }
    NavigationTarget.addArgument = addArgument;
    function getElementIds(target) {
        if (target.args === undefined || target.args[NavigationTarget.ELEMENT_IDS] === undefined) {
            return [];
        }
        const elementIdsValue = target.args[NavigationTarget.ELEMENT_IDS].toString();
        return elementIdsValue.split(NavigationTarget.ELEMENT_IDS_SEPARATOR);
    }
    NavigationTarget.getElementIds = getElementIds;
    function setElementIds(target, elementIds) {
        if (target.args === undefined) {
            target.args = {};
        }
        return (target.args[NavigationTarget.ELEMENT_IDS] = elementIds.join(NavigationTarget.ELEMENT_IDS_SEPARATOR));
    }
    NavigationTarget.setElementIds = setElementIds;
    function setTextPosition(target, position) {
        if (position) {
            if (target.args === undefined) {
                target.args = {};
            }
            target.args[NavigationTarget.TEXT_LINE] = position.line;
            target.args[NavigationTarget.TEXT_COLUMN] = position.character;
        }
    }
    NavigationTarget.setTextPosition = setTextPosition;
    function getTextPosition(target) {
        if (target.args === undefined || target.args[NavigationTarget.TEXT_LINE] === undefined || target.args[NavigationTarget.TEXT_COLUMN] === undefined) {
            return undefined;
        }
        return {
            line: Number(target.args[NavigationTarget.TEXT_LINE]),
            character: Number(target.args[NavigationTarget.TEXT_COLUMN])
        };
    }
    NavigationTarget.getTextPosition = getTextPosition;
})(NavigationTarget = exports.NavigationTarget || (exports.NavigationTarget = {}));
/**
 * Action that is usually sent from the client to the server to request navigation targets for a specific navigation type such as
 * documentation or implementation in the given editor context.
 */
class RequestNavigationTargetsAction {
    constructor(targetTypeId, editorContext, requestId = base_protocol_1.generateRequestId()) {
        this.targetTypeId = targetTypeId;
        this.editorContext = editorContext;
        this.requestId = requestId;
        this.kind = RequestNavigationTargetsAction.KIND;
    }
}
exports.RequestNavigationTargetsAction = RequestNavigationTargetsAction;
RequestNavigationTargetsAction.KIND = 'requestNavigationTargets';
function isRequestNavigationTargetsAction(action) {
    return (base_protocol_1.isActionKind(action, RequestNavigationTargetsAction.KIND) &&
        typeguard_util_1.isString(action, 'targetTypeId') &&
        typeguard_util_1.isObject(action, 'editorContext') &&
        typeguard_util_1.isString(action, 'requestId'));
}
exports.isRequestNavigationTargetsAction = isRequestNavigationTargetsAction;
/**
 * Response action from the server following a {@link RequestNavigationTargetsAction}. It contains all available navigation targets for the
 * queried target type in the provided editor context. The server may also provide additional information using the arguments, e.g.,
 *  warnings, that can be interpreted by the client.
 */
class SetNavigationTargetsAction {
    constructor(targets, responseId = '', args) {
        this.targets = targets;
        this.responseId = responseId;
        this.args = args;
        this.kind = SetNavigationTargetsAction.KIND;
    }
}
exports.SetNavigationTargetsAction = SetNavigationTargetsAction;
SetNavigationTargetsAction.KIND = 'setNavigationTargets';
function isSetNavigationTargetsAction(action) {
    return base_protocol_1.isActionKind(action, SetNavigationTargetsAction.KIND) && typeguard_util_1.isArray(action, 'targets') && typeguard_util_1.isString(action, 'responseId');
}
exports.isSetNavigationTargetsAction = isSetNavigationTargetsAction;
/** Action that triggers the navigation to a particular navigation target, such as element IDs, queries, etc.. */
class NavigateToTargetAction {
    constructor(target) {
        this.target = target;
        this.kind = NavigateToTargetAction.KIND;
    }
}
exports.NavigateToTargetAction = NavigateToTargetAction;
NavigateToTargetAction.KIND = 'navigateToTarget';
function isNavigateToTargetAction(action) {
    return base_protocol_1.isActionKind(action, NavigateToTargetAction.KIND) && typeguard_util_1.isObject(action, 'target');
}
exports.isNavigateToTargetAction = isNavigateToTargetAction;
/**
 * If a client cannot navigate to a target directly, a {@link ResolveNavigationTargetAction} may be sent to the server to resolve the
 * navigation target to one or more model elements. This may be useful in cases where the resolution of each target is expensive or the
 * client architecture requires an indirection.
 */
class ResolveNavigationTargetAction {
    constructor(navigationTarget, requestId = base_protocol_1.generateRequestId()) {
        this.navigationTarget = navigationTarget;
        this.requestId = requestId;
        this.kind = ResolveNavigationTargetAction.KIND;
    }
}
exports.ResolveNavigationTargetAction = ResolveNavigationTargetAction;
ResolveNavigationTargetAction.KIND = 'resolveNavigationTarget';
function isResolveNavigationTargetAction(action) {
    return (base_protocol_1.isActionKind(action, ResolveNavigationTargetAction.KIND) && typeguard_util_1.isObject(action, 'navigationTarget') && typeguard_util_1.isString(action, 'requestId'));
}
exports.isResolveNavigationTargetAction = isResolveNavigationTargetAction;
/**
 * An action sent from the server in response to a {@link ResolveNavigationTargetAction}. The response contains the resolved element ids
 * for the given target and may contain additional information in the args property.
 */
class SetResolvedNavigationTargetAction {
    constructor(elementIds = [], args, responseId = '') {
        this.elementIds = elementIds;
        this.args = args;
        this.responseId = responseId;
        this.kind = SetResolvedNavigationTargetAction.KIND;
    }
}
exports.SetResolvedNavigationTargetAction = SetResolvedNavigationTargetAction;
SetResolvedNavigationTargetAction.KIND = 'setResolvedNavigationTarget';
function isSetResolvedNavigationTargets(action) {
    return base_protocol_1.isActionKind(action, SetResolvedNavigationTargetAction.KIND) && typeguard_util_1.isArray(action, 'elementIds') && typeguard_util_1.isString(action, 'responseId');
}
exports.isSetResolvedNavigationTargets = isSetResolvedNavigationTargets;
/**
 * If a {@link NavigationTarget} cannot be resolved or the resolved target is something that is not part of our model source, e.g.,
 * a separate documentation file, a {@link NavigateToExternalTargetAction} may be sent. Since the target it outside of the model scope such
 * an action would be typically handled by an integration layer (such as the surrounding IDE).
 */
class NavigateToExternalTargetAction {
    constructor(target) {
        this.target = target;
        this.kind = NavigateToExternalTargetAction.KIND;
    }
}
exports.NavigateToExternalTargetAction = NavigateToExternalTargetAction;
NavigateToExternalTargetAction.KIND = 'navigateToExternalTarget';
function isNavigateToExternalTargetAction(action) {
    return base_protocol_1.isActionKind(action, NavigateToExternalTargetAction.KIND) && typeguard_util_1.isObject(action, 'target');
}
exports.isNavigateToExternalTargetAction = isNavigateToExternalTargetAction;
//# sourceMappingURL=element-navigation.js.map