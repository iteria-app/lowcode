import { SourceFile, factory, ScriptKind, ScriptTarget, createSourceFile } from "typescript"
import { ts } from "ts-morph";
import { Project } from "ts-morph"
import sk_SK from "../localization/sk_SK";


export function getValuesFromLocalizationASTJSON(astLocale: SourceFile | undefined) {
  let english: string[] = []
  let slovak: string[] = []
  let locales: string[] = []
  let positionsTable: any[] = []
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

export function createFinalFile(printer: any, finalAST: any) {
  const file = createSourceFile(finalAST.fileName, finalAST.text, ScriptTarget.ESNext, true, ScriptKind.JSON)
  try {
    console.log("FINAL AST", file)
    console.log("PRINTER", printer.printFile(file))
    const formated = ts.parseJsonText("skSK.ts", finalAST.text)
    formated.text = formated.text
    const fileFormated = createSourceFile(formated.fileName, formated.text, ScriptTarget.ESNext, true, ScriptKind.JSON)
    console.log("Formated", fileFormated)
    console.log("Formated printFile", printer.printFile(fileFormated))
    return printer.printFile(fileFormated)
  } catch (error) {
    console.log("Error", error)
  }
  return printer.printFile(file)
}

const project = new Project();

const localeSource = project.createSourceFile("skSK.ts", JSON.stringify(sk_SK))

export function transformSourceFile(positions: any[]) {
  localeSource.transform((traversal: any) => {
    const node = traversal.visitChildren();
    const found = positions.find((position: any) => position?.position == node.pos)
    if (found?.position == node.pos && ts.isStringLiteral(node)) {
      node.text = found.text
      return ts.factory.createStringLiteral(found.text)
    }
    return node
  })
  console.log("New Source", localeSource)
  localeSource.transform((traversal: any) => {
    const node = traversal.visitChildren();
    return node
  })
  //localeSource.addExportDeclaration({namedExports:'export default'})
  return localeSource
}



export function getLocales(locales: string[]) {
  let english: string[] = []
  let slovak: string[] = []

  locales.forEach((locale: string) => {
    if (locales.indexOf(locale) % 2 == 0) {
      english = [...english, locale]
    } else {
      slovak = [...slovak, locale]
    }
  })
  return {
    english,
    slovak
  }
}

export function createTable(english: string[], slovak: string[], panelWindow: Window) {
  const tableBody = panelWindow.document.getElementById('locale-tableBody')
  english.forEach((locale: any) => {
    const tr = panelWindow.document.createElement('tr')
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

export function saveTableValuesAndParseBack(tableBody: any, positions: any[]) {
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
  return { englishTable, slovakTable, positions }

}





