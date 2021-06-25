import { parse, visit } from 'graphql'

export function addFragmentField(graphqlQuery: string, options: { entity: string, property: string }) {
  //if fragment does not contain fragment keyword -> returns unchanged query
  if (!graphqlQuery.indexOf('fragment')) return graphqlQuery

  //if query is inline add spaces after newProperty, else add new line
  const format = graphqlQuery.indexOf('\n') >= 0 ? '\n' : ''

  //gets indentations for each fragment where a new property is being added
  const fragmentIndentations = getFragmentIndentations(graphqlQuery, options.entity, options.property)

  //gets new property positions for each fragment where a new property is being added
  const fragmentNewFieldPositions = findQueryOffsetsForFields(graphqlQuery, fragmentIndentations, options.entity, options.property)

  const finalQuery = patchQueryFields(graphqlQuery, fragmentNewFieldPositions, fragmentIndentations, options.property, format)

  return finalQuery
}

function getFragmentIndentations(graphqlQuery: string, entity: string, property: string) {
  const ast = parse(graphqlQuery)

  let fragmentIndentations: number[] = []

  visit(ast, {
    Field(node) {
      if (node.name.value === entity) {
        const firstFragmentField = node.selectionSet?.selections[0]
        const lastFragmentField = node.selectionSet?.selections[node.selectionSet.selections.length - 1]
        const startIndex = firstFragmentField?.loc?.start
        const endIndex = lastFragmentField?.loc?.end

        if (!fragmentContainsField(graphqlQuery, startIndex, endIndex, property)) fragmentIndentations = [...fragmentIndentations, getFieldIndentation(graphqlQuery, startIndex)]
      }
    }
  })

  return fragmentIndentations
}

function findQueryOffsetsForFields(graphqlQuery: string, fragmentIndentations: number[], entity: string, property: string) {
  const ast = parse(graphqlQuery)
  const format = graphqlQuery.indexOf('\n') >= 0 ? true : false

  //after new property is added to a graphql string, the whole string gets longer -> next new properties must be offseted by property length
  const newFieldLength = property.length

  let fragmentNewFieldPositions: number[] = []
  let offset = 0, iteration = 0

  visit(ast, {
    Field(node) {
      if (node.name.value === entity) {
        const lastFragmentField = node.selectionSet?.selections[node.selectionSet.selections.length - 1]
        const endIndex = lastFragmentField?.loc?.end

        if(endIndex && node.selectionSet?.selections && !fragmentContainsField(node.selectionSet?.selections, property)) fragmentNewFieldPositions = [...fragmentNewFieldPositions, endIndex + offset]

        offset += (newFieldLength + fragmentIndentations[iteration])
        if(format) offset += 1
        iteration++
      }
    }
  })

  return fragmentNewFieldPositions
}

export function getFieldIndentation(graphqlQuery: string, fragmentStartIndex: number | undefined) {
  //first create substring from 0 to fragmentStartIndex
  const subString = graphqlQuery.substr(0, fragmentStartIndex)

  //then convert string into array and reverse it, indent spaces should be at the beginning
  const reversedString = subString.split('').reverse().join('')

  //then just iterate through the string and count spaces
  let indent = 0

  for (const char of reversedString) {
    if (char === ' ') indent ++
    else break
  }

  return indent
}

function patchQueryFields(graphqlQuery: string, fragmentNewFieldPositions: number[], fragmentIndentations: number[], property: string, format: string) {
  fragmentNewFieldPositions.forEach((index, iteration) => {
    const indentSize = fragmentIndentations[iteration]
    //creates indent string
    const indentString = Array(indentSize).fill(' ').join('')

    graphqlQuery = graphqlQuery.substr(0, index) + `${format}${indentString}${property}` + graphqlQuery.substr(index)
  })

  return graphqlQuery
}

function fragmentContainsField(framentSelections: readonly any[], property: string) {
  //checks if fragment contains property
  return framentSelections.some(selection => selection.name.value === property)
}
