import { getHasuraInputFields } from '../hasura/hasuraUtils'
import { Field, Argument, Type } from '../types'

/**
 * 
 * @param field Query/Mutation/Subscription root field
 * @param name Entity name that parameters are built for
 * @returns Formatted parameters and variables string
 */

export function buildParametersAndVariablesString(field: Field, name: string) {
  const inputFields = getHasuraInputFields(field.args)

  let queryParams: string[] = []
  let variables: string[] = []

  field.args.forEach((arg: { name: string }) => {
    let newParameter = ''

    //hasura specific logic
    if (inputFields.includes('_set') && arg.name === '_set') newParameter = `${arg.name}: $${name != '' ? name : '_set'}`
    else if (inputFields.includes('object') && arg.name === 'object') newParameter = `${arg.name}: $${name != '' ? name : 'object'}`
    else if (inputFields.includes('objects') && arg.name === 'objects') newParameter = `${arg.name}: $${name != '' ? name : 'objects'}`

    else newParameter = `${arg.name}: $${arg.name}`

    let newVariable = ''
    const variableTypeString = buildVariableString(arg)

    if (inputFields.includes('_set') && arg.name === '_set') newVariable = `$${name != '' ? name : '_set'}: ${variableTypeString}`
    else if (inputFields.includes('object') && arg.name === 'object') newVariable = `$${name != '' ? name : 'object'}: ${variableTypeString}`
    else if (inputFields.includes('objects') && arg.name === 'objects') newVariable = `$${name != '' ? name : 'objects'}: ${variableTypeString}`

    else newVariable = `$${arg.name}: ${variableTypeString}`

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

function buildVariableString(arg: Argument): string {
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

  while (true) {
    ofTypeArray = [...ofTypeArray, actualType]
    if (actualType.ofType) actualType = actualType.ofType
    else break
  }

  return ofTypeArray
}