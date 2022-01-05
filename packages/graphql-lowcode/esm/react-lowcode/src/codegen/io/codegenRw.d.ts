import { CodeDir, CodeRW } from '../../io';
export declare class CodegenRw implements CodeRW, CodeDir {
    readDirectory(path: string, extensions?: readonly string[], exclude?: readonly string[], include?: readonly string[], depth?: number): Promise<string[] | undefined>;
    readFile(path: string, encoding?: string): Promise<string | undefined>;
    writeFile(path: string, data: string): Promise<void>;
}
