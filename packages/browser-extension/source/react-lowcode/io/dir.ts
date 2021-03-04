    
export interface CodeDir {
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): Promise<string[] | undefined>

    // getCurrentDirectory: () => "/",
    //
    // readDirectory: audit("readDirectory", directory => (directory === "/" ? Array.from(files.keys()) : [])),
    //
    // directoryExists: audit("directoryExists", directory => {
    //         return Array.from(files.keys()).some(path => path.startsWith(directory))
    //       }),
    // fileExists: audit("fileExists", fileName => files.has(fileName) || files.has(libize(fileName))),
}
