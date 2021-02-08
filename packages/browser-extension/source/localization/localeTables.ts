import ts from 'typescript'
import { Message } from './localizationInterfaces'


export function createTableWithMessages(messages: Message[], panelWindow: Window) {
    const tableBody = panelWindow.document.getElementById('locale-tableBody')
    messages.forEach((message: Message) => {
        const tr = panelWindow.document.createElement('tr')
        tableBody?.appendChild(tr)
        const input = panelWindow.document.createElement('input')
        const messageId = panelWindow.document.createElement('td')
        const locale = panelWindow.document.createElement('td')
        messageId.innerText = message.id
        input.value = message.value
        locale.appendChild(input)
        tr.append(messageId)
        tr.append(locale)
    })
}

// export function addNewRow(tableBody: HTMLTableElement, indexOfLastRow: number, panelWindow: Window, source: ts.SourceFile) {
//     const inputForEn = panelWindow.document.createElement('input')
//     const inputForSk = panelWindow.document.createElement('input')
//     const row = tableBody.insertRow(indexOfLastRow + 1)
//     const cellForEn = row.insertCell(0)
//     const cellForSk = row.insertCell(1)
//     inputForEn.value = 'New'
//     inputForSk.value = 'Novy'
//     cellForEn.appendChild(inputForEn)
//     cellForSk.appendChild(inputForSk)
//     source.forEachChild((child) => {
//         console.log("Child", child)
//     })

// }

// export function addToPositions(positions: Message[], tableBody: any) {
//     const newPosition = tableBody.rows[positions.length].cells[1].getElementsByTagName('input')[0]?.value;
//     //@ts-ignore
//     positions = [...positions, { id: newPosition, start: 125, end: newPosition.length }]
//     return positions
// }