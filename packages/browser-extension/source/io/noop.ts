import { CodeRW } from './rw'

export class Noop implements CodeRW {
    readFile(): Promise<string | undefined> {
        return Promise.resolve(undefined)
    }
    writeFile(): Promise<void> {
        return Promise.resolve()
    }
}
