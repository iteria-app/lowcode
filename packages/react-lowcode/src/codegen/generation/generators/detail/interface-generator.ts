import ts, { factory, InterfaceDeclaration, JsxAttributeLike, Node, ObjectLiteralExpression, SourceFile, SyntaxKind, transform } from "typescript";
import { createAst } from "../../code-generation/createSourceFile";
import { Entity } from "../../entity";
import { PageComponent } from "../../react-components/react-component-helper";
import { DetailGenerator } from "./detail-generator-factory";

export default class InterfaceGenerator implements DetailGenerator {
  private _imports: ts.ImportDeclaration[] = [];  
  private _entity: Entity;

    constructor(entity: Entity){
        this._entity = entity;

    }
  generateDetailComponent(): PageComponent | undefined {
    var functionalComponent = this.generateInterface();
    return {
      functionDeclaration: functionalComponent,
      imports: this._imports,
    };
  }
    generateInterface(): ts.InterfaceDeclaration {
        return  factory.createInterfaceDeclaration(
          undefined,
          [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
          factory.createIdentifier(this._entity.getName()),
          undefined,
          undefined,
          [//TODO: generate from entity properties
            factory.createPropertySignature(
              undefined,
              factory.createIdentifier("avatarUrl"),
              undefined,
              factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
            ),
            factory.createPropertySignature(
              undefined,
              factory.createIdentifier("createdAt"),
              undefined,
              factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
            ),
            factory.createPropertySignature(
              undefined,
              factory.createIdentifier("email"),
              undefined,
              factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
            ),
            factory.createPropertySignature(
              undefined,
              factory.createIdentifier("name"),
              undefined,
              factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
            )
          ]
        )
    }
}