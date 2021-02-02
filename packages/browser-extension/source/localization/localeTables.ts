import { SourceFile } from "ts-morph"
import ts from 'typescript'
import { factory } from "typescript"
import { astFindSource, SourceLineCol } from "../tsx/ast"
import { LocaleWithPosition } from "./localizationInterfaces"
import sk_SK from "./sk_SK"

export function createTable(english: string[], slovak: string[], panelWindow: Window) {
    const tableBody = panelWindow.document.getElementById('locale-tableBody')
    english.forEach((locale: string) => {
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

export function addNewRow(tableBody: any, indexOfLastRow: number, panelWindow: Window, source: ts.SourceFile) {
    const inputForEn = panelWindow.document.createElement('input')
    const inputForSk = panelWindow.document.createElement('input')
    const row = tableBody.insertRow(indexOfLastRow + 1)
    const cellForEn = row.insertCell(0)
    const cellForSk = row.insertCell(1)
    inputForEn.value = 'New'
    inputForSk.value = 'Novy'
    cellForEn.appendChild(inputForEn)
    cellForSk.appendChild(inputForSk)
    source.forEachChild((child) => {
        console.log("Child", child)
    })

}

// export function findLiteral(sourceCode: string,) {

// }



interface Position {
    start: number;
    end: number;
}

// export const replaceText = (originalCode: string, postion: Position) => {


// }




export function addToPositions(positions: Position[], tableBody: any) {
    const newPosition = tableBody.rows[positions.length].cells[1].getElementsByTagName('input')[0]?.value;
    //@ts-ignore
    positions = [...positions, { text: newPosition, pos: 125, end: newPosition.length }]
    return positions
}