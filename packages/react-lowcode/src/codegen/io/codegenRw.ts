import fs from 'fs'
import pathResolver from 'path'
import { CodeDir, CodeRW } from '../../io'

export class CodegenRw implements CodeRW, CodeDir{
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): Promise<string[] | undefined> {
        throw new Error('Method not implemented.')
    }
    readFile(path: string, encoding?: string): Promise<string | undefined> {
        const fileContent = fs.readFileSync(pathResolver.resolve(path), encoding ?? 'utf-8')
        return Promise.resolve(fileContent)
    }
    writeFile(path: string, data: string): Promise<void> {
        return Promise.resolve(fs.writeFileSync(path, data))
    }

}