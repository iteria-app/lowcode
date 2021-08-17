import { pascalCase } from "pascal-case";
import { camalizeString } from "../../../strings/camel";

export interface Naming {
    getDetailComponentName(entityName: string): string
    getRootFolderName(entityName: string): string
    getListComponentFileName(entityName: string): string
    getDetailComponentFileName(entityName: string): string
}

export class CodegenNaming implements Naming {
    getDetailComponentName(entityName: string): string {
        return `${entityName}DetailComponent`
    }

    getRootFolderName(entityName: string): string {
        return `${camalizeString(entityName)}`
    }

    getListComponentFileName(entityName: string): string {
        return `${entityName}List`
    }

    getDetailComponentFileName(entityName: string): string {
        return `${entityName}Detail`
    }
}