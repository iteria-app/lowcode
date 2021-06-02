import { CodegenNaming, Naming } from "../interfaces/naming";

export class DefaultInjectionContext implements InjectionContext {

    constructor(public naming = new CodegenNaming()) {

    }

}

export interface InjectionContext{
    
    readonly naming : Naming

}
