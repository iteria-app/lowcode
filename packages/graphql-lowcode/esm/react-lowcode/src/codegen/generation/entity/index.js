import { getEntity, getNestedOfType } from "@iteria-app/graphql-lowcode/esm/generate";
export function getProperties(entity) {
    return entity.properties;
}
export function createEntityFromIntrospection(introspection, entityName) {
    const entityType = getEntity(introspection.types, entityName);
    let props = [];
    let entity;
    if (entityType && entityType.fields) {
        entityType.fields.forEach((field) => {
            var _a;
            const propName = field.name;
            const propType = (_a = getNestedOfType(field).name) !== null && _a !== void 0 ? _a : '';
            props = [...props, { getName: () => propName, getType: () => propType }];
        });
        entity = {
            getName: () => entityName,
            properties: props
        };
    }
    return entity;
}
