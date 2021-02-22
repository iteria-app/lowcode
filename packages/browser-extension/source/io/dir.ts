    
export interface CodeDir {
    //TODO getCurrentDirectory: () => "/",

    //readDirectory: audit("readDirectory", directory => (directory === "/" ? Array.from(files.keys()) : [])),

    // TODO: could make a real file tree
    //       directoryExists: audit("directoryExists", directory => {
    //         return Array.from(files.keys()).some(path => path.startsWith(directory))
    //       }),
    //       fileExists: audit("fileExists", fileName => files.has(fileName) || files.has(libize(fileName))),
}
