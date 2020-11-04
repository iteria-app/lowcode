import {
  cloneElementInCode,
  deleteElementInCode,
  findElementInAST,
} from './codeHandlers';

const getDataFromCache = async (
  file: string,
  char: number,
): Promise<{ body?: string; cache?: Cache; charCount?: number }> => {
  try {
    const cache = await caches.open('playground');
    const cacheContent = await cache.match(`/controlled/${file}`);
    const body = await cacheContent?.text();

    console.log(char);
    const clickedNode = findElementInAST(body || '', char);
    if (!clickedNode) throw new Error('Element was not found in code');

    const charCount = clickedNode.end - clickedNode.start;
    return { body, cache, charCount };
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const cloneElement = async ({ loc }: any) => {
  const { body, cache, charCount } = await getDataFromCache(loc.file, loc.char);
  if (!body || !cache || !charCount) return;

  const newCode = cloneElementInCode(body, loc.char, charCount);
  console.log(newCode);
  if (newCode) {
    await cache.put(`/controlled/${loc.file}`, new Response(newCode));
  }
};

export const removeElement = async ({ loc }: any) => {
  const { body, cache, charCount } = await getDataFromCache(loc.file, loc.char);
  if (!body || !cache || !charCount) return;

  const newCode = deleteElementInCode(body, loc.char, charCount);
  console.log(newCode);
  if (newCode) {
    await cache.put(`/controlled/${loc.file}`, new Response(newCode));
  }
};
