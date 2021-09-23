import { Project } from "ts-morph";
import ts from "typescript";
import { createEntityFromIntrospection } from "../generation/entity";
export function createAst(code, scriptTarget = ts.ScriptTarget.ESNext, scriptKind = ts.ScriptKind.TSX, filePath = `/ts-ast-viewer.tsx`) {
    return ts.createSourceFile(filePath, code, scriptTarget, true, scriptKind);
}
export function sourceFileEntity(myClassFile /*SourceFile*/, typeName = "Customer") {
    var _a, _b;
    const typeAlias = myClassFile.getTypeAlias(typeName);
    if (typeAlias) {
        const props = (_b = (_a = typeAlias === null || typeAlias === void 0 ? void 0 : typeAlias.getType()) === null || _a === void 0 ? void 0 : _a.getProperties()) !== null && _b !== void 0 ? _b : [];
        return {
            getName: () => typeName,
            getType: () => typeAlias,
            properties: props.map((prop) => ({
                getName: () => prop.getName(),
                getType: () => prop.getTypeAtLocation(myClassFile),
                getTypeText: () => prop.getDeclarations()[0].getText()
            }))
        };
    }
}
export function getEntityProperty(typesSourceCode, name, typeName = "Utilization") {
    const myClassFile = parseGraphqlTypes(typesSourceCode);
    const testEntity = sourceFileEntity(myClassFile, typeName);
    let property = testEntity === null || testEntity === void 0 ? void 0 : testEntity.properties.filter(((prop) => {
        return prop.getName().toLowerCase() === name.toLowerCase();
    }));
    return property !== null && property !== void 0 ? property : [];
}
export function getEntityPropertyIntrospection(introspection, propertyName, typeName = "customer") {
    const entity = createEntityFromIntrospection(introspection, typeName);
    let property = undefined;
    if (entity) {
        let propertiesWithName = entity.properties.filter(((prop) => {
            return prop.getName().toLowerCase() === propertyName;
        }));
        if (propertiesWithName) {
            property = propertiesWithName[0];
        }
    }
    return property;
}
export function parseGraphqlTypes(sourceCode) {
    // initialize
    const project = new Project({
    // Optionally specify compiler options, tsconfig.json, in-memory file system, and more here.
    // If you initialize with a tsconfig.json, then it will automatically populate the project
    // with the associated source files.
    // Read more: https://ts-morph.com/setup/
    });
    // add source files
    //project.addSourceFilesAtPaths("src/**/*.ts");
    const myClassFile = project.createSourceFile("src/types.ts", sourceCode);
    return myClassFile;
}
