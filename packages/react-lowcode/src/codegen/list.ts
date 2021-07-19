import { SourceLineCol } from "../ast"
import { CodeRW } from "../io"
import { isDataTableWidget } from "./ast/widgetDeclaration"
import { ColumnSourcePositionOptions, ColumnSourcePositionResult, DeleteOptions, InsertOptions } from "./interfaces"
import { getEntityProperty } from "./tests/helper"
import { 
    insertColumn, 
    deleteColumn as fDeleteColumn, 
    getColumnSourcePosition as fGetColumnSourcePosition,
    insertColumnToDataTableGrommet,
    insertColumnToBasicTableGrommet
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

    if(property){
        // generatedSource = await insertColumn(sourceCode, 
        // {entityField: property, index: options.index}, 
        // io)

        generatedSource = await insertColumnToDataTableGrommet(
            sourceCode,
            {
                entityField: property,
                index: options.index
            },
            io
        )

        // console.log(generatedSource)
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