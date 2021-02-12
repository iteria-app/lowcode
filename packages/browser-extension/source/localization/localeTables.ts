import ts from 'typescript'
import { Message, MultiMessage } from './localizationInterfaces'


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


export function createMultiTableWithMessages(messages: MultiMessage[], panelWindow: Window) {
    const tableBody = panelWindow.document.getElementById('multi-tableBody')
    console.log("Creating table with values", messages)
    messages.forEach((message: MultiMessage) => {
        const tr = panelWindow.document.createElement('tr')
        tableBody?.appendChild(tr)
        const skInput = panelWindow.document.createElement('input')
        const enInput = panelWindow.document.createElement('input')
        const messageId = panelWindow.document.createElement('td')
        const skLocale = panelWindow.document.createElement('td')
        const enLocale = panelWindow.document.createElement('td')
        messageId.innerText = message.id
        skInput.value = message.skSK.value
        skLocale.appendChild(skInput)
        enInput.value = message.enEN.value
        enLocale.appendChild(enInput)
        tr.append(messageId)
        tr.append(skLocale)
        tr.append(enLocale)
    })
}

