
export interface CodeRW {
    // inspired by typescript.System (just async)
    readFile(path: string, encoding?: string): Promise<string | undefined>
    // inspired by typescript.System (just async)
    writeFile(path: string, data: string): Promise<void>
}
