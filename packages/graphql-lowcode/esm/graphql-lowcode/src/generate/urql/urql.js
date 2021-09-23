export function queryHookName(queryName) {
    const hookName = `use${queryName.charAt(0).toUpperCase() + queryName.slice(1)}Query`;
    return hookName;
}
