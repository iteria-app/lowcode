
import { CodeRW } from './rw'
import { CodeDir } from './dir'
import { fetchLocalCode }  from '../browser/fetchLocalCode'
import { readFile, writeFile, readDir } from "../util/fetch"

export class FetchFS implements CodeRW, CodeDir  {
    async readFile(path: string): Promise<string | undefined> {
        if (path.startsWith("file://")) {
           const localRet = await fetchLocalCode(path)
           if (localRet.status >= 200 && localRet.status < 300) {
               return Promise.resolve(localRet.body)
           }
        }

        return readFile(path)
    }

    writeFile(path: string, content: string): Promise<void> {
        return writeFile(path, content)
    }

    readDirectory(path: string, /*extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number*/): Promise<string[] | undefined> {
        return readDir(path)
    }

}
