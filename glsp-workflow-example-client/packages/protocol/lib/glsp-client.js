"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GLSPClient = exports.ClientState = exports.ApplicationIdProvider = void 0;
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
const uuid = require("uuid");
class ApplicationIdProvider {
    static get() {
        if (!ApplicationIdProvider._applicationId) {
            ApplicationIdProvider._applicationId = uuid.v4();
        }
        return ApplicationIdProvider._applicationId;
    }
}
exports.ApplicationIdProvider = ApplicationIdProvider;
// eslint-disable-next-line no-shadow
var ClientState;
(function (ClientState) {
    /**
     * The client has been created.
     */
    ClientState[ClientState["Initial"] = 0] = "Initial";
    /**
     * `Start` has been called on the client and the start process is still on-going.
     */
    ClientState[ClientState["Starting"] = 1] = "Starting";
    /**
     * The client failed to complete the start process.
     */
    ClientState[ClientState["StartFailed"] = 2] = "StartFailed";
    /**
     * The client was successfully started and is now running.
     */
    ClientState[ClientState["Running"] = 3] = "Running";
    /**
     * `Stop` has been called on the client and the stop process is still on-going.
     */
    ClientState[ClientState["Stopping"] = 4] = "Stopping";
    /**
     * The client stopped and disposed the server connection. Thus, action messages can no longer be sent.
     */
    ClientState[ClientState["Stopped"] = 5] = "Stopped";
    /**
     * An error was encountered while connecting to the server. No action messages can be sent.
     */
    ClientState[ClientState["ServerError"] = 6] = "ServerError";
})(ClientState = exports.ClientState || (exports.ClientState = {}));
var GLSPClient;
(function (GLSPClient) {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    function isOptions(object) {
        return typeof object === 'object' && 'id' in object && typeof object['id'] === 'string';
    }
    GLSPClient.isOptions = isOptions;
    GLSPClient.protocolVersion = '0.9.0';
})(GLSPClient = exports.GLSPClient || (exports.GLSPClient = {}));
//# sourceMappingURL=glsp-client.js.map