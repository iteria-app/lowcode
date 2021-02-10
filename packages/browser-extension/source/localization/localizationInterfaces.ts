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
