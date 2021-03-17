import ts, {
  SourceFile,
  CompilerOptions,
  ScriptTarget,
  ScriptKind,
  CompilerHost,
} from "typescript"
//'@typescript/vfs'

export function createAst(
  code: string,
  scriptTarget = ScriptTarget.ESNext,
  scriptKind = ScriptKind.TSX,
  filePath = `/ts-ast-viewer.tsx`
) {
  const sourceFile = ts.createSourceFile(
    filePath,
    code,
    scriptTarget,
    true,
    scriptKind
  )
  const program = getBindingResult()
  return program.getSourceFile(filePath)!!

  function getBindingResult() {
    const options: CompilerOptions = {
      strict: true,
      target: scriptTarget,
      allowJs: true,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.React,
    }
    const files: { [name: string]: SourceFile | undefined } = {
      [filePath]: sourceFile,
    }

    const compilerHost: CompilerHost = {
      getSourceFile: (
        fileName: string /*, languageVersion: ScriptTarget, onError?: (message: string) => void*/
      ) => {
        return files[fileName]
      },
      // getSourceFileByPath: (...) => {}, // not providing these will force it to use the file name as the file path
      // getDefaultLibLocation: (...) => {},
      getDefaultLibFileName: (/*defaultLibOptions: CompilerOptions*/) => "/lib",
      writeFile: () => {
        // do nothing
      },
      getCurrentDirectory: () => "/",
      getDirectories: (/*path: string*/) => [],
      fileExists: (fileName: string) => files[fileName] != null,
      readFile: (fileName: string) =>
        files[fileName] != null ? files[fileName]!.getFullText() : undefined,
      getCanonicalFileName: (fileName: string) => fileName,
      useCaseSensitiveFileNames: () => true,
      getNewLine: () => "\n",
      getEnvironmentVariable: () => "",
    }
    const program = ts.createProgram(
      [...Object.keys(files)],
      options,
      compilerHost
    )
    return program
  }
}
