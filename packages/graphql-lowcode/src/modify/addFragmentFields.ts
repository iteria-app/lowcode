import { graphql, parse, visit } from 'graphql'

export function addFragmentField(graphqlQuery: string, options: { entity: string, property: string }) {
  //if fragment does not contain fragment keyword -> returns unchanged query
  if (!graphqlQuery.indexOf('fragment')) return graphqlQuery

  const ast = parse(graphqlQuery)
  let finalQuery = graphqlQuery

  let lastFragmentFieldIndexes: number[] = []
  let firstFragmentFieldIndex: number = -1

  visit(ast, {
    Field(node) {
      if (node.name.value === options.entity) {
        const firstFragmentField = node.selectionSet?.selections[0]
        const lastFragmentField = node.selectionSet?.selections[node.selectionSet.selections.length - 1]

        //get the indexes where the fragment fields starts and ends in query
        const startIndex = firstFragmentField?.loc?.start
        const endIndex = lastFragmentField?.loc?.end

        //if is the first iteration get first get first fragment field for formatting
        if(firstFragmentFieldIndex == -1) firstFragmentFieldIndex = startIndex ? startIndex : -1

        //checks if fragment already does not contain that field
        if (startIndex && endIndex && !fragmentContainsField(graphqlQuery.substr(startIndex, endIndex), options.property)) {
          lastFragmentFieldIndexes.push(lastFragmentField && lastFragmentField.loc?.end ? lastFragmentField.loc.end : -1)
        }
      }
    }
  })

  const { indent, indentString, format } = getIndentationNew(graphqlQuery, firstFragmentFieldIndex)

  let offset = 0
  lastFragmentFieldIndexes.forEach(index => {
    finalQuery = finalQuery.slice(0, index + offset) + `${format}${indentString}${options.property}` + finalQuery.slice(index + offset)
    offset += options.property.length + indent + (format === '\n' ? 1 : 0)
  })

  return finalQuery
}

export function getIndentationNew(graphqlQuery: string, fragmentStartIndex: number) {
  //if query string is inline formatted use '' else '\n'
  const format = graphqlQuery.indexOf('\n') >= 0 ? '\n' : ''

  //first create substring from 0 to fragmentStartIndex
  const subString = graphqlQuery.substr(0, fragmentStartIndex)

  //then convert string into array and reverse it, indent spaces should be at the beginning
  const reversedString = subString.split('').reverse().join('')

  //then just iterate through the string and count spaces
  let indent = 0

  for(const char of reversedString) {
    if(char === ' ') indent++
    else break
  }

  //creates indent string
  const indentString = Array(indent).fill(' ').join('')

  return { indent, indentString, format}
}

export function fragmentContainsField(fragmentQuery: string, fieldName: string) {
  if (fragmentQuery.indexOf(fieldName) >= 0) return true
  return false
}
