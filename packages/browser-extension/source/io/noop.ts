import { CodeRW } from '../react-lowcode/io/rw'
import { CodeDir } from '../react-lowcode/io/dir'

export class Noop implements CodeRW, CodeDir {
    readFile(): Promise<string | undefined> {
        return Promise.resolve(undefined)
    }
    writeFile(): Promise<void> {
        return Promise.resolve()
    }

    readDirectory() {
        return Promise.resolve(undefined)
    }
}
