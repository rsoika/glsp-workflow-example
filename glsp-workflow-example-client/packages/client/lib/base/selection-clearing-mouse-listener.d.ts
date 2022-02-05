import { MouseListener, SModelElement } from 'sprotty';
/**
 * A mouse listener that clears the document selection on click
 *
 * Clicking on SVG elements doesn't update the document selection. In the context of diagramming
 * with GLSP, this is unnatural, as the user would expect that clicking in the diagram (e.g. to
 * select a diagram element) would clear any other selection state in the DOM. From a technical
 * point of view, an active selection in the document after clicking into the diagram may also
 * lead to bogus target elements in certain browser events, such as clipboard events, etc.
 *
 * This listener helps to overcome this problem by actively clearing any existing selection in
 * the document, if the user clicks into the diagram.
 */
export declare class SelectionClearingMouseListener extends MouseListener {
    mouseDown(_target: SModelElement, event: MouseEvent): never[];
}
//# sourceMappingURL=selection-clearing-mouse-listener.d.ts.map