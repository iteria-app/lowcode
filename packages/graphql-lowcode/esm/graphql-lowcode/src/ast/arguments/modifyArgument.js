import { parse, visit, BREAK } from 'graphql';
export function modifyArgument(file, queryName, argName, value, parents) {
    const ast = parse(file);
    visit(ast, {
        OperationDefinition(node) {
            var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
            if (((_a = node.name) === null || _a === void 0 ? void 0 : _a.value) === queryName) {
                const foundVariable = (_b = node.variableDefinitions) === null || _b === void 0 ? void 0 : _b.find((variableDefinition) => variableDefinition.variable.name.value === argName);
                if (foundVariable && foundVariable.loc && foundVariable.type.loc) {
                    let actualDefaultValue = foundVariable.defaultValue;
                    let actualNumberOfValues = (_d = (_c = actualDefaultValue === null || actualDefaultValue === void 0 ? void 0 : actualDefaultValue.fields) === null || _c === void 0 ? void 0 : _c.length) !== null && _d !== void 0 ? _d : 0;
                    if (parents && actualDefaultValue) {
                        for (const actualParent of parents) {
                            actualDefaultValue = (_e = actualDefaultValue.fields.filter((field) => true).find(field => field.name.value === actualParent)) === null || _e === void 0 ? void 0 : _e.value;
                            actualNumberOfValues = actualDefaultValue.fields.length;
                        }
                        //if variable is already there, remove it and return
                        const valueExists = actualDefaultValue.fields.find(field => field.name.value === value);
                        if (valueExists && valueExists.loc) {
                            file = file.substr(0, (_f = valueExists.loc) === null || _f === void 0 ? void 0 : _f.start) + file.substr((_g = valueExists.loc) === null || _g === void 0 ? void 0 : _g.end, file.length - 1);
                            if (actualNumberOfValues > 1)
                                file = deleteComasLeft(file, valueExists.loc.start);
                            return file;
                        }
                    }
                    //if variable is nested
                    if ((actualDefaultValue === null || actualDefaultValue === void 0 ? void 0 : actualDefaultValue.fields) && actualDefaultValue.loc) {
                        file = file.substr(0, ((_h = actualDefaultValue.loc) === null || _h === void 0 ? void 0 : _h.end) - 1) +
                            (actualNumberOfValues > 0 ? `, ${value}` : value) +
                            file.substr(((_j = actualDefaultValue.loc) === null || _j === void 0 ? void 0 : _j.end) - 1, file.length - 1);
                    }
                    else { //if there is not that variable yet
                        const varTypeStringLength = ((_k = foundVariable.type.loc) === null || _k === void 0 ? void 0 : _k.end) - ((_l = foundVariable.type.loc) === null || _l === void 0 ? void 0 : _l.start);
                        const varTypeString = file.substr((_m = foundVariable.type.loc) === null || _m === void 0 ? void 0 : _m.start, varTypeStringLength);
                        const finalArgString = value != '' ? `${varTypeString} = ${value}` : varTypeString;
                        file = file.substr(0, (_o = foundVariable === null || foundVariable === void 0 ? void 0 : foundVariable.type.loc) === null || _o === void 0 ? void 0 : _o.start) + finalArgString + file.substr((_p = foundVariable === null || foundVariable === void 0 ? void 0 : foundVariable.loc) === null || _p === void 0 ? void 0 : _p.end, file.length - 1);
                    }
                    BREAK;
                }
            }
        }
    });
    return file;
}
export function hasVariables(file, queryName, argName) {
    const ast = parse(file);
    let foundVariable;
    visit(ast, {
        OperationDefinition(node) {
            var _a, _b;
            if (((_a = node.name) === null || _a === void 0 ? void 0 : _a.value) === queryName) {
                foundVariable = (_b = node.variableDefinitions) === null || _b === void 0 ? void 0 : _b.find((variableDefinition) => variableDefinition.variable.name.value === argName);
                BREAK;
            }
        }
    });
    if (foundVariable === null || foundVariable === void 0 ? void 0 : foundVariable.defaultValue)
        return true;
    return false;
}
export function modifyArgumentValue(file, queryName, argName, parents, value) {
    const ast = parse(file);
    visit(ast, {
        OperationDefinition(node) {
            var _a, _b, _c, _d;
            if (((_a = node.name) === null || _a === void 0 ? void 0 : _a.value) === queryName) {
                const foundArgument = (_b = node.variableDefinitions) === null || _b === void 0 ? void 0 : _b.find((variableDefinition) => variableDefinition.variable.name.value === argName);
                //if variable is nested
                if (parents === null || parents === void 0 ? void 0 : parents.length) {
                    let actualNestedVariable = foundArgument === null || foundArgument === void 0 ? void 0 : foundArgument.defaultValue;
                    for (const actualParent of parents) {
                        actualNestedVariable = (_c = actualNestedVariable.fields.filter((field) => true).find(field => field.name.value === actualParent)) === null || _c === void 0 ? void 0 : _c.value;
                    }
                    if (actualNestedVariable && actualNestedVariable.loc) {
                        file = file.substr(0, actualNestedVariable.loc.start) + `"${value}"` + file.substr(actualNestedVariable.loc.end, file.length - 1);
                        return file;
                    }
                }
                //not nested
                if (foundArgument && ((_d = foundArgument.defaultValue) === null || _d === void 0 ? void 0 : _d.loc)) {
                    file = file.substr(0, foundArgument.defaultValue.loc.start) + `"${value}"` + file.substr(foundArgument.defaultValue.loc.end, file.length - 1);
                    return file;
                }
            }
        }
    });
    return file;
}
function deleteComasLeft(file, pos) {
    const startPos = pos;
    while (file.charAt(pos - 1) === ' ' || file.charAt(pos - 1) === ',') {
        pos--;
    }
    return file.substr(0, pos) + file.substr(startPos, file.length - 1);
}
