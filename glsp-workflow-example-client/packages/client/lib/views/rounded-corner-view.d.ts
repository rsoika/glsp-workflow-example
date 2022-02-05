import { Classes, VNode } from 'snabbdom';
import { Hoverable, RectangularNodeView, RenderingContext, Selectable, SShapeElement } from 'sprotty';
import { RoundedCornerWrapper } from './rounded-corner';
export declare class RoundedCornerNodeView extends RectangularNodeView {
    render(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode | undefined;
    protected renderWithoutRadius(node: Readonly<SShapeElement & Hoverable & Selectable>, context: RenderingContext): VNode | undefined;
    protected getClipPathInsets(): number | undefined;
    protected renderPathNode(wrapper: Readonly<RoundedCornerWrapper>, context: RenderingContext): VNode;
    protected additionalClasses(_node: Readonly<SShapeElement & Hoverable & Selectable>, _context: RenderingContext): Classes;
    protected renderPath(wrapper: Readonly<RoundedCornerWrapper>, _context: RenderingContext, inset: number): string;
}
export declare function toClipPathId(node: Readonly<SShapeElement & Hoverable & Selectable>): string;
//# sourceMappingURL=rounded-corner-view.d.ts.map