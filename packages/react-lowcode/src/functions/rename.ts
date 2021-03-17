import { Project } from "ts-morph"

export const renameFunctionWithMorph = (
  project: Project,
  code: string,
  functionName: string,
  newFunctionName: string
) => {
  const newProject = project.createSourceFile(`${newFunctionName}.tsx`, code)
  const mainFunction = newProject.getFunction(functionName)
  mainFunction?.rename(newFunctionName)
  return newProject
}
