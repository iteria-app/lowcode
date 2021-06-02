import { CodeDir, CodeRW } from "../../../io";
import { CodegenRw } from "../../io/codegenRw";
import CodegenOptions from "./context";
import { InjectionContext, DefaultInjectionContext } from "./injection-context";

export class AppContext{
    _injectionContext: InjectionContext
    _options: CodegenOptions
    _io: CodeRW

    constructor(options:CodegenOptions, io?: CodeRW){
        this._injectionContext = this.injectionContext
        this._options = options
        this._io = io ?? new CodegenRw()
    }
    
    public get injectionContext() : InjectionContext {
        return this._injectionContext;
    }
}