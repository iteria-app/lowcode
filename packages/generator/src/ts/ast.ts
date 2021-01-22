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
