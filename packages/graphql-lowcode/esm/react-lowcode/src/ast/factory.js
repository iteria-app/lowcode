import { ScriptTarget, ScriptKind, } from "typescript";
import * as ts from "typescript";
//'@typescript/vfs'
export function createAst(code, scriptTarget = ScriptTarget.ESNext, scriptKind = ScriptKind.TSX, filePath = `/ts-ast-viewer.tsx`) {
    const sourceFile = ts.createSourceFile(filePath, code, scriptTarget, true, scriptKind);
    const program = getBindingResult(filePath, sourceFile, scriptTarget);
    return program.getSourceFile(filePath);
}
export function createProgram(code, scriptTarget = ScriptTarget.ESNext, scriptKind = ScriptKind.TSX, filePath = `/ts-ast-viewer.tsx`) {
    const sourceFile = ts.createSourceFile(filePath, code, scriptTarget, true, scriptKind);
    const program = getBindingResult(filePath, sourceFile, scriptTarget);
    return program;
}
function getBindingResult(filePath, sourceFile, scriptTarget) {
    const options = {
        strict: true,
        target: scriptTarget,
        allowJs: true,
        module: ts.ModuleKind.ESNext,
        jsx: ts.JsxEmit.React,
    };
    const files = {
        [filePath]: sourceFile,
    };
    const compilerHost = {
        getSourceFile: (fileName /*, languageVersion: ScriptTarget, onError?: (message: string) => void*/) => {
            return files[fileName];
        },
        // getSourceFileByPath: (...) => {}, // not providing these will force it to use the file name as the file path
        // getDefaultLibLocation: (...) => {},
        getDefaultLibFileName: ( /*defaultLibOptions: CompilerOptions*/) => "/lib",
        writeFile: () => {
            // do nothing
        },
        getCurrentDirectory: () => "/",
        getDirectories: ( /*path: string*/) => [],
        fileExists: (fileName) => files[fileName] != null,
        readFile: (fileName) => files[fileName] != null ? files[fileName].getFullText() : undefined,
        getCanonicalFileName: (fileName) => fileName,
        useCaseSensitiveFileNames: () => true,
        getNewLine: () => "\n",
        getEnvironmentVariable: () => "",
    };
    const program = ts.createProgram([...Object.keys(files)], options, compilerHost);
    return program;
}
