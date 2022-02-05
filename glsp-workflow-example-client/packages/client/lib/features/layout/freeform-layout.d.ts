import { Bounds, BoundsData, Dimension, LayoutContainer, Point, SChildElement, SParentElement, StatefulLayouter } from 'sprotty';
import { AbstractLayout } from 'sprotty/lib/features/bounds/abstract-layout';
import { AbstractLayoutOptions } from 'sprotty/lib/features/bounds/layout-options';
/**
 * Layouts children of a container with explit X/Y positions
 */
export declare class FreeFormLayouter extends AbstractLayout<AbstractLayoutOptions> {
    static KIND: string;
    layout(container: SParentElement & LayoutContainer, layouter: StatefulLayouter): void;
    protected getChildrenSize(container: SParentElement & LayoutContainer, containerOptions: AbstractLayoutOptions, layouter: StatefulLayouter): Dimension;
    protected layoutChild(child: SChildElement, boundsData: BoundsData, bounds: Bounds, childOptions: AbstractLayoutOptions, containerOptions: AbstractLayoutOptions, currentOffset: Point, maxWidth: number, maxHeight: number): Point;
    protected getFinalContainerBounds(container: SParentElement & LayoutContainer, lastOffset: Point, options: AbstractLayoutOptions, maxWidth: number, maxHeight: number): Bounds;
    protected getDefaultLayoutOptions(): AbstractLayoutOptions;
    protected spread(a: AbstractLayoutOptions, b: AbstractLayoutOptions): AbstractLayoutOptions;
}
//# sourceMappingURL=freeform-layout.d.ts.map