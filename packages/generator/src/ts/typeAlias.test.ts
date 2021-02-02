// TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
import { Project } from "ts-morph"
import ts, { factory } from "typescript"
import { createJsxElement } from './components'
import { tagformatProperty } from './typeAlias'
import grommetTable from '../react/grommet/table'
import { graphqlGenTs1 } from "./typeAlias.example"

export function createAst(
  code: string,
  scriptTarget = ts.ScriptTarget.ESNext,
  scriptKind = ts.ScriptKind.TSX,
  filePath = `/ts-ast-viewer.tsx`
) {
  return ts.createSourceFile(
    filePath,
    code,
    scriptTarget,
    true,
    scriptKind
  )
}

test("typeAlias test 1", () => {
  const sourceFile = createAst('')
  const myClassFile = parseGraphqlTypes(graphqlGenTs1)
  const typeAlias = myClassFile.getTypeAlias("Parent")
  const props = typeAlias?.getType()?.getProperties()

  const node = createJsxElement(grommetTable.table, [],
    [createJsxElement(grommetTable.row, [],
      props?.map(prop =>
        createJsxElement(grommetTable.cell, [], [
          factory.createJsxText(
            prop.getName(),
            false
          ),
          ...tagformatProperty(prop, prop.getTypeAtLocation(myClassFile))
        ])
        //factory.createIdentifier("date")
        //factory.createStringLiteral("greeting")
        /*
        factory.createObjectLiteralExpression(
                            [factory.createShorthandPropertyAssignment(
                                factory.createIdentifier("name"),
                                undefined
                            )],
                            false
                        )
        */
      )
    )]
  )
  /*ts.transform(sourceFile, [
      (context) => (node) => {
        return ts.visitNode(node, n => {
          return node
        })
      }
    ])*/
  const printer = ts.createPrinter({newLine: ts.NewLineKind.LineFeed})
  console.log(
    'sevas',
    //transformed.transformed[0]
    //.printFile(transformed.transformed[0])
    console.log(printer.printNode(ts.EmitHint.Unspecified, node, sourceFile))
  )
})

function parseGraphqlTypes(sourceCode: string) {
  // initialize
  const project = new Project({
    // Optionally specify compiler options, tsconfig.json, in-memory file system, and more here.
    // If you initialize with a tsconfig.json, then it will automatically populate the project
    // with the associated source files.
    // Read more: https://ts-morph.com/setup/
  })

  // add source files
  //project.addSourceFilesAtPaths("src/**/*.ts");
  const myClassFile = project.createSourceFile("src/types.ts", sourceCode)
  return myClassFile
}
