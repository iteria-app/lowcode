import { findPath } from '../src/path';
import { Vertex } from '../src/vertex';

test('test not found', () => {
  const found = findPath(new Vertex('div', 'element', [], [], []), [])
  expect(found).toBe(null);
});
