import { cdnImports } from '../cdn';
import { transpileEsbuild } from '../transpile';
import { CONTROLLED, DEPENDENCIES } from '../constants';
import { prefix, newJavaScriptResponse } from '../index';
import { stripExtension } from './codeHandlers';

export const fetchProjectFromGitHub = async () => {
  const accessToken = prompt('Enter your GitHub access token');
  const repoUrl = `https://api.github.com/repos/devias-io/react-material-dashboard/git/trees/23844d3d7a8f48ca47406e6e44211a60cc6ef2a5?recursive=1?access_token=${accessToken}`;
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
        // if (path.endsWith('js')) {
        //   const jsPath = prefix(
        //     CONTROLLED,
        //     prefix('/', path.substring(0, path.length - '.js'.length)),
        //   );
        //   const sourceCdn = await cdnImports(fileContent);
        //   cache.put(jsPath, newJavaScriptResponse(sourceCdn));
        // } else
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
              newJavaScriptResponse(sourceCdn.source),
            );
          }
        } else {
          if (fileContent) {
            cache.put(path, newJavaScriptResponse(fileContent));
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
      cache.put(key, newJavaScriptResponse(fixedSource));
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
  const dependenciesUrl = `https://api.github.com/repos/mecirmartin/web_modules/git/trees/7ffe03620edcd50246fe9053fda6435b0702f5fb?recursive=1?access_token=${accessToken}`;
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
          const code = fixDependencyImports(fileContent);
          cache.put(jsPath, newJavaScriptResponse(code));
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

const fixDependencyImports = (source: string) => {
  const importMatches = source.match(
    /import[^a-zA-Z0-9][^"']*["'][^\.][^"']*["']/gm,
  );

  for (let match of importMatches || []) {
    const dependencyFirstQuote = match.lastIndexOf(
      match[match.length - 1],
      match.length - 2,
    );
    const dependencyPath = match.substring(
      dependencyFirstQuote + 1,
      match.length - 1,
    );
    const newDependencyPath = stripExtension(
      dependencyPath.replace('/src/', DEPENDENCIES),
    );
    source = source.replaceAll(dependencyPath, newDependencyPath);
  }
  return source;
};
