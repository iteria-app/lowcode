import fs from 'fs'
import pathResolver from 'path'
import { CodeRW } from '../../io'

export class CodegenRw implements CodeRW{
    readFile(path: string, encoding?: string): Promise<string | undefined> {
        return Promise.resolve(fs.readFileSync(pathResolver.resolve(path), encoding ?? 'utf-8'))
    }
    writeFile(path: string, data: string): Promise<void> {
        return Promise.resolve(fs.writeFileSync(path, data))
    }

}