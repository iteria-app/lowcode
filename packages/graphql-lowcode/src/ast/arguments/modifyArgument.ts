import { parse, visit, BREAK, VariableDefinitionNode, ObjectValueNode, ObjectFieldNode } from 'graphql'

export function modifyArgument(file: string, queryName: string, argName: string, value: string, parents?: string[]) {
  const ast = parse(file)

  visit(ast, {
    OperationDefinition(node) {
      if (node.name?.value === queryName) {

        const foundVariable = node.variableDefinitions?.find((variableDefinition: VariableDefinitionNode) => variableDefinition.variable.name.value === argName)

        if (foundVariable && foundVariable.loc && foundVariable.type.loc) {
          let actualDefaultValue = foundVariable.defaultValue as ObjectValueNode
          let actualNumberOfValues = actualDefaultValue?.fields?.length ?? 0

          if (parents && actualDefaultValue) {
            for (const actualParent of parents) {
              actualDefaultValue = actualDefaultValue.fields.filter((field: ObjectFieldNode): field is ObjectFieldNode => true).find(field =>
                field.name.value === actualParent)?.value as ObjectValueNode

              actualNumberOfValues = actualDefaultValue.fields.length
            }

            //if variable is already there, remove it and return
            const valueExists = actualDefaultValue.fields.find(field => field.name.value === value)
            if (valueExists && valueExists.loc) {
              file = file.substr(0, valueExists.loc?.start) + file.substr(valueExists.loc?.end, file.length - 1)
              if (actualNumberOfValues > 1) file = deleteComasLeft(file, valueExists.loc.start)
              return file
            }
          }

          //if variable is nested
          if (actualDefaultValue?.fields && actualDefaultValue.loc) {
            file = file.substr(0, actualDefaultValue.loc?.end - 1) +
              (actualNumberOfValues > 0 ? `, ${value}` : value) +
              file.substr(actualDefaultValue.loc?.end - 1, file.length - 1)
          } else { //if there is not that variable yet
            const varTypeStringLength = foundVariable.type.loc?.end - foundVariable.type.loc?.start
            const varTypeString = file.substr(foundVariable.type.loc?.start, varTypeStringLength)
            const finalArgString = value != '' ? `${varTypeString} = ${value}` : varTypeString
            file = file.substr(0, foundVariable?.type.loc?.start) + finalArgString + file.substr(foundVariable?.loc?.end, file.length - 1)
          }

          BREAK
        }
      }
    }
  })

  return file
}

export function hasVariables(file: string, queryName: string, argName: string) {
  const ast = parse(file)
  let foundVariable: VariableDefinitionNode | undefined

  visit(ast, {
    OperationDefinition(node) {
      if (node.name?.value === queryName) {
        foundVariable = node.variableDefinitions?.find((variableDefinition: VariableDefinitionNode) => variableDefinition.variable.name.value === argName)
        BREAK
      }
    }
  })
  if (foundVariable?.defaultValue) return true
  return false
}

export function modifyArgumentValue(file: string, queryName: string, argName: string, parents: string[], value: string) {
  const ast = parse(file)

  visit(ast, {
    OperationDefinition(node) {
      if (node.name?.value === queryName) {
        const foundArgument = node.variableDefinitions?.find((variableDefinition: VariableDefinitionNode) => variableDefinition.variable.name.value === argName)

        //if variable is nested
        if (parents?.length) {
          let actualNestedVariable = foundArgument?.defaultValue as ObjectValueNode
          for (const actualParent of parents) {
            actualNestedVariable = actualNestedVariable.fields.filter((field: ObjectFieldNode): field is ObjectFieldNode => true).find(field =>
              field.name.value === actualParent)?.value as ObjectValueNode
          }

          if(actualNestedVariable && actualNestedVariable.loc) {
            file = file.substr(0, actualNestedVariable.loc.start) + `"${value}"` + file.substr(actualNestedVariable.loc.end, file.length - 1)
            return file
          }
        }

        //not nested
        if (foundArgument && foundArgument.defaultValue?.loc) {
          file = file.substr(0, foundArgument.defaultValue.loc.start) + `"${value}"` + file.substr(foundArgument.defaultValue.loc.end, file.length - 1)
          return file
        }
      }
    }
  })

  return file
}

function deleteComasLeft(file: string, pos: number) {
  const startPos = pos

  while (file.charAt(pos - 1) === ' ' || file.charAt(pos - 1) === ',') {
    pos--
  }

  return file.substr(0, pos) + file.substr(startPos, file.length - 1)
}