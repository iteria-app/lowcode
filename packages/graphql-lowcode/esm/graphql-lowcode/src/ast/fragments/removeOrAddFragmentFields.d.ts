export declare function removeOrAddFragmentField(file: string, fragmentName: string, fieldName: string, parents: string[], childrenField?: boolean): string;
export declare function countWhitespacesAndNewLinesToLeft(file: string, pos: number): {
    leftSpaces: number;
    leftNewLines: number;
};
export declare function countWhitespacesAndNewLinesToRight(file: string, pos: number): {
    rightSpaces: number;
    rightNewLines: number;
};
export declare function removeFragment(file: string, fragmentName: string): {
    originalFileContent: string;
    removedFragment: string;
};
export declare function addFragment(file: string, fragment: string): string;
