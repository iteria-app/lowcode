import { BREAK, parse, visit } from 'graphql';
import { addFragmentField } from '../modify';
export function removeOrAddFragmentField(file, fragmentName, fieldName, parents, childrenField) {
    try {
        const ast = parse(file);
        visit(ast, {
            FragmentDefinition(node) {
                var _a, _b, _c, _d;
                if (node.name.value === fragmentName) {
                    let actualNodeSelections = node.selectionSet.selections;
                    for (const actualParent of parents) {
                        const foundNode = actualNodeSelections.filter((selection) => true).find(selection => selection.name.value === actualParent);
                        if (foundNode && foundNode.selectionSet)
                            actualNodeSelections = (_a = foundNode.selectionSet) === null || _a === void 0 ? void 0 : _a.selections;
                        else
                            actualNodeSelections = [];
                    }
                    const remainingNodes = actualNodeSelections.length;
                    const modifiedNode = actualNodeSelections.filter((selection) => true).find(selection => {
                        return selection.name.value === fieldName;
                    });
                    //fragment already includes that field -> delete it
                    if (modifiedNode && modifiedNode.loc) {
                        //TODO delete field to function
                        //if there is only one node left add '__typename' to the fragment to make the code valid
                        const { leftSpaces, leftNewLines } = countWhitespacesAndNewLinesToLeft(file, (_b = modifiedNode.loc) === null || _b === void 0 ? void 0 : _b.start);
                        file = file.substr(0, (((_c = modifiedNode.loc) === null || _c === void 0 ? void 0 : _c.start) - (leftSpaces + leftNewLines))) +
                            `${remainingNodes === 1 ? buildFragmentFieldStringWithIndent('__typename', leftSpaces) : ''}` +
                            file.substr((_d = modifiedNode.loc) === null || _d === void 0 ? void 0 : _d.end, file.length - 1);
                    }
                    else { //fragment not included -> add it
                        //if the only fragment field is '__typename' delete it and add new field
                        file = addFragmentField(file, { entity: fragmentName, property: fieldName }, parents, childrenField);
                        if (remainingNodes === 1)
                            file = ifTypenameDeleteIt(file, fragmentName, parents);
                    }
                    BREAK;
                }
            }
        });
        return file;
    }
    catch (error) {
        //TODO highligt in VS Code
        console.log(error);
    }
}
function buildFragmentFieldStringWithIndent(name, indent) {
    return `\n${Array(indent).fill(' ').join('')}${name}`;
}
function ifTypenameDeleteIt(file, fragmentName, parents) {
    const ast = parse(file);
    visit(ast, {
        FragmentDefinition(node) {
            var _a, _b, _c, _d;
            if (node.name.value === fragmentName) {
                let actualNodeSelections = node.selectionSet.selections;
                for (const actualParent of parents) {
                    const foundNode = actualNodeSelections.filter((selection) => true).find(selection => selection.name.value === actualParent);
                    if (foundNode && foundNode.selectionSet)
                        actualNodeSelections = (_a = foundNode.selectionSet) === null || _a === void 0 ? void 0 : _a.selections;
                    else
                        actualNodeSelections = [];
                }
                const typeNameField = actualNodeSelections.filter((selection) => true).find(selection => {
                    return selection.name.value === '__typename';
                });
                if (typeNameField && typeNameField.loc) {
                    const { leftSpaces, leftNewLines } = countWhitespacesAndNewLinesToLeft(file, (_b = typeNameField.loc) === null || _b === void 0 ? void 0 : _b.start);
                    file = file.substr(0, ((_c = typeNameField.loc) === null || _c === void 0 ? void 0 : _c.start) - (leftSpaces + leftNewLines)) + file.substr((_d = typeNameField.loc) === null || _d === void 0 ? void 0 : _d.end, file.length - 1);
                }
                BREAK;
            }
        }
    });
    return file;
}
export function countWhitespacesAndNewLinesToLeft(file, pos) {
    let spaces = 0;
    let newLines = 0;
    while (file.charAt(pos - 1) === ' ' || file.charAt(pos - 1) === '\n') {
        if (file.charAt(pos - 1) === ' ')
            spaces++;
        if (file.charAt(pos - 1) === '\n')
            newLines++;
        pos--;
    }
    return { leftSpaces: spaces, leftNewLines: newLines };
}
export function countWhitespacesAndNewLinesToRight(file, pos) {
    let spaces = 0;
    let newLines = 0;
    while (file.charAt(pos + 1) === ' ' || file.charAt(pos + 1) === '\n') {
        if (file.charAt(pos + 1) === ' ')
            spaces++;
        if (file.charAt(pos + 1) === '\n')
            newLines++;
        pos++;
    }
    return { rightSpaces: spaces, rightNewLines: newLines };
}
export function removeFragment(file, fragmentName) {
    const ast = parse(file);
    let removedFragment = '';
    let originalFileContent = '';
    visit(ast, {
        FragmentDefinition(node) {
            var _a, _b, _c, _d, _e;
            if (node.name.value === fragmentName && node.loc) {
                removedFragment = file.substr((_a = node.loc) === null || _a === void 0 ? void 0 : _a.start, ((_b = node.loc) === null || _b === void 0 ? void 0 : _b.end) - ((_c = node.loc) === null || _c === void 0 ? void 0 : _c.start));
                const { leftSpaces, leftNewLines } = countWhitespacesAndNewLinesToLeft(file, node.loc.start);
                const { rightSpaces, rightNewLines } = countWhitespacesAndNewLinesToRight(file, node.loc.end);
                originalFileContent = file.substr(0, ((_d = node.loc) === null || _d === void 0 ? void 0 : _d.start) - (leftSpaces + leftNewLines)) + file.substr(((_e = node.loc) === null || _e === void 0 ? void 0 : _e.end) + (rightSpaces + rightNewLines), file.length - 1);
                BREAK;
            }
        }
    });
    return { originalFileContent, removedFragment };
}
export function addFragment(file, fragment) {
    return file = `${file}\n${fragment}\n`;
}
