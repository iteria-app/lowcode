import { factory } from "typescript";
import { PropertyType, getPropertyType } from "../../graphql/typeAlias";
import ReactIntlHook from "./intl-imperative";
import ReactIntlTag from "./intl-formatted-tag";
//TODO: add support for https://github.com/IanKBovard/I18N-Grommet/tree/feat/i18n/src/js/pages/Reacti18next
export default class ReactIntlFormatter {
    constructor(context, imports) {
        this._context = context;
        this._intlImperative = new ReactIntlHook(imports);
        this._intlFormattedTag = new ReactIntlTag(imports);
    }
    //TODO: check why is not working adding imports by passing arrays of imports from generators
    getImports() {
        return [...this._intlImperative.getImports(), ...this._intlFormattedTag.getImports()];
    }
    getImperativeHook() {
        return this._intlImperative.getImperativeHook();
    }
    formatPropertyUsingImperative(property, expression, fallbackExpression) {
        //TODO null chaining in case of: type.isNullable(), type.isUndefined(), type.isUnionOrIntersection(),
        /*if (this._context.tableType == TableType.MuiTable || this._context.tableType == TableType.GrommetTable) {
            expression = factory.createPropertyAccessExpression(
                factory.createIdentifier("row"),
                factory.createIdentifier(prop.getName())
              )
        }*/
        let propertyType = getPropertyType(property);
        switch (propertyType) {
            case PropertyType.currency:
            case PropertyType.numeric:
                return this._intlImperative.formatNumber(expression);
            case PropertyType.date:
            case PropertyType.datetime:
                return this._intlImperative.formatDate(expression);
            case PropertyType.time:
                return this._intlImperative.formatTime(expression);
            case PropertyType.navigation:
            // TODO clickable chips with href/navigation to a page
            default:
                expression = fallbackExpression;
                break;
        }
        // TODO type.isObject(), type.isUnknown(),
        // TODO disabled checkbox: type.isBoolean(), type.isBooleanLiteral(), Scalars['Boolean']
        // TODO arrays - list of chips - optionally clickable
        return expression;
    }
    tryFormatPropertyUsingTag(prop, expression) {
        //TODO null chaining in case of: type.isNullable(), type.isUndefined(), type.isUnionOrIntersection(),
        let propertyType = getPropertyType(prop);
        let formattedElement = undefined;
        switch (propertyType) {
            case PropertyType.currency:
            case PropertyType.numeric:
                formattedElement = this._intlFormattedTag.formatNumber(expression);
                break;
            case PropertyType.date:
            case PropertyType.datetime:
                formattedElement = this._intlFormattedTag.formatDate(expression);
                break;
            case PropertyType.time:
                formattedElement = this._intlFormattedTag.formatTime(expression);
                break;
        }
        // TODO type.isObject(), type.isUnknown(),
        // TODO disabled checkbox: type.isBoolean(), type.isBooleanLiteral(), Scalars['Boolean']
        // TODO arrays - list of chips - optionally clickable
        return formattedElement;
    }
    localizePropertyNameUsingTag(prop, entity) {
        let messageId = factory.createStringLiteral((entity ? entity.getName().toLowerCase() : '') + "." + prop.getName());
        let messageDefaultValue = factory.createStringLiteral(prop.getName());
        return this.localizeMessage(messageId, messageDefaultValue, undefined);
    }
    localizeMessage(messageId, defaultMessage, values) {
        return this._intlFormattedTag.formatMessage(messageId, defaultMessage, values);
    }
}
