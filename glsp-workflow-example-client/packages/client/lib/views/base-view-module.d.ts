import { ContainerModule, interfaces } from 'inversify';
interface ContainerContext {
    bind: interfaces.Bind;
    isBound: interfaces.IsBound;
}
declare const baseViewModule: ContainerModule;
export declare function configureDefaultModelElements(context: ContainerContext): void;
export default baseViewModule;
//# sourceMappingURL=base-view-module.d.ts.map