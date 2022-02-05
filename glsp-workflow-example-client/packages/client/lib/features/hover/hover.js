"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSeverity = exports.GlspHoverMouseListener = void 0;
/********************************************************************************
 * Copyright (c) 2020-2022 EclipseSource and others.
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
const focus_change_action_1 = require("../../base/actions/focus-change-action");
const issue_marker_1 = require("../validation/issue-marker");
let GlspHoverMouseListener = class GlspHoverMouseListener extends sprotty_1.HoverMouseListener {
    /**
     * Stops mouse over timer and remove hover feedback, if focus is lost.
     *
     * This fixes strange effects that appear if the mouse left the element via e.g. a context menu,
     * which explicitly removes the focus of the diagram.
     * @see SelectionServiceAwareContextMenuMouseListener
     * @param action should be a `FocusStateChangedAction`
     * @returns a `HoverFeedbackAction` resetting the state, if the specified action indicates lost focus
     */
    handle(action) {
        if (focus_change_action_1.isFocusStateChangedAction(action) && !action.hasFocus) {
            this.stopMouseOverTimer();
            if (this.lastHoverFeedbackElementId) {
                const previousTargetId = this.lastHoverFeedbackElementId;
                this.lastHoverFeedbackElementId = undefined;
                return new sprotty_1.HoverFeedbackAction(previousTargetId, false);
            }
        }
    }
    startMouseOverTimer(target, event) {
        this.stopMouseOverTimer();
        return new Promise(resolve => {
            this.state.mouseOverTimer = window.setTimeout(() => {
                const popupBounds = this.computePopupBounds(target, { x: event.pageX, y: event.pageY });
                if (target instanceof issue_marker_1.GIssueMarker) {
                    resolve(new protocol_1.SetPopupModelAction(this.createPopupModel(target, popupBounds)));
                }
                else {
                    resolve(new protocol_1.RequestPopupModelAction(target.id, popupBounds));
                }
                this.state.popupOpen = true;
                this.state.previousPopupElement = target;
            }, this.options.popupOpenDelay);
        });
    }
    createPopupModel(marker, bounds) {
        if (marker.issues !== undefined && marker.issues.length > 0) {
            return {
                type: 'html',
                id: 'sprotty-popup',
                children: [this.createMarkerIssuePopup(marker)],
                canvasBounds: this.modifyBounds(bounds)
            };
        }
        return { type: sprotty_1.EMPTY_ROOT.type, id: sprotty_1.EMPTY_ROOT.id };
    }
    createMarkerIssuePopup(marker) {
        const message = this.createIssueMessage(marker);
        return {
            type: 'pre-rendered',
            id: 'popup-title',
            code: `<div class="${getSeverity(marker)}"><div class="sprotty-popup-title">${message}</div></div>`
        };
    }
    createIssueMessage(marker) {
        return '<ul>' + marker.issues.map(i => '<li>' + i.severity.toUpperCase() + ': ' + i.message + '</li>').join('') + '</ul>';
    }
    modifyBounds(bounds) {
        return bounds;
    }
};
GlspHoverMouseListener = __decorate([
    inversify_1.injectable()
], GlspHoverMouseListener);
exports.GlspHoverMouseListener = GlspHoverMouseListener;
function getSeverity(marker) {
    let currentSeverity = 'info';
    for (const severity of marker.issues.map(s => s.severity)) {
        if (severity === 'error') {
            return severity;
        }
        if (severity === 'warning' && currentSeverity === 'info') {
            currentSeverity = severity;
        }
    }
    return currentSeverity;
}
exports.getSeverity = getSeverity;
//# sourceMappingURL=hover.js.map