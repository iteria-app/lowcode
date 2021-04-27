export {}

import yargs from "yargs"

import fs from "fs"
import ts, {factory} from 'typescript'

import { graphqlGenTs1 } from "../tests/typeAlias.example"
import { Formatter, TableType, UiFramework } from "../definition/context-types"
import { ModuleGenerator } from "../generation/generators/module-generator"
import { createAst, parseGraphqlTypes, sourceFileEntity } from "../tests/helper"

const args = yargs.options({
    'basePath': { type: 'string', demandOption: true, alias: 'p' },
    'fileName': { type: 'string', demandOption: true, alias: 'f' },
    'ui': { type: 'string', demandOption: true, alias: 'u' },
    'formatter': { type: 'string', demandOption: true, alias: 'fr' },
    'component': { type: 'string', demandOption: true, alias: 'c' },
    'table': { type: 'string', demandOption: true, alias: 't' },
  }).argv;

class LocalCodegenCli{
    async generateList(){
        const sourceFile = createAst('')
        const myClassFile = parseGraphqlTypes(graphqlGenTs1)
        const testEntity = sourceFileEntity(myClassFile)

        let uif : UiFramework = (<any>UiFramework)[args['ui']];
        let formatter : Formatter = (<any>Formatter)[args['formatter']];
        let tableType : TableType = (<any>TableType)[args['table']];
        
        let generationContext = {uiFramework: uif, formatter: formatter, index: {tableType: tableType, height: "400px"}};
        let generator = new ModuleGenerator(generationContext, testEntity!!);
  
        const page = generator.generateIndexPage()
        
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  
        let sourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile)
        

        this.saveFile(sourceCode, args['basePath'], args['fileName'])
    }

    async generateDetail(){
        const sourceFile = createAst('')
        const myClassFile = parseGraphqlTypes(graphqlGenTs1)
        const testEntity = sourceFileEntity(myClassFile)

        let uif : UiFramework = (<any>UiFramework)[args['ui']];
        let formatter : Formatter = (<any>Formatter)[args['formatter']];
        let tableType : TableType = (<any>TableType)[args['table']];
        
        let generationContext = {uiFramework: uif, formatter: formatter, index: {tableType: tableType, height: "400px"}};
        let generator = new ModuleGenerator(generationContext, testEntity!!);
  
        const page = generator.generateDetailPage()
        
        const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
  
        let sourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile)
        
        this.saveFile(sourceCode, args['basePath'], args['fileName'])
    }

    async saveFile(sourceCode: string, basePath:string, fileName: string){
        let filePath = basePath + fileName

        await fs.writeFile(filePath, sourceCode,  function(err) {
            if (err) {
                return console.error(err);
            }
            console.log("File created!");
        });
    }
}

const cli = new LocalCodegenCli()

if(args['component'] === 'list')
    cli.generateList()
else if(args['component'] === 'detail'){
    cli.generateDetail()
}