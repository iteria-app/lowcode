import { parse, visit, BREAK } from 'graphql';
export function getSelectedQueryNames(file) {
    const ast = parse(file);
    let queryNames = [];
    visit(ast, {
        OperationDefinition(node) {
            var _a, _b;
            if ((_a = node.name) === null || _a === void 0 ? void 0 : _a.value) {
                queryNames = [...queryNames, (_b = node.name) === null || _b === void 0 ? void 0 : _b.value];
                BREAK;
            }
        }
    });
    return queryNames;
}
export function getSelectedFragmentFields(file, fragmentName, parents) {
    const ast = parse(file);
    let selectedFields = [];
    visit(ast, {
        FragmentDefinition(node) {
            var _a;
            if (node.name.value === fragmentName) {
                let actualNodeSelections = node.selectionSet.selections;
                for (const actualParent of parents) {
                    const foundNode = actualNodeSelections.filter((selection) => true).find(selection => selection.name.value === actualParent);
                    if (foundNode && foundNode.selectionSet)
                        actualNodeSelections = (_a = foundNode.selectionSet) === null || _a === void 0 ? void 0 : _a.selections;
                    else
                        actualNodeSelections = [];
                }
                selectedFields = actualNodeSelections.filter((selection) => true).map(selection => selection.name.value);
            }
        }
    });
    return selectedFields;
}
export function getFragmentSpreadName(file, queryName) {
    const ast = parse(file);
    let fragmentName;
    visit(ast, {
        Field(node) {
            var _a, _b, _c, _d;
            if (((_a = node.name) === null || _a === void 0 ? void 0 : _a.value) === queryName) {
                fragmentName = (_d = (_c = (_b = node.selectionSet) === null || _b === void 0 ? void 0 : _b.selections.find((selection) => true)) === null || _c === void 0 ? void 0 : _c.name.value) !== null && _d !== void 0 ? _d : undefined;
                BREAK;
            }
        }
    });
    return fragmentName !== null && fragmentName !== void 0 ? fragmentName : '';
}
export function getLastQueryLoc(file) {
    let pos = 0;
    try {
        const ast = parse(file);
        visit(ast, {
            OperationDefinition(node) {
                if (node.loc)
                    pos = node.loc.end;
            }
        });
    }
    catch (error) {
        //TODO handle
    }
    return pos;
}
export function getNumberOfQueries(file) {
    const ast = parse(file);
    let n = 0;
    visit(ast, {
        OperationDefinition(node) {
            n++;
        }
    });
    return n;
}
