import { OperationDefinitionNode, parse, visit, SelectionNode, FragmentSpreadNode, FieldNode, FragmentDefinitionNode, BREAK, GraphQLError } from 'graphql'

export function getSelectedQueryNames(file: string) {
  const ast = parse(file)

  let queryNames: string[] = []

  visit(ast, {
    OperationDefinition(node: OperationDefinitionNode) {
      if (node.name?.value) {
        queryNames = [...queryNames, node.name?.value]
        BREAK
      }
    }
  })

  return queryNames
}

export function getSelectedFragmentFields(file: string, fragmentName: string, parents: string[]) {
  const ast = parse(file)

  let selectedFields: string[] = []

  visit(ast, {
    FragmentDefinition(node: FragmentDefinitionNode) {
      if(node.name.value === fragmentName) {
        let actualNodeSelections = node.selectionSet.selections

        for(const actualParent of parents) {
          const foundNode = actualNodeSelections.filter((selection: SelectionNode): selection is FieldNode => true).find(selection => selection.name.value === actualParent)

          if(foundNode && foundNode.selectionSet) actualNodeSelections = foundNode.selectionSet?.selections
          else actualNodeSelections = []
        }

        selectedFields = actualNodeSelections.filter((selection: SelectionNode): selection is FieldNode => true).map(selection => selection.name.value)
      }
    }
  })

  return selectedFields
}

export function getFragmentSpreadName(file: string, queryName: string): string {
  const ast = parse(file)

  let fragmentName: string | undefined

  visit(ast, {
    Field(node: FieldNode) {
      if (node.name?.value === queryName) {
        fragmentName = node.selectionSet?.selections.find((selection: SelectionNode): selection is FragmentSpreadNode => true)?.name.value ?? undefined
        BREAK
      }
    }
  })

  return fragmentName ?? ''
}

export function getLastQueryLoc(file: string) {
  let pos = 0

  try {
    const ast = parse(file)

    visit(ast, {
      OperationDefinition(node: OperationDefinitionNode) {
        if (node.loc) pos = node.loc.end
      }
    })
  } catch (error) {
    //TODO handle
  }

  return pos
}

export function getNumberOfQueries(file: string) {
  const ast = parse(file)

  let n = 0

  visit(ast, {
    OperationDefinition(node) {
      n++
    }
  })

  return n
}