import { CharRange, createAst } from "../ast";

export interface Message {
    id: string;
    value: string;
    locale: string;
    position: CharRange
}

export * from './json'
export * from './dom'
export * from './io'
