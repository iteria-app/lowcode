import ts, {factory} from "typescript"

export function jsxText(text: string): ts.JsxText{
    return factory.createJsxText(text)
}

export function stringLiteral(text: string): ts.StringLiteral{
    return factory.createStringLiteral(text)
}