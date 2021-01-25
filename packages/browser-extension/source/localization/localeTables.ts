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