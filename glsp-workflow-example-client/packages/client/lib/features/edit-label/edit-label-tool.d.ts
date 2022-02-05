import { KeyListener, MouseListener } from 'sprotty';
import { BaseGLSPTool } from '../tools/base-glsp-tool';
export declare class DirectLabelEditTool extends BaseGLSPTool {
    static readonly ID = "glsp.direct-label-edit-tool";
    protected editLabelMouseListener: MouseListener;
    protected editLabelKeyListener: KeyListener;
    get id(): string;
    protected createEditLabelMouseListener(): MouseListener;
    protected createEditLabelKeyListener(): KeyListener;
    enable(): void;
    disable(): void;
}
//# sourceMappingURL=edit-label-tool.d.ts.map