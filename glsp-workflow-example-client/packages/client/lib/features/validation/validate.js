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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteMarkersCommand = exports.ApplyMarkersCommand = exports.ApplyMarkersAction = exports.SetMarkersCommand = exports.ExternalMarkerManager = exports.ValidationFeedbackEmitter = void 0;
/********************************************************************************
 * Copyright (c) 2019-2021 EclipseSource and others.
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
const protocol_1 = require("@eclipse-glsp/protocol");
const inversify_1 = require("inversify");
const sprotty_1 = require("sprotty");
const editor_context_service_1 = require("../../base/editor-context-service");
const types_1 = require("../../base/types");
const smodel_util_1 = require("../../utils/smodel-util");
const hover_1 = require("../hover/hover");
const model_1 = require("../tool-feedback/model");
const issue_marker_1 = require("./issue-marker");
/**
 * Feedback emitter sending actions for visualizing model validation feedback and
 * re-establishing this feedback visualization after the model has been updated.
 */
let ValidationFeedbackEmitter = class ValidationFeedbackEmitter {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() { }
    /**
     * Register the action that should be emitted for visualizing validation feedback.
     * @param action the action that should be emitted when the model is updated and that will visualize the model validation feedback.
     */
    registerValidationFeedbackAction(action) {
        // De-register old action responsible for applying markers and re-applying them when the model is updated
        this.feedbackActionDispatcher.deregisterFeedback(this, []);
        // Clear existing markers
        if (this.registeredAction !== undefined) {
            const deleteMarkersAction = new protocol_1.DeleteMarkersAction(this.registeredAction.markers);
            this.actionDispatcher().then(dispatcher => dispatcher.dispatch(deleteMarkersAction));
        }
        // Register new action responsible for applying markers and re-applying them when the model is updated
        this.feedbackActionDispatcher.registerFeedback(this, [action]);
        this.registeredAction = action;
    }
};
__decorate([
    inversify_1.inject(types_1.GLSP_TYPES.IFeedbackActionDispatcher),
    __metadata("design:type", Object)
], ValidationFeedbackEmitter.prototype, "feedbackActionDispatcher", void 0);
__decorate([
    inversify_1.inject(sprotty_1.TYPES.IActionDispatcherProvider),
    __metadata("design:type", Function)
], ValidationFeedbackEmitter.prototype, "actionDispatcher", void 0);
ValidationFeedbackEmitter = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [])
], ValidationFeedbackEmitter);
exports.ValidationFeedbackEmitter = ValidationFeedbackEmitter;
/**
 * Manages current markers for the outside of the GLSP.
 *
 * Typically this is rebound by the surrounding tool, e.g. Theia, to be aware of
 * and propagate current markers.
 */
let ExternalMarkerManager = class ExternalMarkerManager {
    connect(actionDispatcher) {
        this.actionDispatcher = actionDispatcher;
    }
    removeMarkers(markers) {
        if (this.actionDispatcher) {
            this.actionDispatcher.dispatch(new protocol_1.DeleteMarkersAction(markers));
        }
    }
};
ExternalMarkerManager = __decorate([
    inversify_1.injectable()
], ExternalMarkerManager);
exports.ExternalMarkerManager = ExternalMarkerManager;
/**
 * Command for handling `SetMarkersAction`
 */
let SetMarkersCommand = class SetMarkersCommand extends sprotty_1.Command {
    constructor(action) {
        super();
        this.action = action;
    }
    async execute(context) {
        const markers = this.action.markers;
        const uri = await this.editorContextService.getSourceUri();
        if (this.externalMarkerManager) {
            this.externalMarkerManager.setMarkers(markers, uri);
        }
        const applyMarkersAction = new ApplyMarkersAction(markers);
        this.validationFeedbackEmitter.registerValidationFeedbackAction(applyMarkersAction);
        return context.root;
    }
    undo(context) {
        return context.root;
    }
    redo(context) {
        return this.execute(context);
    }
};
SetMarkersCommand.KIND = protocol_1.SetMarkersAction.KIND;
__decorate([
    inversify_1.inject(ValidationFeedbackEmitter),
    __metadata("design:type", ValidationFeedbackEmitter)
], SetMarkersCommand.prototype, "validationFeedbackEmitter", void 0);
__decorate([
    inversify_1.inject(ExternalMarkerManager),
    inversify_1.optional(),
    __metadata("design:type", ExternalMarkerManager)
], SetMarkersCommand.prototype, "externalMarkerManager", void 0);
__decorate([
    inversify_1.inject(editor_context_service_1.EditorContextService),
    __metadata("design:type", editor_context_service_1.EditorContextService)
], SetMarkersCommand.prototype, "editorContextService", void 0);
SetMarkersCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [protocol_1.SetMarkersAction])
], SetMarkersCommand);
exports.SetMarkersCommand = SetMarkersCommand;
/**
 * Action for applying makers to a model
 */
