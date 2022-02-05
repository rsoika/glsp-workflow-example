import { VNode } from 'snabbdom';
import { MouseListener, MouseTool, SModelElement, SModelRoot } from 'sprotty';
export interface IMouseTool {
    register(mouseListener: MouseListener): void;
    deregister(mouseListener: MouseListener): void;
}
export declare class RankingMouseTool extends MouseTool implements IMouseTool {
    protected mouseListeners: MouseListener[];
    protected rankedMouseListeners: Map<number, MouseListener[]>;
    constructor(mouseListeners?: MouseListener[]);
    register(mouseListener: MouseListener): void;
    deregister(mouseListener: MouseListener): void;
    decorate(vnode: VNode, element: SModelElement): VNode;
    contextMenu(model: SModelRoot, event: MouseEvent): void;
    protected handleEvent<K extends keyof MouseListener>(methodName: K, model: SModelRoot, event: MouseEvent): void;
    notifyListenersByRank<K extends keyof MouseListener>(element: SModelElement, methodName: K, model: SModelRoot, event: MouseEvent): Promise<void>;
    dispatchActions<K extends keyof MouseListener>(mouseListeners: MouseListener[], methodName: K, element: SModelElement, event: MouseEvent): Promise<void>;
}
//# sourceMappingURL=mouse-tool.d.ts.map