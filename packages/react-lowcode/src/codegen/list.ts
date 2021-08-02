import { SourceLineCol } from "../ast"
import { CodeRW } from "../io"
import { isDataTableWidget } from "./ast/widgetDeclaration"
import { ColumnSourcePositionOptions, ColumnSourcePositionResult, DeleteOptions, InsertOptions } from "./interfaces"
import { getEntityProperty, parseGraphqlTypes, sourceFileEntity } from "./tests/helper"
import { 
    insertColumn, 
    deleteColumn as fDeleteColumn, 
    getColumnSourcePosition as fGetColumnSourcePosition,
} from './facade/facadeApi'
import { Property } from "./generation/entity"

export function isSelectedDataTable(sourceCode:string, tablePosition: SourceLineCol){
    return isDataTableWidget(sourceCode, tablePosition)
}

export async function addColumn(typesSourceCode: string, 
    io: CodeRW, 
    sourceCode:SourceLineCol, 
    options: InsertOptions): Promise<string | undefined>{
        
    const property: Property = getEntityProperty(typesSourceCode, options.property, options.entityName)[0]
    let generatedSource = undefined
    
    const myClassFile = parseGraphqlTypes(typesSourceCode)
    const entity = sourceFileEntity(myClassFile, options.entityName)
    let ent : any = {};
    ent.properties = [property]
    ent.getName = entity?.getName
    if(property){
        generatedSource = await insertColumn(sourceCode, 
        {entityField: property, index: options.index, entity:ent }, 
        io)
    }

    return generatedSource
}

export async function deleteColumn(io: CodeRW, 
    sourceCode:SourceLineCol, 
    options: DeleteOptions): Promise<string | undefined> {

let generatedSource = await fDeleteColumn(sourceCode, options, io);

return generatedSource
}

export async function getColumnSourcePosition(io: CodeRW, 
    sourceCode:SourceLineCol,
    options: ColumnSourcePositionOptions): Promise<ColumnSourcePositionResult | undefined> {

return await fGetColumnSourcePosition(sourceCode, options, io);
}