export function guessSourceDirFromFileName(inspectedFileName?: string) {
  if (!inspectedFileName?.length) {
    return undefined
  }
  const src = '/src/'
  const srcChar = inspectedFileName?.indexOf(src)
  if (srcChar > 0) {
    return inspectedFileName.substring(0, srcChar + src.length)
  }
 
  const srcWindows = '\\src\\'
  const srcCharWindows = inspectedFileName?.indexOf(srcWindows)
  if (srcCharWindows > 0) {
    return inspectedFileName.substring(0, srcCharWindows + srcWindows.length)
  }
}
