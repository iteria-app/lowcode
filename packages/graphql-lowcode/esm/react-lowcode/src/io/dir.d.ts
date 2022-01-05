export interface CodeDir {
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): Promise<string[] | undefined>;
}
