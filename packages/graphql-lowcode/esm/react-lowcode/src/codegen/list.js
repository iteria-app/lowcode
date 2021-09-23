import { createAst } from "../ast";
import { isDataTableWidget } from "./ast/widgetDeclaration";
import { getEntityProperty, parseGraphqlTypes, sourceFileEntity } from "./tests/helper";
import { insertColumn, deleteColumn as fDeleteColumn, getColumnSourcePosition as fGetColumnSourcePosition, insertColumnToDataTableGrommet } from './facade/facadeApi';
export function isSelectedDataTable(sourceCode, tablePosition) {
    return isDataTableWidget(sourceCode, tablePosition);
}
export async function addColumn(typesSourceCode, io, sourceCode, options) {
    const property = getEntityProperty(typesSourceCode, options.property, options.entityName)[0];
    const code = await io.readFile(sourceCode.fileName);
    let generatedSource = undefined;
    let isGrommet = false;
    if (code)
        isGrommet = isGrommetRepository(code);
    if (property) {
        if (!isGrommet) {
            generatedSource = await insertColumn(sourceCode, {
                entityField: property, index: options.index
            }, io);
        }
        else {
            const myClassFile = parseGraphqlTypes(typesSourceCode);
            const entity = sourceFileEntity(myClassFile, options.entityName);
            let ent = {};
            ent.properties = [property];
            ent.getName = entity === null || entity === void 0 ? void 0 : entity.getName;
            generatedSource = await insertColumnToDataTableGrommet(sourceCode, {
                entityField: property,
                index: options.index,
                entity: ent
            }, io);
        }
    }
    return generatedSource;
}
export async function deleteColumn(io, sourceCode, options) {
    const generatedSource = await fDeleteColumn(sourceCode, options, io);
    return generatedSource;
}
export async function getColumnSourcePosition(io, sourceCode, options) {
    return await fGetColumnSourcePosition(sourceCode, options, io);
}
const isGrommetRepository = (code) => {
    const ast = createAst(code);
    const imports = ast.imports;
    if (imports) {
        for (let item in imports) {
            const el = imports[item];
            if (el.text == "grommet") {
                return true;
            }
        }
        return false;
    }
    return false;
};
