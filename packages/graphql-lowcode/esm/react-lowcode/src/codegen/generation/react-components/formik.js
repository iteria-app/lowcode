import ts, { factory } from "typescript";
import { getProperties } from "../entity";
import { getPropertyType, PropertyType } from "../graphql/typeAlias";
export function createFormikHook(entity, dataPropertyName) {
    return factory.createVariableStatement(undefined, factory.createVariableDeclarationList([
        factory.createVariableDeclaration(factory.createIdentifier("formik"), undefined, undefined, factory.createCallExpression(factory.createIdentifier("useFormik"), undefined, [
            factory.createObjectLiteralExpression([
                factory.createPropertyAssignment(factory.createIdentifier("initialValues"), factory.createObjectLiteralExpression(createInitialValuesForEntity(entity, dataPropertyName), false)),
                factory.createPropertyAssignment(factory.createIdentifier("onSubmit"), factory.createArrowFunction(undefined, undefined, [
                    factory.createParameterDeclaration(undefined, undefined, undefined, factory.createIdentifier("values"), undefined, undefined, undefined),
                ], undefined, factory.createToken(ts.SyntaxKind.EqualsGreaterThanToken), factory.createBlock([], false))),
            ], true),
        ])),
    ], ts.NodeFlags.Const));
}
function createInitialValuesForEntity(entity, dataPropertyName) {
    let inputs = [];
    getProperties(entity).forEach((property) => {
        let propertyInput = tryCreateInitialValueForProperty(property, dataPropertyName);
        if (propertyInput) {
            inputs.push(propertyInput);
        }
    });
    return inputs;
}
export function tryCreateInitialValueForProperty(property, dataPropertyName) {
    let propType = getPropertyType(property);
    let propertyName = property.getName();
    let assignment;
    switch (propType) {
        case PropertyType.string:
            assignment = factory.createPropertyAssignment(factory.createIdentifier(propertyName), factory.createIdentifier(dataPropertyName + "." + propertyName));
            break;
        case PropertyType.datetime:
            assignment = factory.createPropertyAssignment(factory.createIdentifier(propertyName), factory.createIdentifier(dataPropertyName + "." + propertyName));
            break;
    }
    return assignment;
}
