import { CodeRW } from './rw'
import { Noop } from './noop'

export class CacheFS implements CodeRW {
    files: Map<string, string>
    cachedRW: CodeRW
    constructor(cachedRW: CodeRW = new Noop(), files: Map<string, string> = new Map()) {
        this.files = files
        this.cachedRW = cachedRW
    }

    readFile(path: string): Promise<string | undefined> {
        const content = this.files.get(path)
        if (content !== undefined) {
            return Promise.resolve(content)
        }

        return this.cachedRW.readFile(path)
    }

    writeFile(path: string, content: string): Promise<void> {
        return this.cachedRW.writeFile(path, content).then(() => {
            this.files.set(path, content)
        })
    }
}
