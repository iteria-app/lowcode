export async function loadFile(url: string, privateToken: string) {
    let gitlabFile: string = '';
    return await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            cache: 'no-store',
            'PRIVATE-TOKEN': privateToken
            //Authorization: "Bearer token" 
            //...(headers || window.endpointHeaders)
        }
    })
        .then(res => {
            console.log("res", res)
            const result = res.json().then(data => {
                let resData = atob(data.content); console.log(resData);
                return resData
            })

            console.log("RESPONSE", gitlabFile)
            return result
        })
}