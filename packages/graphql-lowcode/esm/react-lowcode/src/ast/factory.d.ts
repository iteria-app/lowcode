import { SourceFile, ScriptTarget, ScriptKind } from "typescript";
import * as ts from "typescript";
export declare function createAst(code: string, scriptTarget?: ScriptTarget, scriptKind?: ScriptKind, filePath?: string): SourceFile;
export declare function createProgram(code: string, scriptTarget?: ScriptTarget, scriptKind?: ScriptKind, filePath?: string): ts.Program;
