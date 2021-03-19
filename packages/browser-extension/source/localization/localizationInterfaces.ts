import { CharRange } from "@iteria-app/react-lowcode/esm/ast";


export interface MultiMessage {
    id: string;
    skSK: MessageLocale
    enEN: MessageLocale
}

export interface MessageLocale {
    value: string;
    position: CharRange
}
