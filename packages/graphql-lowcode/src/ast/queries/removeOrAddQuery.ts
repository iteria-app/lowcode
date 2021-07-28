import { BREAK, OperationDefinitionNode, parse, visit } from 'graphql'
import { getFragmentSpreadName, getLastQueryLoc } from '../getters'
import { removeFragment, addFragment, countWhitespacesAndNewLinesToLeft, countWhitespacesAndNewLinesToRight } from '../fragments/removeOrAddFragmentFields'

export function removeOrAddQuery(file: string, queryName: string, queryCache: { name: string, query: string, fragment: string }[]) {
  try {
    const ast = parse(file)
    let queryFound = false

    visit(ast, {
      OperationDefinition(node: OperationDefinitionNode) {
        if (node.name?.value === queryName && node.loc) {
          //deletes fragment
          const fragmentName = getFragmentSpreadName(file, queryName)
          const { fileWithoutFragment, removedFragment } = removeFragment(file, fragmentName)

          //deletes query
          const { fileWithoutQuery, removedQuery } = removeQuery(fileWithoutFragment, queryName)
          queryCache = [...queryCache, { name: queryName, query: removedQuery, fragment: removedFragment }]

          file = fileWithoutQuery
          queryFound = true

          BREAK
        }
      }
    })

    //if query was not found, add it to file + fragment
    if (!queryFound) {
      const lastQueryPos = getLastQueryLoc(file)

      const queryToBeAdded = queryCache.find(query => query.name === queryName)
      queryCache = queryCache.filter(query => query.name != queryName)

      if (queryToBeAdded) {
        file = addQuery(file, queryToBeAdded.query, lastQueryPos)
        file = addFragment(file, queryToBeAdded.fragment)
      }
    }
  } catch (error) {
    //TODO highligt in VS Code
    console.log(error)
  }

  const updatedFile = file
  return { updatedFile, queryCache }
}

function addQuery(file: string, query: string, pos: number) {
  return file.substr(0, pos) + `\n\n${query}\n` + file.substr(pos, file.length)
}

function removeQuery(file: string, queryName: string): { fileWithoutQuery: string, removedQuery: string } {
  const ast = parse(file)

  let removedQuery = ''
  let fileWithoutQuery: string = ''

  visit(ast, {
    OperationDefinition(node: OperationDefinitionNode) {
      if (node.name?.value === queryName && node.loc) {
        const { leftSpaces, leftNewLines } = countWhitespacesAndNewLinesToLeft(file, node.loc.start)
        const { rightSpaces, rightNewLines } = countWhitespacesAndNewLinesToRight(file, node.loc.end)

        removedQuery = file.substr(node.loc?.start, node.loc?.end - node.loc?.start)
        fileWithoutQuery = file.substr(0, node.loc?.start - (leftSpaces + leftNewLines)) + file.substr(node.loc?.end + (rightSpaces + rightNewLines), file.length - 1)
        BREAK
      }
    }
  })

  return { fileWithoutQuery, removedQuery }
}