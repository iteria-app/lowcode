import { cloneElementInCode, deleteElementInCode } from './codeHandlers';

const getDataFromCache = async (
  file: string,
): Promise<{ body?: string; cache?: Cache }> => {
  try {
    const cache = await caches.open('playground');
    const cacheContent = await cache.match(`/controlled/${file}`);
    const body = await cacheContent?.text();
    return { body, cache };
  } catch (err) {
    console.log(err);
    return {};
  }
};

export const cloneElement = async ({ loc }: any) => {
  const { body, cache } = await getDataFromCache(loc.file);
  if (!body || !cache) return;

  if (body) {
    const newCode = cloneElementInCode(body || '', loc.line, loc.line);
    if (newCode) {
      await cache.put(`/controlled/${loc.file}`, new Response(newCode));
    }
  }
};

export const removeElement = async ({ loc }: any) => {
  const { body, cache } = await getDataFromCache(loc.file);
  if (!body || !cache) return;

  if (body) {
    const newCode = deleteElementInCode(body || '', loc.line, loc.line);
    if (newCode) {
      await cache.put(`/controlled/${loc.file}`, new Response(newCode));
    }
  }
};
