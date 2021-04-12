import ts, { factory, JsxSelfClosingElement } from "typescript"
import { Entity, Property } from '../../entity'
import GenerationContext from "../../context/context"
import { PropertyType, getPropertyType } from "../../graphql/typeAlias"
import ReactIntlHook from "./intl-imperative"
import ReactIntlTag from "./intl-formatted-tag"

//TODO: add support for https://github.com/IanKBovard/I18N-Grommet/tree/feat/i18n/src/js/pages/Reacti18next
export default class ReactIntlFormatter {
    _context: GenerationContext;
    _intlFormattedTag: ReactIntlTag;
    _intlImperative: ReactIntlHook;

    constructor(context: GenerationContext, imports: ts.ImportDeclaration[]){
        this._context = context;
        this._intlImperative = new ReactIntlHook(imports);
        this._intlFormattedTag = new ReactIntlTag(imports);
    }

    //TODO: check why is not working adding imports by passing arrays of imports from generators
    getImports(){
      return [...this._intlImperative.getImports(), ...this._intlFormattedTag.getImports()]
    }

    getImperativeHook(): ts.VariableStatement{
      return this._intlImperative.getImperativeHook();
    }

    formatPropertyUsingImperative(property: Property, expression: ts.Expression, fallbackExpression: ts.Expression): ts.Expression {
      //TODO null chaining in case of: type.isNullable(), type.isUndefined(), type.isUnionOrIntersection(),
  
      /*if (this._context.tableType == TableType.MuiTable || this._context.tableType == TableType.GrommetTable) {
          expression = factory.createPropertyAccessExpression(
              factory.createIdentifier("row"),
              factory.createIdentifier(prop.getName())
            )
      }*/
    
      let propertyType: PropertyType = getPropertyType(property);
    
      switch(propertyType) {
        case PropertyType.currency:
        case PropertyType.numeric:
          return this._intlImperative.formatNumber(expression)
        case PropertyType.date:
        case PropertyType.datetime:
          return this._intlImperative.formatDate(expression)
        case PropertyType.time:
          return this._intlImperative.formatTime(expression)
        case PropertyType.navigation:
          // TODO clickable chips with href/navigation to a page
        default:
            expression = fallbackExpression
          break;
      }

      // TODO type.isObject(), type.isUnknown(),
      // TODO disabled checkbox: type.isBoolean(), type.isBooleanLiteral(), Scalars['Boolean']
      // TODO arrays - list of chips - optionally clickable

      return expression;
  }

  tryFormatPropertyUsingTag(prop: Property, expression: ts.JsxExpression): ts.JsxSelfClosingElement | undefined {
    //TODO null chaining in case of: type.isNullable(), type.isUndefined(), type.isUnionOrIntersection(),
    let propertyType: PropertyType = getPropertyType(prop);
    
    let formattedElement = undefined

      switch(propertyType) {
        case PropertyType.currency:
        case PropertyType.numeric:
          formattedElement = this._intlFormattedTag.formatNumber(expression)
          break;
        case PropertyType.date:
        case PropertyType.datetime:
          formattedElement = this._intlFormattedTag.formatDate(expression)
          break;
        case PropertyType.time:
          formattedElement = this._intlFormattedTag.formatTime(expression)
          break;
      }

      // TODO type.isObject(), type.isUnknown(),
      // TODO disabled checkbox: type.isBoolean(), type.isBooleanLiteral(), Scalars['Boolean']
      // TODO arrays - list of chips - optionally clickable

      return formattedElement;
  }

  localizePropertyNameUsingTag(prop: Property, entity: Entity): ts.JsxSelfClosingElement {
    let messageId: ts.StringLiteral = factory.createStringLiteral(entity.getName() + "." + prop.getName())
    let messageDefaultValue: ts.StringLiteral = factory.createStringLiteral(prop.getName())

    return this.localizeMessage(messageId, messageDefaultValue, undefined)
  }

  localizeMessage(messageId: ts.StringLiteral, defaultMessage: ts.StringLiteral | undefined, values: ts.Expression | undefined): ts.JsxSelfClosingElement {
    return this._intlFormattedTag.formatMessage(messageId, defaultMessage, values);
  }
} 