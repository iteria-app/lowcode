import { IntrospectionQuery } from "@iteria-app/graphql-lowcode/esm/generate";
import { SourceFile } from "ts-morph";
import ts from "typescript";
import { Property } from "../generation/entity";
export declare function createAst(code: string, scriptTarget?: ts.ScriptTarget, scriptKind?: ts.ScriptKind, filePath?: string): ts.SourceFile;
export declare function sourceFileEntity(myClassFile: any, typeName?: string): {
    getName: () => string;
    getType: () => any;
    properties: any;
};
export declare function getEntityProperty(typesSourceCode: string, name: string, typeName?: string): Property[];
export declare function getEntityPropertyIntrospection(introspection: IntrospectionQuery, propertyName: string, typeName?: string): Property | undefined;
export declare function parseGraphqlTypes(sourceCode: string): SourceFile;
