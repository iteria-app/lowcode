export declare function addFragmentField(graphqlQuery: string, options: {
    entity: string;
    property: string;
}, parents: string[], childrenField?: boolean): string;
export declare function getFieldIndentation(graphqlQuery: string, fragmentStartIndex: number | undefined): number;
