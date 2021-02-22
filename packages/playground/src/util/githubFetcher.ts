import { cdnImports } from '../cdn';
import { transpileEsbuild } from '../transpile';
import { CONTENT_TYPE_JS, CONTROLLED, DEPENDENCIES } from '../constants';
import { prefix } from '../index';
import { newCustomResponse } from './cacheHandlers';

export const fetchProjectFromGitHub = async () => {
  const accessToken = prompt('Enter your GitHub access token');
  const repoUrl = `https://api.github.com/repos/Tommertom/svelte-ionic-app/git/trees/master?recursive=1?access_token=${accessToken}`
  //const repoUrl = `https://api.github.com/repos/devias-io/react-material-dashboard/git/trees/23844d3d7a8f48ca47406e6e44211a60cc6ef2a5?recursive=1?access_token=${accessToken}`;
  // const repoUrl = `https://api.github.com/repos/nas5w/react-typescript-todo-app/git/trees/b9323b8ddaa2f29c73ab3a7f054dcbeb28ca6ce7?recursive=1?access_token=${accessToken}`;
  // const repoUrl = `https://api.github.com/repos/ionic-team/ionic-react-conference-app/git/trees/93cd376cc3f4a2867dfd2c748f56acaaf8155943?recursive=1?access_token=${accessToken}`;

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
        if (
          path.endsWith('.js') ||
          path.endsWith('.ts') ||
          path.endsWith('.jsx') ||
          path.endsWith('.tsx')
        ) {
          const transpiled = await transpileEsbuild(fileContent, path);
          if (transpiled?.warnings?.length > 0) {
            console.warn('transpilation', transpiled.warnings);
          }

          if (transpiled?.code?.length > 0) {
            const sourceCdn = await cdnImports(transpiled.code, path);

            cache.put(
              prefix(CONTROLLED, prefix('/', transpiled.path)),
              newCustomResponse(sourceCdn.source, CONTENT_TYPE_JS),
            );
          }
        } else {
          if (fileContent) {
            cache.put(path, newCustomResponse(fileContent, CONTENT_TYPE_JS));
          }
        }
      }
    }
    fixRelativePaths();
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const fixRelativePaths = async () => {
  const cache = await caches.open('playground');
  const keys = await cache.keys();

  for (const key of keys) {
    const res = await cache.match(key);
    const source = await res?.text();
    if (source) {
      const fixedSource = await relativePaths(source);
      cache.put(key, newCustomResponse(fixedSource, CONTENT_TYPE_JS));
    }
  }
};

export const relativePaths = async (source: string) => {
  const cache = await caches.open('playground');
  const importMatches = source.match(
    /import[^a-zA-Z0-9][^"']*["'][^"']*["']/gm,
  );
  const secondRegex = /import[^a-zA-Z0-9][^"']*["'][^\.][^"']*["']/gm;
  for (let match of importMatches || []) {
    const dependencyFirstQuote = match.lastIndexOf(
      match[match.length - 1],
      match.length - 2,
    );
    const dependency = match.substring(
      dependencyFirstQuote + 1,
      match.length - 1,
    );
    // Check if found dependency is stored in dependencies cache

    const path = dependency.replaceAll('https://cdn.skypack.dev', '');
    const res = await cache.match(path + '/index');
    if (res) {
      source = source.replaceAll(path, path + '/index');
    }
  }

  return source;
};

export const fetchDependenciesFromGitHub = async () => {
  const accessToken = prompt('Enter your GitHub access token');
  const dependenciesUrl = `https://api.github.com/repos/mecirmartin/web_modules/git/trees/09837517aa12a0852ad54bcd7371651ce956a845?recursive=1?access_token=${accessToken}`;
  if (!accessToken) return;

  try {
    const data = await fetch(dependenciesUrl);
    const { tree } = await data.json();
    const cache = await caches.open('web_modules');
    for (const { url, path } of tree) {
      const data = await fetch(`${url}?access_token=${accessToken}`);

      const { content } = await data.json();
      if (content) {
        const fileContent = atob(content);
        if (path.endsWith('js')) {
          const jsPath = prefix(
            '/web_modules/',
            path.substring(0, path.length - '.js'.length),
          );

          cache.put(jsPath, newCustomResponse(fileContent, CONTENT_TYPE_JS));
        } else {
          if (fileContent) {
            cache.put(path, newCustomResponse(fileContent, CONTENT_TYPE_JS));
          }
        }
      }
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
