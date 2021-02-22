import { StringLiteral } from "ts-morph";

export interface Message {
    id: string;
    value: string;
    locale: string;
    position: Position
}

export interface Position {
    pos: number;
    end: number;
}

export interface MultiMessage {
    id: string;
    skSK: MessageLocale
    enEN: MessageLocale
}

export interface MessageLocale {
    value: string;
    position: Position
}
