import ts from "typescript";
import { SourceLineCol } from "../../ast";
import { WidgetProperty } from "../interfaces";
export declare function findWidgetParentNode(sourceCode: string, position: SourceLineCol): ts.Node | null | undefined;
export declare function isDataTableWidget(sourceCode: string, position: SourceLineCol): boolean;
export declare function isFormWidget(sourceCode: string, position: SourceLineCol): boolean;
export declare function getWidgetProperties(node: ts.Node): WidgetProperty[];
