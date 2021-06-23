import { parse, visit, print } from 'graphql'

export function addFragmentField(graphqlQuery: string, options: { entity: string, property: string }) {
  if (!graphqlQuery.indexOf('fragment')) return graphqlQuery
  const format = graphqlQuery.indexOf('\n') >= 0 ? '\n' : ''

  const ast = parse(graphqlQuery)
  let finalQuery = graphqlQuery

  let lastFragmentFieldIndexes: number[] = []

  //finds the first occurence of '{' and counts spaces after, to set number of indent spaces
  const firstBracket = graphqlQuery.indexOf('{') + 1

  const indentSize = format === '\n' ? 2 : 1
  let indent = 0

  for (const char of graphqlQuery.substr(firstBracket)) {
    if (char === ' ') indent += indentSize
    else if (char === '\n') continue
    else break
  }

  //creates indent string
  const indentString = Array(indent).fill(' ').join('')

  visit(ast, {
    Field(node) {
      if (node.name.value === options.entity) {
        const lastFragmentField = node.selectionSet?.selections[node.selectionSet.selections.length - 1]
        lastFragmentFieldIndexes.push(lastFragmentField && lastFragmentField.loc?.end ? lastFragmentField.loc.end : -1)
      }
    }
  })

  let offset = 0
  lastFragmentFieldIndexes.forEach(index => {
    finalQuery = finalQuery.slice(0, index + offset) + `${format}${indentString}${options.property}` + finalQuery.slice(index + offset)
    offset += options.property.length + indent + (format === '\n' ? 1 : 0)
  })

  return finalQuery
}
