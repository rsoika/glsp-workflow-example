import { Action, ContextMenuProviderRegistry, IContextMenuServiceProvider, MouseListener, SModelElement } from 'sprotty';
import { SelectionService } from '../select/selection-service';
export declare class SelectionServiceAwareContextMenuMouseListener extends MouseListener {
    protected readonly contextMenuService: IContextMenuServiceProvider;
    protected readonly menuProvider: ContextMenuProviderRegistry;
    protected selectionService: SelectionService;
    /**
     * Opens the context menu on right-click.
     */
    mouseDown(target: SModelElement, event: MouseEvent): (Action | Promise<Action>)[];
    /**
     * Opens the context menu.
     *
     *   - query the element on the click-target
     *   - select the element
     *   - query the context menu service and the context menu elements
     *   - show the context menu
     *   - send a focus state change to indicate that the diagram becomes inactive, once the context menu is shown
     *
     * When the context menu is closed, we focus the diagram element again.
     */
    protected openContextMenu(event: MouseEvent, target: SModelElement): Promise<Action>[];
    protected focusEventTarget(event: MouseEvent): void;
}
//# sourceMappingURL=selection-service-aware-context-menu-mouse-listener.d.ts.map