let ApplyMarkersAction = class ApplyMarkersAction {
    constructor(markers, kind = ApplyMarkersCommand.KIND) {
        this.markers = markers;
        this.kind = kind;
    }
};
ApplyMarkersAction = __decorate([
    inversify_1.injectable(),
    __metadata("design:paramtypes", [Array, Object])
], ApplyMarkersAction);
exports.ApplyMarkersAction = ApplyMarkersAction;
/**
 * Command for handling `ApplyMarkersAction`
 */
let ApplyMarkersCommand = class ApplyMarkersCommand extends model_1.FeedbackCommand {
    constructor(action) {
        super();
        this.action = action;
        this.priority = 0;
    }
    execute(context) {
        const markers = this.action.markers;
        for (const marker of markers) {
            const modelElement = context.root.index.getById(marker.elementId);
            if (modelElement instanceof sprotty_1.SParentElement) {
                const issueMarker = issue_marker_1.getOrCreateSIssueMarker(modelElement);
                const issue = issue_marker_1.createSIssue(marker);
                issueMarker.issues.push(issue);
                addMaxSeverityCSSClassToIssueParent(modelElement, issueMarker);
            }
        }
        return context.root;
    }
    undo(context) {
        return context.root;
    }
    redo(context) {
        return this.execute(context);
    }
};
ApplyMarkersCommand.KIND = 'applyMarkers';
ApplyMarkersCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [ApplyMarkersAction])
], ApplyMarkersCommand);
exports.ApplyMarkersCommand = ApplyMarkersCommand;
function addMaxSeverityCSSClassToIssueParent(modelElement, issueMarker) {
    const maxSeverityCSSClass = hover_1.getSeverity(issueMarker);
    if (!modelElement.cssClasses) {
        modelElement.cssClasses = [maxSeverityCSSClass];
    }
    else {
        modelElement.cssClasses = modelElement.cssClasses.filter((value) => !value.match('info|warning|error'));
        modelElement.cssClasses.push(maxSeverityCSSClass);
    }
}
function removeCSSClassFromIssueParent(modelElement, issueMarker) {
    smodel_util_1.removeCssClasses(modelElement, [hover_1.getSeverity(issueMarker)]);
}
/**
 * Command for handling `DeleteMarkersAction`
 */
let DeleteMarkersCommand = class DeleteMarkersCommand extends sprotty_1.Command {
    constructor(action) {
        super();
        this.action = action;
    }
    execute(context) {
        const markers = this.action.markers;
        for (const marker of markers) {
            const modelElement = context.root.index.getById(marker.elementId);
            if (modelElement instanceof sprotty_1.SParentElement) {
                const issueMarker = issue_marker_1.getSIssueMarker(modelElement);
                if (issueMarker !== undefined) {
                    removeCSSClassFromIssueParent(modelElement, issueMarker);
                    for (let index = 0; index < issueMarker.issues.length; ++index) {
                        const issue = issueMarker.issues[index];
                        if (issue.message === marker.description) {
                            issueMarker.issues.splice(index--, 1);
                        }
                    }
                    if (issueMarker.issues.length === 0) {
                        modelElement.remove(issueMarker);
                    }
                    else {
                        addMaxSeverityCSSClassToIssueParent(modelElement, issueMarker);
                    }
                }
            }
        }
        return context.root;
    }
    undo(context) {
        return context.root;
    }
    redo(context) {
        return this.execute(context);
    }
};
DeleteMarkersCommand.KIND = protocol_1.DeleteMarkersAction.KIND;
DeleteMarkersCommand = __decorate([
    inversify_1.injectable(),
    __param(0, inversify_1.inject(sprotty_1.TYPES.Action)),
    __metadata("design:paramtypes", [protocol_1.DeleteMarkersAction])
], DeleteMarkersCommand);
exports.DeleteMarkersCommand = DeleteMarkersCommand;
//# sourceMappingURL=validate.js.map