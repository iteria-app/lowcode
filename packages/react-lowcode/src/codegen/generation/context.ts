import { TableType, UiFramework } from '../definition/context-types'
import { Entity } from "./entity"

export default interface GenerationContext {
    useFormatter: boolean
    tableType: TableType
    uiFramework: UiFramework
    entity: Entity
}
