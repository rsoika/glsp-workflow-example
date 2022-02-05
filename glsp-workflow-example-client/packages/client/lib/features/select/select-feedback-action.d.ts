import { Command, CommandExecutionContext, SModelRoot } from 'sprotty';
export declare class SelectFeedbackAction {
    readonly selectedElementsIDs: string[];
    readonly deselectedElementsIDs: string[];
    readonly kind: string;
    constructor(selectedElementsIDs?: string[], deselectedElementsIDs?: string[], kind?: string);
}
export declare class SelectAllFeedbackAction {
    readonly select: boolean;
    readonly kind: string;
    /**
     * If `select` is true, all elements are selected, othewise they are deselected.
     */
    constructor(select?: boolean, kind?: string);
}
export declare class SelectFeedbackCommand extends Command {
    action: SelectFeedbackAction;
    static readonly KIND = "elementSelectedFeedback";
    private sprottySelectCommand;
    constructor(action: SelectFeedbackAction);
    execute(context: CommandExecutionContext): SModelRoot;
    undo(context: CommandExecutionContext): SModelRoot;
    redo(context: CommandExecutionContext): SModelRoot;
}
export declare class SelectAllFeedbackCommand extends Command {
    action: SelectAllFeedbackAction;
    static readonly KIND = "allSelectedFeedback";
    private sprottySelectAllCommand;
    constructor(action: SelectAllFeedbackAction);
    execute(context: CommandExecutionContext): SModelRoot;
    undo(context: CommandExecutionContext): SModelRoot;
    redo(context: CommandExecutionContext): SModelRoot;
}
//# sourceMappingURL=select-feedback-action.d.ts.map