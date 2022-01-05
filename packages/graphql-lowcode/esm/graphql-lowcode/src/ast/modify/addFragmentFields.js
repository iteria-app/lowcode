import { parse, visit } from 'graphql';
export function addFragmentField(graphqlQuery, options, parents, childrenField) {
    //if fragment does not contain fragment keyword -> returns unchanged query
    if (!graphqlQuery.indexOf('fragment'))
        return graphqlQuery;
    //if query is inline add spaces after newProperty, else add new line
    const format = graphqlQuery.indexOf('\n') >= 0 ? '\n' : '';
    const queryOffsetsForFields = findQueryOffsetsForFields(graphqlQuery, options.entity, options.property, parents);
    if (childrenField)
        options.property = `${options.property} {\n    __typename\n  }`; //TODO change
    const finalQuery = patchQueryFields(graphqlQuery, queryOffsetsForFields, options.property, format);
    return finalQuery;
}
function findQueryOffsetsForFields(graphqlQuery, entity, property, parents) {
    const ast = parse(graphqlQuery);
    let queryOffsetForFields = [];
    visit(ast, {
        FragmentDefinition(node) {
            var _a, _b, _c, _d, _e, _f;
            if (node.name.value === entity) {
                let actualNodeSelections = node.selectionSet.selections;
                let actualNodePos = node.loc;
                for (const actualParent of parents) {
                    const foundNode = actualNodeSelections.filter((selection) => true).find(selection => selection.name.value === actualParent);
                    if (foundNode && foundNode.selectionSet) {
                        actualNodeSelections = foundNode.selectionSet.selections;
                        actualNodePos = foundNode.loc;
                    }
                    else
                        actualNodeSelections = [];
                }
                const firstFragmentField = actualNodeSelections[0];
                const lastFragmentField = actualNodeSelections[actualNodeSelections.length - 1];
                const startIndex = (_b = (_a = firstFragmentField === null || firstFragmentField === void 0 ? void 0 : firstFragmentField.loc) === null || _a === void 0 ? void 0 : _a.start) !== null && _b !== void 0 ? _b : actualNodePos === null || actualNodePos === void 0 ? void 0 : actualNodePos.start;
                const endIndex = (_d = (_c = lastFragmentField === null || lastFragmentField === void 0 ? void 0 : lastFragmentField.loc) === null || _c === void 0 ? void 0 : _c.end) !== null && _d !== void 0 ? _d : actualNodePos === null || actualNodePos === void 0 ? void 0 : actualNodePos.end;
                //if fragment does not contain the new property, calculate relative offset to original qiery and indent size for every fragment
                if (endIndex && ((_e = node.selectionSet) === null || _e === void 0 ? void 0 : _e.selections) && !fragmentContainsField((_f = node.selectionSet) === null || _f === void 0 ? void 0 : _f.selections, property)) {
                    queryOffsetForFields = [...queryOffsetForFields, {
                            offset: endIndex,
                            indentSize: getFieldIndentation(graphqlQuery, startIndex)
                        }];
                }
            }
        }
    });
    return queryOffsetForFields;
}
export function getFieldIndentation(graphqlQuery, fragmentStartIndex) {
    //first create substring from 0 to fragmentStartIndex
    const subString = graphqlQuery.substr(0, fragmentStartIndex);
    //then convert string into array and reverse it, indent spaces should be at the beginning
    const reversedString = subString.split('').reverse().join('');
    //then just iterate through the string and count spaces
    let indent = 0;
    for (const char of reversedString) {
        if (char === ' ')
            indent++;
        else
            break;
    }
    return indent;
}
function patchQueryFields(graphqlQuery, queryOffsetsForFields, property, format) {
    //after new property is added to a graphql string, the whole string gets longer -> next new properties must be offseted 
    //by property length + indentation + if format of query is multiline then add '\n' length, which is one
    let extraOffset = 0;
    queryOffsetsForFields.forEach(field => {
        const indentString = Array(field.indentSize).fill(' ').join('');
        graphqlQuery = graphqlQuery.substr(0, field.offset + extraOffset) + `${format}${indentString}${property}` + graphqlQuery.substr(field.offset + extraOffset);
        extraOffset += property.length + field.indentSize + format.length;
    });
    return graphqlQuery;
}
function fragmentContainsField(framentSelections, property) {
    //checks if fragment contains property
    return framentSelections.some(selection => selection.name.value === property);
}
