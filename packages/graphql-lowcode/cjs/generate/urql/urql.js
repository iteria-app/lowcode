"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryHookName = void 0;
function queryHookName(queryName) {
    var hookName = "use" + (queryName.charAt(0).toUpperCase() + queryName.slice(1)) + "Query";
    return hookName;
}
exports.queryHookName = queryHookName;
