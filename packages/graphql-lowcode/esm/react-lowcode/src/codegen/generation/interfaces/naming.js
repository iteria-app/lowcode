import { camalizeString } from "../../../strings/camel";
export class CodegenNaming {
    getDetailComponentName(entityName) {
        return `${entityName}DetailComponent`;
    }
    getRootFolderName(entityName) {
        return `${camalizeString(entityName)}`;
    }
    getListComponentFileName(entityName) {
        return `${entityName}List`;
    }
    getDetailComponentFileName(entityName) {
        return `${entityName}Detail`;
    }
}
