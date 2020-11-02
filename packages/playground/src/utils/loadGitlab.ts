export async function loadHDTS() {
    let gitlabFile: string = '';
    //const fileName = "App.svelte"
    //const endpoint = `https://gitlab.com/api/v4/projects/18967974/repository/files/src%2F${fileName}?ref=gitlabAPI-lowcode`
    const url = 'https://gitlab.com/api/v4/projects/18967974/repository/files/src%2FApp.svelte?ref=gitlabAPI-lowcode'

    await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            cache: 'no-store',
            'PRIVATE-TOKEN': 'Lpdpwxi9BsHkd6jPpVsV'
            //Authorization: "Bearer token" 
            //...(headers || window.endpointHeaders)
        }
    })
        .then(res => {
            console.log("res", res)
            res.json().then(data => { console.log("GITHUBREPOSNE", data); let resData = atob(data.content); console.log(resData); gitlabFile = resData })
            console.log("RESPONSE", gitlabFile)
        })
    return gitlabFile
}