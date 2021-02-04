export interface LocaleMessage {
    id: string;
    value: string;
    locale: string;
    position: Position
}

export interface Position {
    start: number;
    end: number;
}

export interface Message {
    id: string;
    start: number;
    end: number;
}