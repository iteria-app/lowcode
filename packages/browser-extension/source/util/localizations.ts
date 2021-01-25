import { SourceFile, factory, ScriptKind, ScriptTarget } from "typescript"
import { ts } from "ts-morph";
import { Project } from "ts-morph"
import skSK from "../localization/skSK";


export function getValuesFromLocalizationASTJSON(astLocale:SourceFile | undefined) {
    let english:string[] = []
    let slovak:string[] = []
    let locales:string[] = []
    let positionsTable:any[] = []
    astLocale?.forEachChild((child:any)=>{
      child?.expression?.properties?.forEach((property:any)=>{
        console.log("Property",property)
        locales = [...locales, property.name.text]
        locales = [...locales, property.initializer.text]
        positionsTable = [...positionsTable, {text:property.initializer.text, position:property.initializer.pos }]
        english = [...english,property.name.text]
        slovak = [...slovak, property.initializer.text]
      })
    })
    console.log(positionsTable)
      return  {
        english,
        slovak,
        locales,
        positionsTable
      }
}

export function createFinalFile(printer:any, finalAST:any){
    console.log("FINAL AST", finalAST)
    console.log(printer.printFile(finalAST))
    console.log(finalAST?.print())
}

const project = new Project();

const localeSource = project.createSourceFile("skSK.ts", JSON.stringify(skSK))

export function transformSourceFile(positions:any[]) {
  localeSource.transform((traversal:any) => {
      const node = traversal.visitChildren();
      const found = positions.find((position:any)=>position?.position == node.pos)
      if(found?.position == node.pos && ts.isStringLiteral(node)) {
        node.text = found.text
        return ts.factory.createStringLiteral(found.text)
      }
        return node
      })
      console.log("New Source",localeSource)
      localeSource.transform((traversal:any) => {
        const node = traversal.visitChildren();
          return node
        })
      return localeSource
}

export function getValuesFromLocalizationAST(astLocale:SourceFile | undefined) {
  let expressions:any = []
  let locales:string[] = []
    const found = astLocale?.statements.find(statement=>statement)
    //@ts-ignore
    const statements = found?.statements
    statements.forEach((statement:any)=>{
      expressions = [...expressions, statement.expression]
    })
    expressions.forEach((expression:any)=>{
      if (expression.text){
        locales = [...locales, expression.text]
      } else {
        locales = [...locales, expression.left.text]
        locales = [...locales, expression.right.text]
      }
    })
    return locales
}

export function getLocales(locales:string[]) {
    let english:string[] = []
    let slovak:string[] = []
      
      locales.forEach((locale:string)=>{
        if (locales.indexOf(locale) % 2 == 0){
          english = [...english, locale]
        } else {
          slovak = [...slovak, locale]
        }
      })
      return{
          english,
          slovak
      }
}

export function createTable(english:string[], slovak:string[], panelWindow:Window) {
    const tableBody = panelWindow.document.getElementById('locale-tableBody')
      english.forEach((locale:any)=>{
        const tr =  panelWindow.document.createElement('tr')
        tableBody?.appendChild(tr)
        const td = panelWindow.document.createElement('td')
          td.innerText = locale
          tr.appendChild(td)
      })
      tableBody?.querySelectorAll('tr').forEach((tr, index) => {
        const input = panelWindow.document.createElement('input')
        const td = panelWindow.document.createElement('td')

        input.value = slovak[index]
        td.appendChild(input)
          tr.append(td);
        })   
  
}

export function saveTableValuesAndParseBack(tableBody:any, positions:any[]) {
  let englishTable:string[] = [] 
  let slovakTable:string[] = []
  for (var r = 0, n = tableBody.rows.length; r < n; r++) {
      for (var c = 0, m = tableBody.rows[r].cells.length; c < m; c++) {

        if (tableBody.rows[r].cells[c].childNodes[0].nodeType == Node.TEXT_NODE ) {
          englishTable = [...englishTable, tableBody.rows[r].cells[c].innerHTML]
        } else {
          slovakTable = [...slovakTable, tableBody.rows[r].cells[c].getElementsByTagName('input')[0]?.value]
          positions[r].text = tableBody.rows[r].cells[c].getElementsByTagName('input')[0]?.value
        }
      }
  }
  return {englishTable, slovakTable, positions}
    
}

export function saveTableToObjects(englishTable:string[], slovakTable:string[]) {
  let table:any = [] 
  englishTable.forEach((english:string)=>{
    table = [...table, {en:english, sk:''}]
  })
  slovakTable.forEach((slovak:string, index)=>{
    table[index].sk = slovak 
  })
  return table
}

export function createObjectLiteralFromTable(locales:[]) {
  let tsArray:any[] = []
  factory.createExpressionStatement(factory.createObjectLiteralExpression(
    [
      factory.createPropertyAssignment(
        factory.createIdentifier("export"),
        factory.createIdentifier("")
      ),
      factory.createPropertyAssignment(
        factory.createIdentifier("default"),
        factory.createObjectLiteralExpression(
          tsArray,
          true
        )
      )
    ],
    false
  ))

  locales.forEach((locale:any)=>{
    console.log(factory.createPropertyAssignment(
      factory.createStringLiteral(locale.en),
      factory.createStringLiteral(locale.sk)
    ))
    tsArray = [...tsArray,factory.createPropertyAssignment(
      factory.createStringLiteral(locale.en),
      factory.createStringLiteral(locale.sk)
    ) ]
  })

  console.log("TS array", tsArray)
  
  return [
    factory.createExpressionStatement(factory.createObjectLiteralExpression(
      [
        factory.createPropertyAssignment(
          factory.createIdentifier("export"),
          factory.createIdentifier("")
        ),
        factory.createPropertyAssignment(
          factory.createIdentifier("default"),
          factory.createObjectLiteralExpression(
            tsArray,
            true
          )
        )
      ],
      false
    ))
  ];
}

export function createFileFromAST(ast:any){
  const printer = ts.createPrinter();
  console.log("AST", ast)
  const final = printer.printFile(ast)
  //@ts-ignore
console.log("Print", final.print())
}



// factory.createExportAssignment(
    //   undefined,
    //   undefined,
    //   undefined,
    //   factory.createObjectLiteralExpression(
    //     [
    //       factory.createPropertyAssignment(
    //         factory.createStringLiteral("year"),
    //         factory.createStringLiteral("rok")
    //       ),
    //       factory.createPropertyAssignment(
    //         factory.createStringLiteral("month"),
    //         factory.createStringLiteral("mesiac")
    //       )
    //     ],
    //     true
    //   )
    // )


    // console.log("Expression", [
    //   factory.createExpressionStatement(factory.createObjectLiteralExpression(
    //     [
    //       factory.createPropertyAssignment(
    //         factory.createIdentifier("export"),
    //         factory.createIdentifier("")
    //       ),
    //       factory.createPropertyAssignment(
    //         factory.createIdentifier("default"),
    //         factory.createObjectLiteralExpression(
    //           tsArray,
    //           true
    //         )
    //       )
    //     ],
    //     false
    //   ))
    // ])