import ts, {
  factory,
} from "typescript";
import { Entity, getProperties, Property } from "../../entity";
import { PageComponent } from "../../react-components/react-component-helper";
import { DetailGenerator } from "./detail-generator-factory";

export default class InterfaceGenerator implements DetailGenerator {
  private _imports: ts.ImportDeclaration[] = [];
  private _entity: Entity;

  constructor(entity: Entity) {
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
    return factory.createInterfaceDeclaration(
      undefined,
      [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier(this._entity.getName()),
      undefined,
      undefined,
      this.getInterfaceFields()
    );
  }

  getInterfaceFields(): ts.TypeElement[] {
    let inputs: ts.TypeElement[] = [];
    getProperties(this._entity).forEach((property) => {
      let propertyInput = this.getPropertySignature(property);

      if (propertyInput) {
        inputs.push(propertyInput);
      }
    });

    return inputs;

  }
  getPropertySignature(property: Property):  ts.TypeElement {
    return factory.createPropertySignature(
      undefined,
      factory.createIdentifier(property.getName()),
      undefined,
      factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
    )
  }
}
