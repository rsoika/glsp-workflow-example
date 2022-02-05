import { Action } from './base-protocol';
export declare type ServerSeverity = 'NONE' | 'INFO' | 'WARNING' | 'ERROR' | 'FATAL' | 'OK';
/**
 * This action is typically sent by the server to signal a state change. This action extends the corresponding Sprotty action to include
 * a timeout. If a timeout is given the respective status should disappear after the timeout is reached.
 */
export declare class GLSPServerStatusAction implements Action {
    severity: ServerSeverity;
    message: string;
    timeout: number;
    readonly kind: string;
    static KIND: string;
    constructor(severity: ServerSeverity, message: string, timeout?: number, kind?: string);
}
export declare function isGLSPServerStatusAction(action: any): action is GLSPServerStatusAction;
/**
 * This action is typically sent by the server to notify the user about something of interest.
 */
export declare class ServerMessageAction implements Action {
    severity: ServerSeverity;
    message: string;
    details?: string | undefined;
    timeout: number;
    readonly kind: string;
    static KIND: string;
    constructor(severity: ServerSeverity, message: string, details?: string | undefined, timeout?: number, kind?: string);
}
export declare function isServerMessageAction(action?: any): action is ServerMessageAction;
//# sourceMappingURL=client-notification.d.ts.map