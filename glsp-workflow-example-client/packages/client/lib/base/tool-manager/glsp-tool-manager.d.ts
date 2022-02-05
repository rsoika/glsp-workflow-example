import { Tool, ToolManager } from 'sprotty';
import { EditModeListener, EditorContextService, EditorContextServiceProvider } from '../editor-context-service';
export interface IGLSPToolManager extends ToolManager {
    disableEditTools(): void;
}
export declare class GLSPToolManager extends ToolManager implements IGLSPToolManager, EditModeListener {
    protected editorContext?: EditorContextService;
    tools: Tool[];
    defaultTools: Tool[];
    contextServiceProvider: EditorContextServiceProvider;
    protected initialize(): void;
    registerDefaultTools(...tools: Tool[]): void;
    registerTools(...tools: Tool[]): void;
    enable(toolIds: string[]): void;
    disableEditTools(): void;
    editModeChanged(oldValue: string, newValue: string): void;
}
export interface GLSPTool extends Tool {
    isEditTool: boolean;
}
export declare function isGLSPTool(tool: Tool): tool is GLSPTool;
//# sourceMappingURL=glsp-tool-manager.d.ts.map