import { factory } from "typescript";
import { createNamedImportDeclaration } from "../../../ast/imports";
import { createJsxSelfClosingElement } from '../react-component-helper';
export var IntlFormatingTags;
(function (IntlFormatingTags) {
    IntlFormatingTags["FormattedDate"] = "FormattedDate";
    IntlFormatingTags["FormattedTime"] = "FormattedTime";
    IntlFormatingTags["FormattedNumber"] = "FormattedNumber";
    IntlFormatingTags["FormattedDateTimeRange"] = "FormattedDateTimeRange";
    IntlFormatingTags["FormattedRelativeTime"] = "FormattedRelativeTime";
    IntlFormatingTags["FormattedPlural"] = "FormattedPlural";
    IntlFormatingTags["FormattedMessage"] = "FormattedMessage";
})(IntlFormatingTags || (IntlFormatingTags = {}));
export default class ReactIntlTag {
    constructor(imports) {
        this._imports = imports;
    }
    getImports() {
        return this._imports;
    }
    formatDate(value) {
        this.prepareImport(IntlFormatingTags.FormattedDate);
        return this.formattedValue(IntlFormatingTags.FormattedDate, value);
    }
    formatTime(value) {
        this.prepareImport(IntlFormatingTags.FormattedTime);
        return this.formattedValue(IntlFormatingTags.FormattedTime, value);
    }
    formatDateTime(value) {
        this.prepareImport(IntlFormatingTags.FormattedDate);
        return this.formattedValue(IntlFormatingTags.FormattedDate, value),
            factory.createJsxText(" ", false),
            this.formattedValue(IntlFormatingTags.FormattedTime, value);
    }
    formatNumber(value) {
        this.prepareImport(IntlFormatingTags.FormattedDate);
        return this.formattedValue(IntlFormatingTags.FormattedNumber, value);
    }
    formatPlural(value) {
        this.prepareImport(IntlFormatingTags.FormattedDate);
        return this.formattedValue(IntlFormatingTags.FormattedPlural, value);
    }
    formatDuration(value, unit) {
        this.prepareImport(IntlFormatingTags.FormattedDate);
        return this.formattedValue(IntlFormatingTags.FormattedRelativeTime, value
        // TODO unit: Unit, format: string, updateIntervalInSeconds: number,
        );
    }
    formatTimeRange(from, to) {
        this.prepareImport(IntlFormatingTags.FormattedDateTimeRange);
        let tagNameIdentifier = factory.createIdentifier(IntlFormatingTags.FormattedDateTimeRange.toString());
        return createJsxSelfClosingElement(tagNameIdentifier, [
            factory.createJsxAttribute(factory.createIdentifier("from"), factory.createJsxExpression(undefined, from)),
            factory.createJsxAttribute(factory.createIdentifier("to"), factory.createJsxExpression(undefined, to))
        ]);
    }
    formatMessage(message, defaultMessage, values) {
        this.prepareImport(IntlFormatingTags.FormattedMessage);
        let tagNameIdentifier = factory.createIdentifier(IntlFormatingTags.FormattedMessage.toString());
        let attributes = [];
        attributes.push(factory.createJsxAttribute(factory.createIdentifier("id"), message));
        if (defaultMessage) {
            attributes.push(factory.createJsxAttribute(factory.createIdentifier("defaultMessage"), defaultMessage));
        }
        if (values) {
            attributes.push(factory.createJsxAttribute(factory.createIdentifier("values"), factory.createJsxExpression(undefined, values)));
        }
        return createJsxSelfClosingElement(tagNameIdentifier, attributes);
    }
    formattedValue(tagNformattingTagame, expression) {
        let identifierTagName = factory.createIdentifier(tagNformattingTagame.toString());
        return createJsxSelfClosingElement(identifierTagName, [
            factory.createJsxAttribute(factory.createIdentifier("value"), expression)
        ]);
    }
    prepareImport(formattingTag) {
        let declaration = createNamedImportDeclaration(formattingTag.toString(), 'react-intl');
        this._imports.push(declaration);
    }
}
