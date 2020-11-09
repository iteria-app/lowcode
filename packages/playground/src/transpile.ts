//@ts-ignore
// import * as esbuild from 'https://unpkg.com/esbuild-wasm@0.8.3/lib/browser';
//@ts-ignore
import { compile as svelteCompile } from 'https://unpkg.com/svelte@3.29.3/compiler.mjs';
import { CONTROLLED } from './controlled';
//import type { compile as svelteCompile } from 'https://unpkg.com/svelte@3.29.3/compiler.d.ts';

//@ts-ignore
const esbuildPromise = esbuild.startService({
  wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.3/esbuild.wasm',
  //worker: false
});

interface Transpiled {
  readonly code: string;
  readonly path: string;
  readonly warnings: [];
}

const scriptTs = new RegExp('(<script[^>]+typescript[^>]+>)'); //|(</script[^>]*>)
const scriptEnd = new RegExp('(</script[^>]*>)'); //|(</script[^>]*>)
export async function transpileSvelte(
  source: string,
  filename: string,
): Promise<Transpiled> {
  const matches = scriptTs.exec(source);
  if (matches?.length) {
    const endMatches = scriptEnd.exec(source);
    const ts = source.substring(
      matches.index + matches[1].length,
      endMatches?.index,
    );

    const transpiler = await esbuildPromise;
    const jsSource = await transpiler.transform(ts, { loader: 'ts' });
    if (jsSource.code.length < ts.length) {
      //TODO consider source map
      source = jsSource + ' '.repeat(source.length - jsSource.length);
    } else {
      source = jsSource;
    }
  }

  const svelteOptions = {
    dev: true,
    css: false,
    filename, //DOM element.__svelte_meta: {loc: char: 45, column: 13, file: "Nested.svelte", line: 1}
    sveltePath: 'svelte@3.29.4', //CONTROLLED + 'svelte', //parse package json version...
  };
  const compiled = svelteCompile(source, svelteOptions);
  let compiledCode = compiled.js.code;

  const path = filename.endsWith('.svelte')
    ? filename.substring(0, filename.length - '.svelte'.length)
    : filename;
  return {
    code: compiledCode,
    path,
    warnings: [
      /* TODO */
    ],
  };
}

export function transpileEsbuild(
  source: string,
  filename: string,
): Promise<Transpiled> {
  const dot = filename.lastIndexOf('.');
  const hasExtension = dot > 0 && dot < filename.length;
  const extenstion = hasExtension ? filename.substring(dot + 1) : 'ts';
  const path = hasExtension
    ? filename.substring(0, filename.length - extenstion.length - 1)
    : filename;
  return esbuildPromise.then((transpiler: any) => {
    return transpiler
      .transform(source, { loader: extenstion })
      .then((transpiled: any) => {
        return { code: transpiled.code, path };
      });
  });
}
