import ts, {factory} from "typescript"

export function identifier(text: string) {
    return factory.createIdentifier(text)
}