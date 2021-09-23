import { SourceLineCol } from "../ast";
import { CodeRW } from "../io";
import { ColumnSourcePositionOptions, ColumnSourcePositionResult, DeleteOptions, InsertOptions } from "./interfaces";
export declare function isSelectedDataTable(sourceCode: string, tablePosition: SourceLineCol): boolean;
export declare function addColumn(typesSourceCode: string, io: CodeRW, sourceCode: SourceLineCol, options: InsertOptions): Promise<string | undefined>;
export declare function deleteColumn(io: CodeRW, sourceCode: SourceLineCol, options: DeleteOptions): Promise<string | undefined>;
export declare function getColumnSourcePosition(io: CodeRW, sourceCode: SourceLineCol, options: ColumnSourcePositionOptions): Promise<ColumnSourcePositionResult | undefined>;
