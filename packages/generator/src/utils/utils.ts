import ts, {factory} from "typescript"

export function camalizeString(str: string) {
    return str.replace(/^([A-Z])|\s(\w)/g, function(match, p1, p2, offset) {
        if (p2) return p2.toUpperCase();
        return p1.toLowerCase();        
    });
}

export function uniqueImports(imports:ts.ImportDeclaration[]): ts.ImportDeclaration[]{
    let uniqueImports: Map<string,string> = new Map<string, string>();

    //get unique imports
    imports.forEach((value) => {
        let module = (<any>value.moduleSpecifier).text
        
        if(value.importClause?.namedBindings)
        {   
            value.importClause?.namedBindings.forEachChild(importSpecifier => {
                let specifier  = (<any>importSpecifier).name.escapedText
                
                if(!uniqueImports.has(specifier)){
                    uniqueImports.set(specifier, module);
                }
            });
        }
    });

    //group it by module specifier
    let grouppedImports = new Map();
    uniqueImports.forEach((value, key) => {
        const collection = grouppedImports.get(value);
        if (!collection) {
            grouppedImports.set(value, [key]);
        } else {
            collection.push(key);
        }
    });

    //create imports
    var uniqueImportDeclarations = new Array<ts.ImportDeclaration>()
    grouppedImports.forEach((value: Array<string>, key) => {

        let declaration = factory.createImportDeclaration(
            undefined,
            undefined,
            factory.createImportClause(
              false,
              undefined,
              factory.createNamedImports([
                factory.createImportSpecifier(
                  undefined,
                  factory.createIdentifier(value.join(','))
                ),
              ])
            ),
            factory.createStringLiteral(key)
          )

        uniqueImportDeclarations.push(declaration);
    });

    return uniqueImportDeclarations;
}