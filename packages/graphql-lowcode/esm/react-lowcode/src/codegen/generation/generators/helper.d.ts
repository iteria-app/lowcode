import ts from "typescript";
import GenerationContext from "../context/context";
import { Entity, Property } from "../entity";
import { Component } from "../react-components/react-component-helper";
import ReactIntlFormatter from "../react-components/react-intl/intl-formatter";
export declare class GeneratorHelper {
    readonly _context: GenerationContext;
    readonly _imports: ts.ImportDeclaration[];
    readonly intlFormatter: ReactIntlFormatter;
    constructor(generationContext: GenerationContext, imports: ts.ImportDeclaration[]);
    getEntityName(entity: Entity): string;
    addImportDeclaration(specifier: string, module: string, isNameSpaceImport?: boolean): ts.ImportDeclaration;
    getComponentName(entity: Entity): string;
    prepareComponent(component: Component, imports: ts.ImportDeclaration[]): Component;
    getHeaderTitle(entity: Entity, property: Property): ts.StringLiteral | ts.JsxSelfClosingElement;
    getHeaderTitleJsxText(entity: Entity, property: Property): ts.JsxText | ts.JsxSelfClosingElement;
    getInputParameterIdentifier(entity: Entity): ts.Identifier;
    localizePropertyNameWithTag(entity: Entity, property: Property): ts.JsxSelfClosingElement;
    createInputParameter(entity: Entity): ts.ParameterDeclaration;
}
