import ts from 'typescript'
import { Message, MultiMessage } from './localizationInterfaces'


export function createTableWithMessages(messages: Message[], document: HTMLDocument) {
    const tableBody = document.getElementById('locale-tableBody')
    messages.forEach((message: Message) => {
        const tr = document.createElement('tr')
        tableBody?.appendChild(tr)
        const input = document.createElement('input')
        const messageId = document.createElement('td')
        const locale = document.createElement('td')
        messageId.innerText = message.id
        input.value = message.value
        locale.appendChild(input)
        tr.append(messageId)
        tr.append(locale)
    })
}


export function createMultiTableWithMessages(messages: MultiMessage[], document: HTMLDocument) {
    const tableBody = document.getElementById('multi-tableBody')
    console.log("Creating table with values", messages)
    messages.forEach((message: MultiMessage) => {
        const tr = document.createElement('tr')
        tableBody?.appendChild(tr)
        const skInput = document.createElement('input')
        const enInput = document.createElement('input')
        const messageId = document.createElement('td')
        const skLocale = document.createElement('td')
        const enLocale = document.createElement('td')
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


export function createDynamicTable(allMessages = [], document: HTMLDocument) {
    const tableBody = document.getElementById('dynamic-tableBody')
    console.log("Creating table with values", allMessages)
    allMessages.forEach((message: any) => {
        console.log("Messages", message)
        const tr = document.createElement('tr')
        tableBody?.appendChild(tr)
        const messageId = document.createElement('td')
        messageId.innerText = message.id
        tr.append(messageId)
        message.messages.forEach((localeMessage: any) => {
            const input = document.createElement('input')
            const cell = document.createElement('td')
            input.value = localeMessage.value
            cell.appendChild(input)
            tr.appendChild(cell)
        })
    })
}

