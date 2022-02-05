import { IContextMenuItemProvider, MenuItem, Point, SModelRoot } from 'sprotty';
import { EditorContextService, EditorContextServiceProvider } from '../../base/editor-context-service';
export declare class DeleteElementContextMenuItemProvider implements IContextMenuItemProvider {
    editorContextServiceProvider: EditorContextServiceProvider;
    getItems(_root: Readonly<SModelRoot>, _lastMousePosition?: Point): Promise<MenuItem[]>;
    protected createDeleteMenuItem(editorContextService: EditorContextService): MenuItem;
}
//# sourceMappingURL=delete-element-context-menu.d.ts.map