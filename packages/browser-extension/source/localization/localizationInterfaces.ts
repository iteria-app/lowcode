export interface Message {
    id: string;
    value: string;
    locale: string;
    position: Position
}

export interface Position {
    start: number;
    end: number;
}
