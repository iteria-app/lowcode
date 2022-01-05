import ts from "typescript";
export declare const createSelfClosingJsxRouteElement: (newPageName: string) => ts.JsxSelfClosingElement;
export declare const createOpeningAndClosingJsxRouteElement: (newPageName: string) => (ts.JsxOpeningElement | ts.JsxClosingElement)[];
export declare const wrapNodesWithFragment: <T extends ts.Node | ts.JsxChild>(node: ts.Node, newNodes: T[]) => ts.JsxFragment;
export declare const createEmptySpanElement: () => ts.JsxElement;
