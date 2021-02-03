import ts from 'typescript'
import { Message } from './localizationInterfaces'

export function createTable(english: string[], slovak: string[], panelWindow: Window) {
    const tableBody = panelWindow.document.getElementById('locale-tableBody')
    english.forEach((locale: string) => {
        const tr = panelWindow.document.createElement('tr')
        tableBody?.appendChild(tr)
        const td = panelWindow.document.createElement('td')
        td.classList.add('cell')
        td.innerText = locale
        tr.appendChild(td)
    })
    tableBody?.querySelectorAll('tr').forEach((tr, index) => {
        const input = panelWindow.document.createElement('input')
        const td = panelWindow.document.createElement('td')
        td.classList.add('cell')
        input.value = slovak[index]
        td.appendChild(input)
        tr.append(td);
    })

}

export function addNewRow(tableBody: HTMLTableElement, indexOfLastRow: number, panelWindow: Window, source: ts.SourceFile) {
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

export function addToPositions(positions: Message[], tableBody: any) {
    const newPosition = tableBody.rows[positions.length].cells[1].getElementsByTagName('input')[0]?.value;
    //@ts-ignore
    positions = [...positions, { id: newPosition, start: 125, end: newPosition.length }]
    return positions
}