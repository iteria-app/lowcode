import fs from 'fs';
import pathResolver from 'path';
export class CodegenRw {
    readDirectory(path, extensions, exclude, include, depth) {
        throw new Error('Method not implemented.');
    }
    readFile(path, encoding) {
        const fileContent = fs.readFileSync(pathResolver.resolve(path), encoding !== null && encoding !== void 0 ? encoding : 'utf-8');
        return Promise.resolve(fileContent);
    }
    writeFile(path, data) {
        return Promise.resolve(fs.writeFileSync(path, data));
    }
}
