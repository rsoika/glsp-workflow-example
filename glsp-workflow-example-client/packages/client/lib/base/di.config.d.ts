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
import { InitializeResult } from '@eclipse-glsp/protocol';
import '@vscode/codicons/dist/codicon.css';
import { Container, ContainerModule } from 'inversify';
import '../../css/glsp-sprotty.css';
declare const defaultGLSPModule: ContainerModule;
export default defaultGLSPModule;
/**
 * Utility function to configure the {@link ModelSource}, i.e. the `DiagramServer`, as action handler for all server actions for the given
 * diagramType.
 * @param result A promise that resolves after all server actions have been registered.
 * @param diagramType The diagram type.
 * @param container The di container.
 */
export declare function configureServerActions(result: InitializeResult, diagramType: string, container: Container): Promise<void>;
//# sourceMappingURL=di.config.d.ts.map