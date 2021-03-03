
import { CodeRW } from '../react-lowcode/io/rw'
import { CodeDir } from '../react-lowcode/io/dir'
import { fetchLocalCode }  from '../react-lowcode/devtools/fetchLocalCode'

export class FetchFS implements CodeRW, CodeDir {
    endpoint: string
    
    constructor(endpoint: string) {
        this.endpoint = endpoint
    }

    async readFile(path: string): Promise<string | undefined> {
        if (path.startsWith("file://")) {
           const localRet = await fetchLocalCode(path)
           if (localRet.status >= 200 && localRet.status < 300) {
               return Promise.resolve(localRet.body)
           }
        }

        const res = await fetch(`${this.endpoint}/files/${path}`)
        const code = await res.text()
        return code
    }

    async writeFile(path: string, content: string): Promise<void> {
        await fetch(`${this.endpoint}/files/${path}`, {
          method: "PUT",
          headers: {
            "Content-Type": "text/plain",
          },
          body: content,
        })
    }

    async readDirectory(path: string, extensions: readonly string[] = [], /*exclude?: readonly string[], include?: readonly string[], depth?: number*/): Promise<string[] | undefined> {
        const queryString = [extensions.map((ext) => 'ext=' + encodeURI(ext)), 'depth=10'].join('&')
        const res = await fetch(`${this.endpoint}/dir/${path}?${queryString}`)//extensions
        const dir = await res.json()
        return dir
    }

}
