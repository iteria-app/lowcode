import { cdnImports } from '../cdn';
import { transpileEsbuild } from '../transpile';
import { CONTROLLED } from '../controlled';
import { prefix, newJavaScriptResponse } from '../index';

export default async () => {
  const accessToken = prompt('Enter your GitHub access token');
  const repoUrl = `https://api.github.com/repos/nas5w/react-typescript-todo-app/git/trees/b9323b8ddaa2f29c73ab3a7f054dcbeb28ca6ce7?recursive=1?access_token=${accessToken}`;

  if (!accessToken) return;
  try {
    const data = await fetch(repoUrl);
    const { tree } = await data.json();
    const cache = await caches.open('playground');
    for (const { url, path } of tree) {
      const data = await fetch(`${url}?access_token=${accessToken}`);

      const { content } = await data.json();
      if (content) {
        const fileContent = atob(content);
        if (path.endsWith('js')) {
          const jsPath = prefix(
            CONTROLLED,
            prefix('/', path.substring(0, path.length - '.js'.length)),
          );
          const sourceCdn = await cdnImports(fileContent);
          cache.put(jsPath, newJavaScriptResponse(sourceCdn));
        } else if (
          path.endsWith('.ts') ||
          path.endsWith('.jsx') ||
          path.endsWith('.tsx')
        ) {
          const transpiled = await transpileEsbuild(fileContent, path); //TODO source map in response
          if (transpiled?.warnings?.length > 0) {
            console.warn('transpilation', transpiled.warnings);
          }

          if (transpiled?.code?.length > 0) {
            const sourceCdn = await cdnImports(transpiled.code);
            cache.put(
              prefix(CONTROLLED, prefix('/', transpiled.path)),
              newJavaScriptResponse(sourceCdn),
            );
          }
        } else {
          if (fileContent) {
            cache.put(path, new Response(fileContent));
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
