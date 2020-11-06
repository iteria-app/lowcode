const esbuildPromise = esbuild.startService({
    wasmURL: 'https://unpkg.com/esbuild-wasm@0.8.3/esbuild.wasm',
    //worker: false
  })
  
export function transpile(source: string) {
  return esbuildPromise.then((transpiler: any) => {
    console.log('transpile', transpiler)
    return transpiler.transform(source, { loader: 'ts' })
  })
}
