import { KeyListener, KeyTool, Tool } from 'sprotty';
export declare class CommandPaletteTool implements Tool {
    static ID: string;
    protected commandPaletteKeyListener: KeyListener;
    protected keyTool: KeyTool;
    protected postConstruct(): void;
    get id(): string;
    enable(): void;
    disable(): void;
    protected createCommandPaleteKeyListener(): KeyListener;
}
//# sourceMappingURL=command-palette-tool.d.ts.map