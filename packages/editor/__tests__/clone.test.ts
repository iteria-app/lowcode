import { Vertex } from '../src/vertex';
import { returnElement } from '../src/clonning'

let testVertex = new Vertex('div', 'element', [
    new Vertex('table', 'element', [], [
        new Vertex('div', 'element', [], [], [])
    ], [])
], [], []);


test('Test', () => {
    returnElement(testVertex);
})



