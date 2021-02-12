import { Project, SourceFile, SyntaxKind } from "ts-morph"

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

// TODO This function has to be more flexible and it has to account for
// usecase in which function keyword is used in component declaration
export const addPathButtonWithMorph = (
  file: SourceFile,
  newPageName: string
) => {
  const jsxElement = file
    .getVariableDeclarationOrThrow("IonicApp")
    .getFirstChildByKindOrThrow(SyntaxKind.ArrowFunction)
    .getStatementByKindOrThrow(SyntaxKind.ReturnStatement)
    .getFirstChildByKindOrThrow(SyntaxKind.ParenthesizedExpression)
    .getFirstChildByKindOrThrow(SyntaxKind.JsxElement)

  jsxElement.replaceWithText(`
      <>
        <div
            style={{
              position: "absolute",
              left: "50%",
              zIndex: 2,
              width: 400,
              height: 200,
              opacity: "95%",
              marginTop: 20,
            }}
          >
            <button
              style={{
                minWidth: 50,
                minHeight: 20,
                padding: "10 20",
                borderRadius: "10%",
              }}
              onClick={() => (window.location.pathname = "/${newPageName}")}
            >
              /${newPageName}
            </button>
        </div>
      ${jsxElement.getText()}
      </>
    `)
}
