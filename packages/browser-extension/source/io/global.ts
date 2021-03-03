import { FetchFS, CacheFS } from '.'
import { CodeRW } from '../react-lowcode/io/rw'

// IMPORT THIS ONLY IN InjectScript/index.ts and DevToolScript.index.ts
export const io = new CacheFS(new FetchFS('http://localhost:7500'))

export const ioRefreshEditor = withWriteListener(io, (path: string/*, content: string*/) => {
    console.log('written', path)
})

function withWriteListener(rw: CodeRW, listener: (path: string, content: string) => void): CodeRW {
    return {
        readFile(path: string, encoding?: string): Promise<string | undefined> {
            return rw.readFile(path, encoding)
        },
        writeFile(path: string, content: string) {
            return rw.writeFile(path, content).then(() => {
                listener(path, content)
            })
        }
    }
}
