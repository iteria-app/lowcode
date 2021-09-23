import { uniqueImports } from "../../ast/imports";
export class PageContext {
    constructor(appContext, filePath) {
        this._imports = [];
        this._appContext = appContext;
        this._filePath = filePath;
    }
    get InjectionContext() {
        return this._appContext.injectionContext;
    }
    getImports() {
        return uniqueImports(this._imports);
    }
    get filePath() {
        return this._filePath;
    }
    async getSourceCode() {
        let fileContent = '';
        await this._appContext._io.readFile(this._filePath).then(data => { if (data)
            fileContent = data; });
        return fileContent;
    }
    addImportIfNotUsed(imp) {
        this._imports = [...this._imports, imp];
    }
}
