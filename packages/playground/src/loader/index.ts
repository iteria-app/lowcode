import type { KnownExtension, FileInfo, ImportPath, Transpiler } from './transpilation'

type SyncReader = ((path: string) => string)

type LookupTranspiler = (extension: KnownExtension) => Transpiler
type LookupImport = (importPath: ImportPath) => FileInfo

class Loader {

  imports: (importPath: ImportPath) => FileInfo
  readFile: SyncReader
  transpiler: LookupTranspiler

  constructor(reader: SyncReader, transpiler: LookupTranspiler, imports: LookupImport) {
    this.readFile = reader
    this.imports = imports
    this.transpiler = transpiler
  }

  fileContent(importPath: ImportPath) {
    const ref = this.imports(importPath)
    const content = this.readFile(ref.path)

    if (ref.extension) {
      const transpile = this.transpiler(ref.extension)
      if (transpile) {
        const transpiled = transpile(content)
        return transpiled
      }
    }
 
    return content
  }

}
