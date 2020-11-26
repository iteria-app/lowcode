import {
  cloneElementInCode,
  deleteElementInCode,
  findElementInAST,
  stripExtension,
} from './codeHandlers';
import { removeBorderFrame } from '../border-frame/borderFrame';
import { CONTENT_TYPE_JS } from '../constants';

export const newCustomResponse = (content: string, type: string) => {
  const headers = new Headers();
  headers.append('Content-Type', type);
  const init = { status: 200, statusText: 'OK', headers };
  return new Response(content, init);
};

const getDataFromCache = async (
  path: string,
): Promise<{ body?: string; cache?: Cache }> => {
  const cache = await caches.open('copy_cache').catch((err) => {
    console.log(err);
    throw new Error('Unable to open a cache');
  });
  const cacheContent = await cache.match(path).catch((err) => {
    console.log(err);
    throw new Error('Requested code was not found in cache');
  });
  const body = await cacheContent?.text().catch((err) => {
    console.log(err);
    throw new Error('Unable to transform CacheContent to text');
  });
  return { body, cache };
};

export const cloneElement = async ({ loc }: any) => {
  const pathWithoutExtension = stripExtension(loc.file);
  const { body, cache } = await getDataFromCache(pathWithoutExtension);
  if (!body || !cache) return;

  const clickedNode = findElementInAST(body, loc.char);
  console.log('toto je clickedNode', clickedNode);
  if (!clickedNode) throw new Error('Element was not found in code');
  const charCount = clickedNode.end - clickedNode.start;

  const newCode = cloneElementInCode(body, loc.char, charCount);
  if (newCode) {
    await cache.put(
      pathWithoutExtension,
      newCustomResponse(newCode, CONTENT_TYPE_JS),
    );
    removeBorderFrame();
    return newCode;
  }
};

export const removeElement = async ({ loc }: any) => {
  const pathWithoutExtension = stripExtension(loc.file);
  const { body, cache } = await getDataFromCache(pathWithoutExtension);
  if (!body || !cache) return;

  const clickedNode = findElementInAST(body, loc.char);
  if (!clickedNode) throw new Error('Element was not found in code');
  const charCount = clickedNode.end - clickedNode.start;

  const newCode = deleteElementInCode(body, loc.char, charCount);
  if (newCode) {
    await cache.put(
      pathWithoutExtension,
      newCustomResponse(newCode, CONTENT_TYPE_JS),
    );
    removeBorderFrame();
    return newCode;
  }
};
