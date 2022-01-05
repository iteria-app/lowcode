import { CodegenNaming } from "../interfaces/naming";
export class DefaultInjectionContext {
    constructor(naming = new CodegenNaming()) {
        this.naming = naming;
    }
}
