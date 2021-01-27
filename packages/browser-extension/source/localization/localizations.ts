import { SourceFile, factory, ScriptKind, ScriptTarget, createSourceFile, Printer } from "typescript"
import { TransformTraversalControl, ts } from "ts-morph";
import { Project } from "ts-morph"
import sk_SK from "./sk_SK";
import { LocaleWithPosition } from "./localizationInterfaces";


export function getValuesFromLocalizationASTJSON(astLocale: SourceFile | undefined) {
  let english: string[] = []
  let slovak: string[] = []
  let locales: string[] = []
  let positionsTable: LocaleWithPosition[] = []
  astLocale?.forEachChild((child: any) => {
    child?.expression?.properties?.forEach((property: any) => {
      console.log("Property", property)
      locales = [...locales, property.name.text]
      locales = [...locales, property.initializer.text]
      positionsTable = [...positionsTable, { text: property.initializer.text, position: property.initializer.pos }]
      english = [...english, property.name.text]
      slovak = [...slovak, property.initializer.text]
    })
  })
  console.log(positionsTable)
  return {
    english,
    slovak,
    locales,
    positionsTable
  }
}

export function createFinalFile(printer: Printer, finalAST: ts.SourceFile) {
  const file = createSourceFile(finalAST.fileName, finalAST.text, ScriptTarget.ESNext, true, ScriptKind.JSON)
  try {
    const formated = ts.parseJsonText("sk_SK.ts", finalAST.text)
    formated.text = formated.text
    const fileFormated = createSourceFile(formated.fileName, formated.text, ScriptTarget.ESNext, true, ScriptKind.JSON)
    return printer.printFile(fileFormated)
  } catch (error) {
    console.log("Error", error)
  }
  return printer.printFile(file)
}

const project = new Project();
const localeSource = project.createSourceFile("sk_SK.ts", JSON.stringify(sk_SK))


export function transformSourceFile(positions: LocaleWithPosition[]) {
  localeSource.transform((traversal: TransformTraversalControl) => {
    const node = traversal.visitChildren();
    const found = positions.find((position: LocaleWithPosition) => position?.position == node.pos)
    if (found && found?.position == node.pos && ts.isStringLiteral(node)) {
      node.text = found.text

      return ts.factory.createStringLiteral(found.text)
    }
    ts.SyntaxKind.NewLineTrivia
    return node
  })
  console.log("New Source", localeSource)
  localeSource.transform((traversal: TransformTraversalControl) => {
    const node = traversal.visitChildren();
    return node
  })
  return localeSource
}

export function saveTableValuesAndParseBack(tableBody: any, positions: LocaleWithPosition[]) {
  let englishTable: string[] = []
  let slovakTable: string[] = []
  for (var r = 0, n = tableBody.rows.length; r < n; r++) {
    for (var c = 0, m = tableBody.rows[r].cells.length; c < m; c++) {

      if (tableBody.rows[r].cells[c].childNodes[0].nodeType == Node.TEXT_NODE) {
        englishTable = [...englishTable, tableBody.rows[r].cells[c].innerHTML]
      } else {
        slovakTable = [...slovakTable, tableBody.rows[r].cells[c].getElementsByTagName('input')[0]?.value]
        positions[r].text = tableBody.rows[r].cells[c].getElementsByTagName('input')[0]?.value
      }
    }
  }
  console.log('New Positions', positions)
  return { englishTable, slovakTable, positions }

}


export function replaceCommaLine(data: string) {
  let dataToArray = data.split(',').map(item => item.trim());
  let withNewLines = dataToArray.join(",\n");
  console.log('WITH new Lines', withNewLines)
  withNewLines = withNewLines.slice(0, 1) + "\n" + withNewLines.slice(2)
  withNewLines += "\n"
  return withNewLines
}






