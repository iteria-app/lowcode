import ts, {
  factory,
} from "typescript";
import { Entity, getProperties, Property } from "../../entity";
import { PageComponent } from "../../react-components/react-component-helper";
import { ComponentGenerator } from "../../interfaces/generation-interfaces";
import { getEntityInterfaceName } from "../../entity/helper";

export default class InterfaceGenerator implements ComponentGenerator {
  private _imports: ts.ImportDeclaration[] = [];
  private _entity: Entity;

  constructor(entity: Entity) {
    this._entity = entity;
  }

  generateComponent(): PageComponent | undefined {
    var functionalComponent = this.generateInterface();
    return {
      functionDeclaration: functionalComponent,
      imports: this._imports,
    };
  }

  private generateInterface(): ts.InterfaceDeclaration {
    return factory.createInterfaceDeclaration(
      undefined,
      [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier(getEntityInterfaceName(this._entity)),
      undefined,
      undefined,
      this.getInterfaceFields()
    );
  }

  private getInterfaceFields(): ts.TypeElement[] {
    const inputs: ts.TypeElement[] = getProperties(this._entity).map(property =>{
        return this.getPropertySignature(property);
    });

    return inputs;
  }

  private getPropertySignature(property: Property):  ts.TypeElement {
    return factory.createPropertySignature(
      undefined,
      factory.createIdentifier(property.getName()),
      undefined,
      factory.createKeywordTypeNode(ts.SyntaxKind.StringKeyword)
    )
  }
}
