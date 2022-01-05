export interface Naming {
    getDetailComponentName(entityName: string): string;
    getRootFolderName(entityName: string): string;
    getListComponentFileName(entityName: string): string;
    getDetailComponentFileName(entityName: string): string;
}
export declare class CodegenNaming implements Naming {
    getDetailComponentName(entityName: string): string;
    getRootFolderName(entityName: string): string;
    getListComponentFileName(entityName: string): string;
    getDetailComponentFileName(entityName: string): string;
}
