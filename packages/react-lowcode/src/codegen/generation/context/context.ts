import { TableType, UiFramework, Formatter } from '../../definition/context-types'
import { Naming } from '../interfaces/naming';

export default interface CodegenOptions {
    formatter?: Formatter,
    uiFramework?: UiFramework,
    detail?: DetailGenerationContext,
    index?: IndexGenerationContex
    naming?: Naming
}

interface DetailGenerationContext {

}

interface IndexGenerationContex {
    tableType?: TableType,
    height?: string
}


