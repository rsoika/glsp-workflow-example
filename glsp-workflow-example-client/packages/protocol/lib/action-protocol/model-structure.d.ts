import { Bounds } from './types';
/**
 * The schema of an SModelElement describes its serializable form. The actual model is created from
 * its schema with an IModelFactory.
 * Each model element must have a unique ID and a type that is used to look up its view.
 */
export interface SModelElementSchema {
    type: string;
    id: string;
    children?: SModelElementSchema[];
    cssClasses?: string[];
}
export declare function isSModelElementSchema(schema: any): schema is SModelElementSchema;
/**
 * Serializable schema for the root element of the model tree.
 */
export interface SModelRootSchema extends SModelElementSchema {
    canvasBounds?: Bounds;
    revision?: number;
}
export declare function isSModelRootSchema(schema: any): schema is SModelRootSchema;
//# sourceMappingURL=model-structure.d.ts.map