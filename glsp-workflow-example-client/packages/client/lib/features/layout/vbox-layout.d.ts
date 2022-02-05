import { Bounds, BoundsData, Dimension, LayoutContainer, Point, SChildElement, SModelElement, SParentElement, StatefulLayouter, VBoxLayouter, VBoxLayoutOptions } from 'sprotty';
export interface VBoxLayoutOptionsExt extends VBoxLayoutOptions {
    hGrab: boolean;
    vGrab: boolean;
    prefWidth: number | null;
    prefHeight: number | null;
}
/**
 * Extends VBoxLayouter to support additional layout options
 */
export declare class VBoxLayouterExt extends VBoxLayouter {
    static KIND: string;
    layout(container: SParentElement & LayoutContainer, layouter: StatefulLayouter): void;
    protected getChildrenSize(container: SParentElement & LayoutContainer, containerOptions: VBoxLayoutOptionsExt, layouter: StatefulLayouter): Dimension;
    protected layoutChildren(container: SParentElement & LayoutContainer, layouter: StatefulLayouter, containerOptions: VBoxLayoutOptionsExt, maxWidth: number, maxHeight: number, grabHeight?: number, grabbingChildren?: number): Point;
    protected layoutChild(child: SChildElement, boundsData: BoundsData, bounds: Bounds, childOptions: VBoxLayoutOptionsExt, containerOptions: VBoxLayoutOptionsExt, currentOffset: Point, maxWidth: number, maxHeight: number, grabHeight?: number, grabbingChildren?: number): Point;
    protected getFixedContainerBounds(container: SModelElement, layoutOptions: VBoxLayoutOptionsExt, layouter: StatefulLayouter): Bounds;
    protected getChildLayoutOptions(child: SChildElement, containerOptions: VBoxLayoutOptionsExt): VBoxLayoutOptionsExt;
    protected getLayoutOptions(element: SModelElement): VBoxLayoutOptionsExt;
    protected getElementLayoutOptions(element: SModelElement): VBoxLayoutOptionsExt | undefined;
    protected getFinalContainerBounds(container: SParentElement & LayoutContainer, lastOffset: Point, options: VBoxLayoutOptionsExt, maxWidth: number, maxHeight: number): Bounds;
    protected getDefaultLayoutOptions(): VBoxLayoutOptionsExt;
    protected spread(a: VBoxLayoutOptionsExt, b: VBoxLayoutOptionsExt): VBoxLayoutOptionsExt;
}
//# sourceMappingURL=vbox-layout.d.ts.map