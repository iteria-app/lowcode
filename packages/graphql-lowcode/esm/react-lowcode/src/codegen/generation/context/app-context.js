import { CodegenRw } from "../../io/codegenRw";
export class AppContext {
    constructor(options, io) {
        this._injectionContext = this.injectionContext;
        this._options = options;
        this._io = io !== null && io !== void 0 ? io : new CodegenRw();
    }
    get injectionContext() {
        return this._injectionContext;
    }
}
