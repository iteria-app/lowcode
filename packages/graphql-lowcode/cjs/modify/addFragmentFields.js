"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFieldIndentation = exports.addFragmentField = void 0;
var graphql_1 = require("graphql");
function addFragmentField(graphqlQuery, options) {
    //if fragment does not contain fragment keyword -> returns unchanged query
    if (!graphqlQuery.indexOf('fragment'))
        return graphqlQuery;
    //if query is inline add spaces after newProperty, else add new line
    var format = graphqlQuery.indexOf('\n') >= 0 ? '\n' : '';
    var queryOffsetsForFields = findQueryOffsetsForFields(graphqlQuery, options.entity, options.property);
    var finalQuery = patchQueryFields(graphqlQuery, queryOffsetsForFields, options.property, format);
    return finalQuery;
}
exports.addFragmentField = addFragmentField;
function findQueryOffsetsForFields(graphqlQuery, entity, property) {
    var ast = graphql_1.parse(graphqlQuery);
    var queryOffsetForFields = [];
    graphql_1.visit(ast, {
        Field: function (node) {
            var _a, _b, _c, _d, _e, _f;
            if (node.name.value === entity) {
                var firstFragmentField = (_a = node.selectionSet) === null || _a === void 0 ? void 0 : _a.selections[0];
                var lastFragmentField = (_b = node.selectionSet) === null || _b === void 0 ? void 0 : _b.selections[node.selectionSet.selections.length - 1];
                var startIndex = (_c = firstFragmentField === null || firstFragmentField === void 0 ? void 0 : firstFragmentField.loc) === null || _c === void 0 ? void 0 : _c.start;
                var endIndex = (_d = lastFragmentField === null || lastFragmentField === void 0 ? void 0 : lastFragmentField.loc) === null || _d === void 0 ? void 0 : _d.end;
                //if fragment does not contain the new property, calculate relative offset to original qiery and indent size for every fragment
                if (endIndex && ((_e = node.selectionSet) === null || _e === void 0 ? void 0 : _e.selections) && !fragmentContainsField((_f = node.selectionSet) === null || _f === void 0 ? void 0 : _f.selections, property)) {
                    queryOffsetForFields = __spreadArray(__spreadArray([], __read(queryOffsetForFields)), [{
                            offset: endIndex,
                            indentSize: getFieldIndentation(graphqlQuery, startIndex)
                        }]);
                }
            }
        }
    });
    return queryOffsetForFields;
}
function getFieldIndentation(graphqlQuery, fragmentStartIndex) {
    var e_1, _a;
    //first create substring from 0 to fragmentStartIndex
    var subString = graphqlQuery.substr(0, fragmentStartIndex);
    //then convert string into array and reverse it, indent spaces should be at the beginning
    var reversedString = subString.split('').reverse().join('');
    //then just iterate through the string and count spaces
    var indent = 0;
    try {
        for (var reversedString_1 = __values(reversedString), reversedString_1_1 = reversedString_1.next(); !reversedString_1_1.done; reversedString_1_1 = reversedString_1.next()) {
            var char = reversedString_1_1.value;
            if (char === ' ')
                indent++;
            else
                break;
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (reversedString_1_1 && !reversedString_1_1.done && (_a = reversedString_1.return)) _a.call(reversedString_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return indent;
}
exports.getFieldIndentation = getFieldIndentation;
function patchQueryFields(graphqlQuery, queryOffsetsForFields, property, format) {
    //after new property is added to a graphql string, the whole string gets longer -> next new properties must be offseted 
    //by property length + indentation + if format of query is multiline then add '\n' length, which is one
    var extraOffset = 0;
    queryOffsetsForFields.forEach(function (field) {
        var indentString = Array(field.indentSize).fill(' ').join('');
        graphqlQuery = graphqlQuery.substr(0, field.offset + extraOffset) + ("" + format + indentString + property) + graphqlQuery.substr(field.offset + extraOffset);
        extraOffset += property.length + field.indentSize + format.length;
    });
    return graphqlQuery;
}
function fragmentContainsField(framentSelections, property) {
    //checks if fragment contains property
    return framentSelections.some(function (selection) { return selection.name.value === property; });
}
