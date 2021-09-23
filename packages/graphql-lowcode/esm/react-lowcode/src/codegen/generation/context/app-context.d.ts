import { CodeRW } from "../../../io";
import CodegenOptions from "./context";
import { InjectionContext } from "./injection-context";
export declare class AppContext {
    _injectionContext: InjectionContext;
    _options: CodegenOptions;
    _io: CodeRW;
    constructor(options: CodegenOptions, io?: CodeRW);
    get injectionContext(): InjectionContext;
}
