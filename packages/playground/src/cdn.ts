import { Resolver } from '@velcro/resolver';
import { CdnStrategy } from '@velcro/strategy-cdn';
import { GraphBuilder } from '@velcro/bundler';
import { sucrasePlugin } from '@velcro/plugin-sucrase';
import { cssPlugin } from '@velcro/plugin-css';
import { parse } from 'acorn';
import { DEPENDENCIES } from './constants';
//import { transform } from 'cjs-es'
//@ts-ignore
import cjsEs from 'https://cdn.skypack.dev/-/cjs-es@v0.8.2-ceQTG87fHFEzTzEBy8F3/dist=es2020/cjs-es.js';

export async function cdnImports(source: string): Promise<string> {
  const cache = await caches.open('dependencies');
  const importMatches = source.match(
    /import[^a-zA-Z0-9][^"']*["'][^\.][^"']*["']/gm,
  );
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
    const dependencyPath = DEPENDENCIES + dependency;
    const response = await cache.match(dependencyPath);

    if (response?.ok) {
      const cacheImport =
        match.substring(0, dependencyFirstQuote) + `"${dependencyPath}"`;
      source = source.replaceAll(match, cacheImport);
      continue;
    }

    if (dependency?.length > 0 && !dependency.startsWith('https://')) {
      if (dependency.startsWith('@material/mwc-')) {
        source = source.replaceAll(match, '');
        continue;
      }
      let dependencyCdn = `https://cdn.skypack.dev/${dependency}`;
      if (dependencyCdn && dependencyCdn?.length > 0) {
        const cdnImport =
          match.substring(0, dependencyFirstQuote) + `"${dependencyCdn}"`;
        // console.log(match, ' => ', cdnImport);
        source = source.replaceAll(match, cdnImport);
        continue;
/*
import dependencyFetcher 
from './util/dependencyFetcher';
import { parse } from 'acorn'
//import { transform } from 'cjs-es'
import cjsEs from 'https://cdn.skypack.dev/-/cjs-es@v0.8.2-ceQTG87fHFEzTzEBy8F3/dist=es2020/cjs-es.js'

export async function cdnImports(source: string): Promise<string> {
  const importMatches = source.match(/import[^a-zA-Z0-9][^"']*["'][^\.][^"']*["']/gm);
  for(let match of importMatches || []) {
    const dependencyFirstQuote = match.lastIndexOf(match[match.length - 1], match.length - 2)
    const dependency = match.substring(dependencyFirstQuote + 1, match.length - 1)
    if (dependency?.length > 0 && !dependency.startsWith('https://')) {
      if (dependency.startsWith('@material/mwc-')) {
        source = source.replaceAll(match, '');
        continue
      }
      let dependencyCdn = await dependencyFetcher(dependency)
      if (dependencyCdn && dependencyCdn?.length > 0) {
        const cdnImport = match.substring(0, dependencyFirstQuote) + `"${dependencyCdn}"`
        console.log(match, ' => ', cdnImport);
        source = source.replaceAll(match, cdnImport);
        continue
*/
      }
    }
    console.log(match, 'NO REPLACEMENT');
  }

  return source;
}

export async function dependency(pkgName: string) {
  const readUrl = (href: string) =>
    fetch(href).then((res) => res.arrayBuffer());
  const unpkgStrategy = CdnStrategy.forUnpkg(readUrl);
  //const jsdelivrStrategy = CdnStrategy.forJsDelivr(readUrl);
  //const memoryStrategy = new MemoryStrategy({});
  //const compoundStrategy = new CompoundStrategy({ strategies: [unpkgStrategy, jsdelivrStrategy, memoryStrategy] });
  const resolver = new Resolver(unpkgStrategy, {
    extensions: ['.js' /*, '.jsx', '.json', '.ts', '.tsx', '.mjs', '.cjs'*/],
    packageMain: ['browser', 'main'],
  });
  const graphBuilder = new GraphBuilder({
    resolver,
    nodeEnv: 'development',
    plugins: [
      cssPlugin(),
      sucrasePlugin({ transforms: ['imports' /*, 'jsx', 'typescript'*/] }),
    ],
  });
  const cdnUri = 'https://unpkg.com/' + pkgName;
  const build = graphBuilder.build([cdnUri]);
  //console.log('build', build)

  const graph = await build.done;
  const [chunk] = graph.splitChunks();
  //console.log('build chunk', chunk)
  const output = chunk.buildForStaticRuntime({
    injectRuntime: true, //buildId === 0,
  });
  //console.log('build output', output)
  const codeWithStart = `${output.code}\n\n${output.entrypoints
    .map(
      (entrypoint) =>
        `Velcro.runtime.require(${JSON.stringify(entrypoint.toString())});`,
    )
    .join('\n')}\n`;

  const runtimeCode = cjsEs.transform({ code: codeWithStart, parse });
  // TODO especially for 'graphql', 'graphql-tag', cache

  //const runtimeCode = `${codeWithStart}\n//# sourceMappingURL=${output.sourceMapDataUri}`;
  //console.log('build runtimeCode', runtimeCode)

  return { code: runtimeCode, path: cdnUri };
}
