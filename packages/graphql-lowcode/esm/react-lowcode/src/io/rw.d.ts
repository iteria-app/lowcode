export interface CodeRW {
    readFile(path: string, encoding?: string): Promise<string | undefined>;
    writeFile(path: string, data: string): Promise<void>;
}
