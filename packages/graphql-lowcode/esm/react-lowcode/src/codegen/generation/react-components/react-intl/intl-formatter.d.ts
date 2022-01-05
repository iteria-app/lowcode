import ts from "typescript";
import { Entity, Property } from '../../entity';
import GenerationContext from "../../context/context";
import ReactIntlHook from "./intl-imperative";
import ReactIntlTag from "./intl-formatted-tag";
export default class ReactIntlFormatter {
    _context: GenerationContext;
    _intlFormattedTag: ReactIntlTag;
    _intlImperative: ReactIntlHook;
    constructor(context: GenerationContext, imports: ts.ImportDeclaration[]);
    getImports(): ts.ImportDeclaration[];
    getImperativeHook(): ts.VariableStatement;
    formatPropertyUsingImperative(property: Property, expression: ts.Expression, fallbackExpression: ts.Expression): ts.Expression;
    tryFormatPropertyUsingTag(prop: Property, expression: ts.JsxExpression): ts.JsxSelfClosingElement | undefined;
    localizePropertyNameUsingTag(prop: Property, entity?: Entity): ts.JsxSelfClosingElement;
    localizeMessage(messageId: ts.StringLiteral, defaultMessage: ts.StringLiteral | undefined, values: ts.Expression | undefined): ts.JsxSelfClosingElement;
}
