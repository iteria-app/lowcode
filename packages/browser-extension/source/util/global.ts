import { FetchFS, CacheFS } from '../io'
import { CodeRW } from '../io/rw'

// IMPORT THIS ONLY IN InjectScript/index.ts and DevToolScript.index.ts
export const io = new CacheFS(new FetchFS())

export const ioRefreshEditor = withWriteListener(io, (path: string/*, content: string*/) => {
    console.log('written', path)
})

function withWriteListener(rw: CodeRW, listener: (path: string, content: string) => void): CodeRW {
    return { ... rw, writeFile: (path: string, content: string) => {
        return rw.writeFile(path, content).then(() => {
            listener(path, content)
        })
    }}
}
