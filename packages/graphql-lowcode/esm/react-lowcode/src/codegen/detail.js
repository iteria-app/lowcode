import { isFormWidget } from "./ast/widgetDeclaration";
import { insertFormWidget, getFormWidgetProperties as fGetFormWidgetProperties, setFormWidgetProperties as fSetFormWidgetProperties } from './facade/facadeApi';
import { getEntityProperty } from "./tests/helper";
export function isSelectedFormWidget(sourceCode, formPosition) {
    return isFormWidget(sourceCode, formPosition);
}
export async function getFormWidgetProperties(io, sourceCode) {
    return await fGetFormWidgetProperties(sourceCode, io);
}
export async function setFormWidgetProperties(io, sourceCode, properties) {
    return await fSetFormWidgetProperties(sourceCode, io, properties);
}
export async function addFormInput(typesSourceCode, io, sourceLine, options) {
    const property = getEntityProperty(typesSourceCode, options.property, options.entityName)[0];
    let generatedSource = undefined;
    if (property) {
        generatedSource = await insertFormWidget(sourceLine, { entityField: property, index: options.index }, io);
    }
    return generatedSource;
}
