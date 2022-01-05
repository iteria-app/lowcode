import { SourceLineCol } from "../ast";
import { CodeRW } from "../io";
import { InsertOptions, WidgetProperties } from "./interfaces";
export declare function isSelectedFormWidget(sourceCode: string, formPosition: SourceLineCol): boolean;
export declare function getFormWidgetProperties(io: CodeRW, sourceCode: SourceLineCol): Promise<WidgetProperties>;
export declare function setFormWidgetProperties(io: CodeRW, sourceCode: SourceLineCol, properties: WidgetProperties): Promise<string | undefined>;
export declare function addFormInput(typesSourceCode: string, io: CodeRW, sourceLine: SourceLineCol, options: InsertOptions): Promise<string | undefined>;
