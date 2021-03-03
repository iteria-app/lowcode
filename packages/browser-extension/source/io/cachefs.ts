import { CodeRW } from '../react-lowcode/io/rw'
import { CodeDir } from '../react-lowcode/io/dir'
import { Noop } from './noop'

export class CacheFS implements CodeRW, CodeDir {
    files: Map<string, string>
    cachedIO: CodeRW & CodeDir
    constructor(cachedIO: CodeRW & CodeDir = new Noop(), files: Map<string, string> = new Map()) {
        this.files = files
        this.cachedIO = cachedIO
    }

    readFile(path: string): Promise<string | undefined> {
        const content = this.files.get(path)
        if (content !== undefined) {
            return Promise.resolve(content)
        }

        return this.cachedIO.readFile(path)
    }

    writeFile(path: string, content: string): Promise<void> {
        return this.cachedIO.writeFile(path, content).then(() => {
            this.files.set(path, content)
        })
    }

    readDirectory(path: string, /*extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number*/): Promise<string[] | undefined> {
        return this.cachedIO.readDirectory(path)
    }
}
