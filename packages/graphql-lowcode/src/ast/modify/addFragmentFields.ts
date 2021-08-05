import { FragmentDefinitionNode, SelectionNode, FieldNode, parse, visit } from 'graphql'
import { Field } from '../../generate'

interface fieldOffset {
  offset: number,
  indentSize: number
}

export function addFragmentField(graphqlQuery: string, options: { entity: string, property: string }, parents: string[], childrenField?: boolean) {
  //if fragment does not contain fragment keyword -> returns unchanged query
  if (!graphqlQuery.indexOf('fragment')) return graphqlQuery

  //if query is inline add spaces after newProperty, else add new line
  const format = graphqlQuery.indexOf('\n') >= 0 ? '\n' : ''

  const queryOffsetsForFields = findQueryOffsetsForFields(graphqlQuery, options.entity, options.property, parents)

  if(childrenField) options.property = `${options.property} {\n    __typename\n  }` //TODO change

  const finalQuery = patchQueryFields(graphqlQuery, queryOffsetsForFields, options.property, format)

  return finalQuery
}

function findQueryOffsetsForFields(graphqlQuery: string, entity: string, property: string, parents: string[]) {
  const ast = parse(graphqlQuery)

  let queryOffsetForFields: fieldOffset[] = []

  visit(ast, {
    FragmentDefinition(node: FragmentDefinitionNode) {
      if (node.name.value === entity) {
        let actualNodeSelections = node.selectionSet.selections
        let actualNodePos = node.loc

        for(const actualParent of parents) {
          const foundNode = actualNodeSelections.filter((selection: SelectionNode): selection is FieldNode => true).find(selection => selection.name.value === actualParent)

          if(foundNode && foundNode.selectionSet) {
            actualNodeSelections = foundNode.selectionSet.selections
            actualNodePos = foundNode.loc
          }
          else actualNodeSelections = []
        }

        const firstFragmentField = actualNodeSelections[0]
        const lastFragmentField = actualNodeSelections[actualNodeSelections.length - 1]
        const startIndex = firstFragmentField?.loc?.start ?? actualNodePos?.start
        const endIndex = lastFragmentField?.loc?.end ?? actualNodePos?.end

        //if fragment does not contain the new property, calculate relative offset to original qiery and indent size for every fragment
        if (endIndex && node.selectionSet?.selections && !fragmentContainsField(node.selectionSet?.selections, property)) {
          queryOffsetForFields = [...queryOffsetForFields, {
            offset: endIndex,
            indentSize: getFieldIndentation(graphqlQuery, startIndex)
          }]
        }
      }
    }
  })

  return queryOffsetForFields
}

export function getFieldIndentation(graphqlQuery: string, fragmentStartIndex: number | undefined) {
  //first create substring from 0 to fragmentStartIndex
  const subString = graphqlQuery.substr(0, fragmentStartIndex)

  //then convert string into array and reverse it, indent spaces should be at the beginning
  const reversedString = subString.split('').reverse().join('')

  //then just iterate through the string and count spaces
  let indent = 0

  for (const char of reversedString) {
    if (char === ' ') indent++
    else break
  }

  return indent
}

function patchQueryFields(graphqlQuery: string, queryOffsetsForFields: fieldOffset[], property: string, format: string) {
  //after new property is added to a graphql string, the whole string gets longer -> next new properties must be offseted 
  //by property length + indentation + if format of query is multiline then add '\n' length, which is one
  let extraOffset = 0

  queryOffsetsForFields.forEach(field => {
    const indentString = Array(field.indentSize).fill(' ').join('')

    graphqlQuery = graphqlQuery.substr(0, field.offset + extraOffset) + `${format}${indentString}${property}` + graphqlQuery.substr(field.offset + extraOffset)
  
    extraOffset += property.length + field.indentSize + format.length
  })

  return graphqlQuery
}

function fragmentContainsField(framentSelections: readonly any[], property: string) {
  //checks if fragment contains property
  return framentSelections.some(selection => selection.name.value === property)
}
