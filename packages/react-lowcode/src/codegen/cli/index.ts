export {}

import yargs from "yargs"

import fs from "fs"
import ts, {factory} from 'typescript'

import { graphqlGenTs1 } from "../tests/typeAlias.example"
import { Formatter, TableType, UiFramework } from "../definition/context-types"
import { AppGenerator } from "../generation/generators/app-generator"
import { createAst, parseGraphqlTypes, sourceFileEntity } from "../tests/helper"

const LIST_COMPONENT = 'list'
const DETAIL_COMPONENT = 'detail'

const args = yargs.options({
    'basePath': { type: 'string', demandOption: true, alias: 'p' },
    'fileName': { type: 'string', demandOption: true, alias: 'f' },
    'ui': { type: 'string', demandOption: true, alias: 'u', choices: [UiFramework.MaterialUI.toString(), UiFramework.Grommet.toString()] },
    'formatter': { type: 'string', demandOption: true, alias: 'fr', choices: [Formatter.ReactIntl.toString(), Formatter.None.toString()] },
    'component': { type: 'string', demandOption: true, alias: 'c', choices: [LIST_COMPONENT, DETAIL_COMPONENT] },
    'table': { type: 'string', demandOption: true, alias: 't', choices: [TableType.DataTable.toString(), TableType.BasicTable.toString()] },
  }).argv;

async function generateList(){
    const sourceFile = createAst('')
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)

    let uif : UiFramework = (<any>UiFramework)[args['ui']];
    let formatter : Formatter = (<any>Formatter)[args['formatter']];
    let tableType : TableType = (<any>TableType)[args['table']];
    
    let generationContext = {uiFramework: uif, formatter: formatter, index: {tableType: tableType, height: "400px"}};
    let generator = new AppGenerator(generationContext, testEntity!!);

    const page = generator.generateListPage()
    
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
    let sourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile)
    saveFile(sourceCode, args['basePath'], args['fileName'])
}

async function generateDetail(){
    const sourceFile = createAst('')
    const myClassFile = parseGraphqlTypes(graphqlGenTs1)
    const testEntity = sourceFileEntity(myClassFile)

    let uif : UiFramework = (<any>UiFramework)[args['ui']];
    let formatter : Formatter = (<any>Formatter)[args['formatter']];
    let tableType : TableType = (<any>TableType)[args['table']];
    
    let generationContext = {uiFramework: uif, formatter: formatter, index: {tableType: tableType, height: "400px"}};
    let generator = new AppGenerator(generationContext, testEntity!!);

    const page = generator.generateDetailPage()
    
    const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })
    let sourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page.imports, page.functionDeclaration]), sourceFile)
    saveFile(sourceCode, args['basePath'], args['fileName'])
}

async function saveFile(sourceCode: string, basePath:string, fileName: string){
    let filePath = basePath + fileName

    await fs.writeFile(filePath, sourceCode,  function(err) {
        if (err) {
            return console.error(err);
        }
        console.log("File created!");
    });
}

if (args.component === LIST_COMPONENT)
    generateList()
else if(args.component === DETAIL_COMPONENT){
    generateDetail()
}