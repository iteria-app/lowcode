import { CodegenNaming, Naming } from "../interfaces/naming";
export declare class DefaultInjectionContext implements InjectionContext {
    naming: CodegenNaming;
    constructor(naming?: CodegenNaming);
}
export interface InjectionContext {
    readonly naming: Naming;
}
