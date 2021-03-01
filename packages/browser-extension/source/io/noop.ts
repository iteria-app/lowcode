import { CodeRW } from './rw'
import { CodeDir } from './dir'

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
