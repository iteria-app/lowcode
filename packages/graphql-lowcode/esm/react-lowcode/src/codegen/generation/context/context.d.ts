import { TableType, UiFramework, Formatter } from '../../definition/context-types';
import { Naming } from '../interfaces/naming';
export default interface CodegenOptions {
    formatter?: Formatter;
    uiFramework?: UiFramework;
    detail?: DetailGenerationContext;
    index?: ListGenerationContex;
    naming?: Naming;
}
interface DetailGenerationContext {
}
interface ListGenerationContex {
    tableType?: TableType;
    height?: string;
}
export {};
