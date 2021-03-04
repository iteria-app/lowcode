import fs from "fs";
import path from "path";

export function getAllFiles(dirPath: string, extensions: string[], depth = 1) {
  console.log("getAllFiles", dirPath, depth);
  if (depth == 0) {
    return [];
  }

  const dirFiles = fs.readdirSync(dirPath);
  let ret: string[] = [];
  for (let file of dirFiles) {
    const filePath = path.join(dirPath, "/", file);
    if (fs.statSync(filePath).isDirectory()) {
      ret = [...ret, ...getAllFiles(filePath, extensions, depth - 1)];
    } else if (checkExtension(file, extensions)) {
      ret = [...ret, filePath];
    }
  }

  return ret;
}

export function checkExtension(path: string, extensions: string[]) {
  if (extensions.length > 0) {
    for (let ext of extensions) {
      if (path.endsWith(ext)) {
        return true;
      }
    }
    return false;
  }

  return true;
}
