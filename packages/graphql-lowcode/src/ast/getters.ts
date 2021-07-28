import { OperationDefinitionNode, parse, visit, SelectionNode, FragmentSpreadNode, FieldNode, FragmentDefinitionNode, BREAK } from 'graphql'
import { addFragmentField } from '../modify/addFragmentFields'

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

export function getSelectedFragmentFields(file: string, queryName: string): { fragmentName: string, fragmentFields: string[] } {
  const ast = parse(file)

  let fragmentName = getFragmentSpreadName(file, queryName) ?? ''
  let fragmentFields: string[] = []

  if (fragmentName) {
    visit(ast, {
      FragmentDefinition(node: FragmentDefinitionNode) {
        if (node.name.value === fragmentName) {
          fragmentFields = node.selectionSet?.selections.filter((selection: SelectionNode): selection is FieldNode => true).map(selection => selection.name?.value)
          BREAK
        }
      }
    })
  }

  return {
    fragmentName: fragmentName,
    fragmentFields: fragmentFields
  }
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
  const ast = parse(file)
  let pos = 0

  visit(ast, {
    OperationDefinition(node: OperationDefinitionNode) {
      if (node.loc) pos = node.loc.end
    }
  })

  return pos
}