import {
  cloneElementInCode,
  deleteElementInCode,
  findElementInAST,
} from './codeHandlers';

import { removeBorderFrame } from '../border-frame/borderFrame';

const getDataFromCache = async (
  file: string,
): Promise<{ body?: string; cache?: Cache }> => {
  const cache = await caches.open('playground').catch((err) => {
    console.log(err);
    throw new Error('Unable to open a cache');
  });
  const cacheContent = await cache.match(file).catch((err) => {
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
  console.log('cloneElement', loc);
  const { body, cache } = await getDataFromCache(loc.file);
  if (!body || !cache) return;

  const clickedNode = findElementInAST(body, loc.char);
  if (!clickedNode) throw new Error('Element was not found in code');
  const charCount = clickedNode.end - clickedNode.start;

  const newCode = cloneElementInCode(body, loc.char, charCount);
  console.log(newCode, loc.file);
  if (newCode) {
    await cache.put(loc.file, new Response(newCode));
    removeBorderFrame();
  }
};

export const removeElement = async ({ loc }: any) => {
  const { body, cache } = await getDataFromCache(loc.file);
  if (!body || !cache) return;

  const clickedNode = findElementInAST(body, loc.char);
  if (!clickedNode) throw new Error('Element was not found in code');
  const charCount = clickedNode.end - clickedNode.start;

  const newCode = deleteElementInCode(body, loc.char, charCount);
  console.log(newCode);
  if (newCode) {
    await cache.put(loc.file, new Response(newCode));
    removeBorderFrame();
  }
};
