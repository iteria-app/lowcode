import { Field, Argument, Type } from '../types'
import { changeInputFieldsNames } from '../hasura/hasuraUtils'

/**
 * 
 * @param field Query/Mutation/Subscription root field
 * @param name Entity name that parameters are built for
 * @returns Formatted parameters and variables string
 */

export function buildParametersAndVariablesString(field: Field, name: string) {
  let queryParams: string[] = []
  let variables: string[] = []

  field.args.forEach((arg: { name: string }) => {
    //if input fields are _set || object || objects user hasura specific logic to change names to entityName else jsut use arg.name
    const { newParameter, newVariable } = changeInputFieldsNames(arg, name) ?? { newParameter: `${arg.name}: $${arg.name}`, newVariable: `$${arg.name}: ${buildVariableString(arg)}` }

    queryParams = [...queryParams, newParameter]
    variables = [...variables, newVariable]
  })

return { params: queryParams.length ? `(${queryParams.join(', ')})` : '', variables: variables.length ? `(${variables.join(', ')})` : '' }
}

/**
 * 
 * @param arg Query/Mutation/Subscription argument
 * @returns Formatted GraphQL variable name with special characters
 */

export function buildVariableString(arg: Argument): string {
  const typeArray = getOfTypeArray(arg).reverse()
  let variableString = ''

  typeArray.forEach(type => {
    if (type.kind === 'NON_NULL') variableString = `${variableString}!`
    if (type.kind === 'LIST') variableString = `[${variableString}]`
    if (type.name) variableString = `${type.name}`
  })

  return variableString
}

function getOfTypeArray(arg: Argument | Field): Type[] {
  let ofTypeArray: Type[] = []
  let actualType = arg.type

  while (actualType) {
    ofTypeArray = [...ofTypeArray, actualType]
    actualType = actualType.ofType
  }

  return ofTypeArray
}