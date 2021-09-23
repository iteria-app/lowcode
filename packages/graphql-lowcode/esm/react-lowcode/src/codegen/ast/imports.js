import ts, { factory } from "typescript";
export function createNamedImportDeclaration(importSpecifier, module) {
    return factory.createImportDeclaration(undefined, undefined, factory.createImportClause(false, undefined, factory.createNamedImports([
        factory.createImportSpecifier(undefined, factory.createIdentifier(importSpecifier)),
    ])), factory.createStringLiteral(module));
}
export function createImportDeclaration(importSpecifier, module) {
    return factory.createImportDeclaration(undefined, undefined, factory.createImportClause(false, factory.createIdentifier(importSpecifier), undefined), factory.createStringLiteral(module));
}
export function createNameSpaceImport(namespace, module) {
    return factory.createImportDeclaration(undefined, undefined, factory.createImportClause(false, undefined, factory.createNamespaceImport(factory.createIdentifier(namespace))), factory.createStringLiteral(module));
}
export function existsImportWithNamespace(node, namespace) {
    var _a, _b;
    let isImportWithName = false;
    if (ts.isImportDeclaration(node)) {
        isImportWithName = ((_b = (_a = node.importClause) === null || _a === void 0 ? void 0 : _a.name) === null || _b === void 0 ? void 0 : _b.escapedText) === namespace;
    }
    return isImportWithName;
}
//TODO: improve this to be able also process namespace imports
export function uniqueImports(imports) {
    let uniqueImports = new Map();
    //get unique imports
    imports.forEach((value) => {
        var _a, _b, _c;
        let module = value.moduleSpecifier.text;
        if ((_a = value.importClause) === null || _a === void 0 ? void 0 : _a.namedBindings) {
            (_b = value.importClause) === null || _b === void 0 ? void 0 : _b.namedBindings.forEachChild(importSpecifier => {
                let specifier = importSpecifier.name.escapedText;
                if (!uniqueImports.has(specifier)) {
                    uniqueImports.set(specifier, module);
                }
            });
        }
        else if ((_c = value.importClause) === null || _c === void 0 ? void 0 : _c.name) {
            let specifier = value.importClause.name.escapedText.toString();
            if (!uniqueImports.has(specifier)) {
                uniqueImports.set(specifier, module);
            }
        }
    });
    //group it by module specifier
    let grouppedImports = new Map();
    uniqueImports.forEach((value, key) => {
        const collection = grouppedImports.get(value);
        if (!collection) {
            grouppedImports.set(value, [key]);
        }
        else {
            collection.push(key);
        }
    });
    //create imports
    var uniqueImportDeclarations = new Array();
    grouppedImports.forEach((value, key) => {
        let declaration = factory.createImportDeclaration(undefined, undefined, factory.createImportClause(false, undefined, factory.createNamedImports([
            factory.createImportSpecifier(undefined, factory.createIdentifier(value.join(','))),
        ])), factory.createStringLiteral(key));
        uniqueImportDeclarations.push(declaration);
    });
    return uniqueImportDeclarations;
}
