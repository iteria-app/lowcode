export function queryHookName(queryName: string) {
  const hookName = `use${queryName.charAt(0).toUpperCase() + queryName.slice(1)}Query`

  return hookName
}

const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.slice(1)
}

export function upperLetterInWord(queryName: string) {
  let arr = queryName.split('_')
  arr = arr.map((item) => capitalize(item))
  return arr.join("_")
}