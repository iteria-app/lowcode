export declare function removeOrAddQuery(file: string, queryName: string, queryCache: {
    name: string;
    query: string;
    fragment: string;
}[]): {
    updatedFile: string;
    queryCache: {
        name: string;
        query: string;
        fragment: string;
    }[];
};
