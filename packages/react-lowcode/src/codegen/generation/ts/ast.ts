import { astFindSource, SourceLineCol } from "../../../ast";
import ts, { factory } from "typescript"


export interface Node {
    getText(includeJsDocComments?: boolean): string;
}

export interface Symbol {
    isAnonymous(): boolean;
    isAny(): boolean;
    isArray(): boolean;
    isBoolean(): boolean;
    isString(): boolean;
    isNumber(): boolean;
    isBooleanLiteral(): boolean;
    isEnumLiteral(): boolean;
    isNumberLiteral(): boolean;
    isStringLiteral(): boolean;
    isClass(): boolean;
    isClassOrInterface(): boolean;
    isEnum(): boolean;
    isInterface(): boolean;
    isObject(): boolean;
    //isTypeParameter(): this is TypeParameter;
    isTuple(): boolean;
    isUnion(): boolean;
    isIntersection(): boolean;
    isUnionOrIntersection(): boolean;
    isUnknown(): boolean;
    isNull(): boolean;
    isUndefined(): boolean;
}

export function findWidgetDefinition(code: string, position: SourceLineCol){
    const found = astFindSource(code, position)
    
    if (found) {
        let before = code.substring(0, found.end)
        let startOfWidget = before.lastIndexOf('export')

    }else{
        console.log("source not found", found)
    }
}

export function findVariableDeclarations(parentNode: ts.Node, array: ts.VariableDeclaration[]) {
    if(parentNode != undefined){
        if(ts.isVariableDeclaration(parentNode)){
            array.push(parentNode)
        }
        else if(parentNode.getChildCount() > 0){
            var children = parentNode.getChildren()
            children.forEach((child) => {
                findVariableDeclarations(child, array)
            });
        }
    }
}


