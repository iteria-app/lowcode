import { BREAK, FragmentDefinitionNode, SelectionNode, FieldNode, parse, visit } from 'graphql'
import { addFragmentField } from '../../modify'

export function removeOrAddFragmentField(file: string, fragmentName: string, fieldName: string, parents: string[], childrenField?: boolean) {
  try {
    const ast = parse(file)

    visit(ast, {
      FragmentDefinition(node: FragmentDefinitionNode) {
        if (node.name.value === fragmentName) {
          let actualNodeSelections = node.selectionSet.selections

          for (const actualParent of parents) {
            const foundNode = actualNodeSelections.filter((selection: SelectionNode): selection is FieldNode => true).find(selection => selection.name.value === actualParent)

            if (foundNode && foundNode.selectionSet) actualNodeSelections = foundNode.selectionSet?.selections
            else actualNodeSelections = []
          }

          const remainingNodes = actualNodeSelections.length

          const modifiedNode = actualNodeSelections.filter((selection: SelectionNode): selection is FieldNode => true).find(selection => {
            return selection.name.value === fieldName
          })

          //fragment already includes that field -> delete it
          if (modifiedNode && modifiedNode.loc) {
            //TODO delete field to function

            //if there is only one node left add '__typename' to the fragment to make the code valid
            const { leftSpaces, leftNewLines } = countWhitespacesAndNewLinesToLeft(file, modifiedNode.loc?.start)

            file = file.substr(0, (modifiedNode.loc?.start - (leftSpaces + leftNewLines))) +
              `${remainingNodes === 1 ? buildFragmentFieldStringWithIndent('__typename', leftSpaces) : ''}` +
              file.substr(modifiedNode.loc?.end, file.length - 1)
          } else { //fragment not included -> add it
            //if the only fragment field is '__typename' delete it and add new field
            file = addFragmentField(file, { entity: fragmentName, property: fieldName }, parents, childrenField)
            if (remainingNodes === 1) file = ifTypenameDeleteIt(file, fragmentName, parents)
          }

          BREAK
        }
      }
    })

    return file
  } catch (error) {
    //TODO highligt in VS Code
    console.log(error)
  }
}

function buildFragmentFieldStringWithIndent(name: string, indent: number) {
  return `\n${Array(indent).fill(' ').join('')}${name}`
}

function ifTypenameDeleteIt(file: string, fragmentName: string, parents: string[]) {
  const ast = parse(file)

  visit(ast, {
    FragmentDefinition(node: FragmentDefinitionNode) {
      if (node.name.value === fragmentName) {

        let actualNodeSelections = node.selectionSet.selections

        for (const actualParent of parents) {
          const foundNode = actualNodeSelections.filter((selection: SelectionNode): selection is FieldNode => true).find(selection => selection.name.value === actualParent)

          if (foundNode && foundNode.selectionSet) actualNodeSelections = foundNode.selectionSet?.selections
          else actualNodeSelections = []
        }

        const typeNameField = actualNodeSelections.filter((selection: SelectionNode): selection is FieldNode => true).find(selection => {
          return selection.name.value === '__typename'
        })

        if (typeNameField && typeNameField.loc) {
          const { leftSpaces, leftNewLines } = countWhitespacesAndNewLinesToLeft(file, typeNameField.loc?.start)
          file = file.substr(0, typeNameField.loc?.start - (leftSpaces + leftNewLines)) + file.substr(typeNameField.loc?.end, file.length - 1)
        }
        BREAK
      }
    }
  })

  return file
}

export function countWhitespacesAndNewLinesToLeft(file: string, pos: number) {
  let spaces = 0
  let newLines = 0

  while (file.charAt(pos - 1) === ' ' || file.charAt(pos - 1) === '\n') {
    if (file.charAt(pos - 1) === ' ') spaces++
    if (file.charAt(pos - 1) === '\n') newLines++
    pos--
  }

  return { leftSpaces: spaces, leftNewLines: newLines }
}

export function countWhitespacesAndNewLinesToRight(file: string, pos: number) {
  let spaces = 0
  let newLines = 0

  while (file.charAt(pos + 1) === ' ' || file.charAt(pos + 1) === '\n') {
    if (file.charAt(pos + 1) === ' ') spaces++
    if (file.charAt(pos + 1) === '\n') newLines++
    pos++
  }

  return { rightSpaces: spaces, rightNewLines: newLines }
}

export function removeFragment(file: string, fragmentName: string): { fileWithoutFragment: string, removedFragment: string } {
  const ast = parse(file)

  let removedFragment = ''
  let fileWithoutFragment: string = ''

  visit(ast, {
    FragmentDefinition(node: FragmentDefinitionNode) {
      if (node.name.value === fragmentName && node.loc) {
        removedFragment = file.substr(node.loc?.start, node.loc?.end - node.loc?.start)

        const { leftSpaces, leftNewLines } = countWhitespacesAndNewLinesToLeft(file, node.loc.start)
        const { rightSpaces, rightNewLines } = countWhitespacesAndNewLinesToRight(file, node.loc.end)

        fileWithoutFragment = file.substr(0, node.loc?.start - (leftSpaces + leftNewLines)) + file.substr(node.loc?.end + (rightSpaces + rightNewLines), file.length - 1)
        BREAK
      }
    }
  })

  return { fileWithoutFragment, removedFragment }
}

export function addFragment(file: string, fragment: string) {
  return file = `${file}\n${fragment}\n`
}
