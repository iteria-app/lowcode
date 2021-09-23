import ts from "typescript";
import { astFindSource } from "../../../ast";
export class WidgetContext {
    constructor(sourceFileContext) {
        this._statements = [];
        this._pageContext = sourceFileContext;
    }
    async getSourceCodeString(position) {
        return await this._pageContext.getSourceCode();
    }
    getStatements() {
        return this._statements;
    }
    getPageImports() {
        return this._pageContext.getImports();
    }
    findWidgetParentNode(sourceCode, position) {
        let astCode = astFindSource(sourceCode, position);
        if (astCode) {
            let parent = astCode.parent;
            while (parent) {
                if (this.isWidgetDeclaration(parent)) {
                    return parent;
                }
                parent = parent.parent;
            }
        }
        else {
            console.log('cannot find widget element');
        }
    }
    isWidgetDeclaration(node) {
        return this.isTableDeclaration(node) || this.isDetailDeclaration(node);
    }
    isTableDeclaration(node) {
        ///TODO: check also for export key word
        return ts.isFunctionDeclaration(node);
    }
    isDetailDeclaration(node) {
        ///TODO: check also for export key word
        return ts.isVariableDeclaration(node);
    }
    addStatementIfNotExist(statement) {
        this._statements = [...this._statements, statement]; //todo:add only if statement not exists
    }
    addStatementIfNotExistArray(statements) {
        this._statements = [...this._statements, ...statements]; //todo:add only if statement not exists
    }
    addImport(imp) {
        this._pageContext.addImportIfNotUsed(imp); //todo:add only if import not exists
    }
    addImportArray(imp) {
        imp.forEach(impor => {
            this._pageContext.addImportIfNotUsed(impor); //todo:add only if import not exists
        });
    }
}
