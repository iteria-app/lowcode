export const writeFile = async (filePath: string, code: string) => {
  try {
    const res = await fetch(`http://localhost:7500/files/${filePath}`, {
      method: "PUT",
      headers: {
        "Content-Type": "text/plain",
      },
      body: code,
    })
    console.log(await res.text())
  } catch (err) {
    throw new Error(err)
  }
}
export const readFile = async (filePath: string) => {
  try {
    const res = await fetch(`http://localhost:7500/files/${filePath}`)
    const code = await res.text()
    return code
  } catch (err) {
    throw new Error(err)
  }
}

export const readDir = async (dirPath: string, extensions: string[] = []) => {
  try {
    const queryString = [extensions.map((ext) => 'ext=' + encodeURI(ext)), 'depth=10'].join('&')
    const res = await fetch(`http://localhost:7500/dir/${dirPath}?${queryString}`)//extensions
    const dir = await res.json()
    return dir
  } catch (err) {
    throw new Error(err)
  }
}
