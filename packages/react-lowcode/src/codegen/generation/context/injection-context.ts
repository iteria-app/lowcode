import { CodegenNaming, Naming } from "../interfaces/naming";

export class InjectionContext{
    
    constructor(){
        this._naming = new CodegenNaming()
    }

    private _naming : Naming

    public get naming() : Naming {
        return this._naming;
    }
    private set value(naming : Naming) {
        this._naming = naming;
    }
}