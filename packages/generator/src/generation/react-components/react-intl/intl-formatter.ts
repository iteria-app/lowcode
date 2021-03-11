import ts, { factory } from "typescript"
import { Entity, Property } from '../../entity'
import GenerationContext from "../../context"
import { TableType } from "../../../definition/table-types"
import { PropertyType, getPropertyType } from "../../typeAlias"
import ReactIntlHook from "./intl-hook"
import ReactIntlTag from "./intl-formatted-tag"

//TODO: add support for https://github.com/IanKBovard/I18N-Grommet/tree/feat/i18n/src/js/pages/Reacti18next
export default class ReactIntlFormatter {
    _context: GenerationContext;
    _intlFormattedTag: ReactIntlTag;
    _intlHook: ReactIntlHook;

    constructor(context: GenerationContext, imports: ts.ImportDeclaration[]){
        this._context = context;
        this._intlHook = new ReactIntlHook(imports);
        this._intlFormattedTag = new ReactIntlTag(imports);
    }

    formatPropertyUsingHook(prop: Property, fallbackProperty: string|undefined): ts.Expression {
      //TODO null chaining in case of: type.isNullable(), type.isUndefined(), type.isUnionOrIntersection(),
      let expression: ts.Expression = factory.createIdentifier(prop.getName())

      if (this._context.tableType == TableType.MuiTable || this._context.tableType == TableType.GrommetTable) {
          expression = factory.createPropertyAccessExpression(
              factory.createIdentifier("row"),
              factory.createIdentifier(prop.getName())
            )
      }
    
      let propertyType: PropertyType = getPropertyType(prop);
    
      switch(propertyType) {
        case PropertyType.currency:
        case PropertyType.numeric:
          return this._intlHook.formatNumber(expression)
        case PropertyType.date:
        case PropertyType.datetime:
          return this._intlHook.formatDate(expression)
        case PropertyType.time:
          return this._intlHook.formatTime(expression)
        case PropertyType.navigation:
          // TODO clickable chips with href/navigation to a page
        default:
          if(fallbackProperty){
            expression = factory.createIdentifier(fallbackProperty);
          }
          break;
      }

      // TODO type.isObject(), type.isUnknown(),
      // TODO disabled checkbox: type.isBoolean(), type.isBooleanLiteral(), Scalars['Boolean']
      // TODO arrays - list of chips - optionally clickable

      return expression;
  }

  formatPropertyUsingTag(prop: Property, expression: ts.Expression): ts.JsxSelfClosingElement {
    //TODO null chaining in case of: type.isNullable(), type.isUndefined(), type.isUnionOrIntersection(),
    let propertyType: PropertyType = getPropertyType(prop);
    
    let formattedElement: ts.JsxSelfClosingElement

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
        case PropertyType.navigation:
          // TODO clickable chips with href/navigation to a page
          formattedElement = this.localizeMessage(factory.createStringLiteral(''), factory.createStringLiteral(''), undefined)
          break;
        default:
          //TODO do some fallback if type is not supported
           formattedElement = this.localizeMessage(factory.createStringLiteral(''), factory.createStringLiteral(''), undefined)
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