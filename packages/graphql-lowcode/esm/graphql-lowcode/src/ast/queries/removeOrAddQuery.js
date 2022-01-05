import { BREAK, parse, visit } from 'graphql';
import { getFragmentSpreadName, getLastQueryLoc, getNumberOfQueries } from '../getters';
import { removeFragment, addFragment, countWhitespacesAndNewLinesToLeft, countWhitespacesAndNewLinesToRight } from '../fragments/removeOrAddFragmentFields';
const placeholder_query = `query PlaceholderQuery {\n  __typename\n}`;
export function removeOrAddQuery(file, queryName, queryCache) {
    try {
        const ast = parse(file);
        let queryFound = false;
        const remainingQueries = getNumberOfQueries(file);
        visit(ast, {
            OperationDefinition(node) {
                var _a;
                if (((_a = node.name) === null || _a === void 0 ? void 0 : _a.value) === queryName && node.loc) {
                    //deletes fragment
                    const fragmentName = getFragmentSpreadName(file, queryName);
                    const { originalFileContent, removedFragment } = removeFragment(file, fragmentName);
                    //deletes query
                    const { fileWithoutQuery, removedQuery } = removeQuery(originalFileContent, queryName);
                    queryCache = [...queryCache, { name: queryName, query: removedQuery, fragment: removedFragment }];
                    if (remainingQueries === 1)
                        file = placeholder_query;
                    else
                        file = fileWithoutQuery;
                    queryFound = true;
                    BREAK;
                }
            }
        });
        //if query was not found, add it to file + fragment
        if (!queryFound) {
            const queryToBeAdded = queryCache.find(query => query.name === queryName);
            queryCache = queryCache.filter(query => query.name != queryName);
            if (queryToBeAdded) {
                if (isPlaceholderQuery(file)) {
                    const { fileWithoutQuery } = removeQuery(file, 'PlaceholderQuery');
                    file = fileWithoutQuery;
                }
                const lastQueryPos = getLastQueryLoc(file);
                file = addQuery(file, queryToBeAdded.query, lastQueryPos);
                file = addFragment(file, queryToBeAdded.fragment);
            }
        }
    }
    catch (error) {
        //TODO highligt in VS Code
        console.log(error);
    }
    const updatedFile = file;
    return { updatedFile, queryCache };
}
function addQuery(file, query, pos) {
    if (pos === 0)
        return file.substr(0, pos) + `${query}\n` + file.substr(pos, file.length);
    return file.substr(0, pos) + `\n\n${query}\n` + file.substr(pos, file.length);
}
function removeQuery(file, queryName) {
    const ast = parse(file);
    let removedQuery = '';
    let fileWithoutQuery = '';
    visit(ast, {
        OperationDefinition(node) {
            var _a, _b, _c, _d, _e, _f;
            if (((_a = node.name) === null || _a === void 0 ? void 0 : _a.value) === queryName && node.loc) {
                const { leftSpaces, leftNewLines } = countWhitespacesAndNewLinesToLeft(file, node.loc.start);
                const { rightSpaces, rightNewLines } = countWhitespacesAndNewLinesToRight(file, node.loc.end);
                removedQuery = file.substr((_b = node.loc) === null || _b === void 0 ? void 0 : _b.start, ((_c = node.loc) === null || _c === void 0 ? void 0 : _c.end) - ((_d = node.loc) === null || _d === void 0 ? void 0 : _d.start));
                fileWithoutQuery = file.substr(0, ((_e = node.loc) === null || _e === void 0 ? void 0 : _e.start) - (leftSpaces + leftNewLines)) + file.substr(((_f = node.loc) === null || _f === void 0 ? void 0 : _f.end) + (rightSpaces + rightNewLines), file.length - 1);
                BREAK;
            }
        }
    });
    return { fileWithoutQuery, removedQuery };
}
function isPlaceholderQuery(file) {
    const ast = parse(file);
    let isPlaceholderQuery = false;
    visit(ast, {
        OperationDefinition(node) {
            var _a;
            if (((_a = node.name) === null || _a === void 0 ? void 0 : _a.value) === 'PlaceholderQuery') {
                if (node.selectionSet.selections.filter((selection) => true).some(selection => selection.name.value === '__typename')) {
                    isPlaceholderQuery = true;
                    BREAK;
                }
            }
        }
    });
    return isPlaceholderQuery;
}
