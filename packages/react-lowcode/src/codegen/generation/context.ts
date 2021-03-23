import { TableType, UiFramework, Formatter } from '../definition/context-types'

export default interface GenerationContext {
    formatter?: Formatter,
    uiFramework?: UiFramework,
    detail?: DetailGenerationContext,
    index?: IndexGenerationContex
}

interface DetailGenerationContext {

}

interface IndexGenerationContex {
    tableType?: TableType,
    height?: string
}
