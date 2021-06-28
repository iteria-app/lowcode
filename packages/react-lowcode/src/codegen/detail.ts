import { SourceLineCol } from "../ast";
import { CodeRW } from "../io";
import { isFormWidget } from "./ast/widgetDeclaration";
import { 
    insertFormWidget, 
    getColumnSourcePosition as fGetColumnSourcePosition,
    getFormWidgetProperties as fGetFormWidgetProperties,
    setFormWidgetProperties as fSetFormWidgetProperties
} from './facade/facadeApi'
import { Property } from "./generation/entity";
import { InsertOptions, WidgetProperties } from "./interfaces";
import { getEntityProperty } from "./tests/helper";

export function isSelectedFormWidget(sourceCode:string, formPosition: SourceLineCol){
    return isFormWidget(sourceCode, formPosition)
}

export async function getFormWidgetProperties(io: CodeRW, 
    sourceCode:SourceLineCol): Promise<WidgetProperties>{
    return await fGetFormWidgetProperties(sourceCode, io);
}

export async function setFormWidgetProperties(io: CodeRW, 
    sourceCode:SourceLineCol,
    properties: WidgetProperties): Promise<string | undefined>{

    return await fSetFormWidgetProperties(sourceCode, io, properties);
}

export async function addFormInput(typesSourceCode: string, 
    io: CodeRW, 
    sourceLine:SourceLineCol, 
    options: InsertOptions): Promise<string | undefined>{

    const property: Property = getEntityProperty(typesSourceCode, options.property, options.entityName)[0]
    let generatedSource = undefined

    if(property){
        generatedSource = await insertFormWidget(sourceLine, 
        {entityField: property, index: options.index}, 
        io)
    }
    return generatedSource
}