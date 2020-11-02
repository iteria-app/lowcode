export type Transpiler = ((content: string) => string)

const TRANSPILER_EXTENSIONS = [ '.ts' as KnownExtension, '.js' as KnownExtension, '.jsx' as KnownExtension, '.tsx' as KnownExtension, '.svelte' as KnownExtension ]
const KNOWN_EXTENSIONS = ['.js' as KnownExtension, ...TRANSPILER_EXTENSIONS]
export type KnownExtension = ".ts" | ".jsx" | ".tsx" | ".svelte"

export interface FileInfo {
    readonly extension: KnownExtension | null
    readonly path: string
}

export type ImportPath = string

export function importPaths(paths: string[], extensions: KnownExtension[]): Map<ImportPath, FileInfo> {
  const ret = new Map<ImportPath, FileInfo>()
  for (const path of paths) {
    const extension = knownExtension(path, extensions)
    ret.set(path, { path, extension })
    if (extension) {
      const importPath = path.substring(0, path.length - extension.length)
      ret.set(importPath, { path, extension })
    }
  }

  return ret
}

export function knownExtension(path: string, extensions: KnownExtension[]): KnownExtension | null {
  for (const extension of extensions) {
    if (path.endsWith(extension)) {
      return extension
    }
  }

  return null//unknown
}
