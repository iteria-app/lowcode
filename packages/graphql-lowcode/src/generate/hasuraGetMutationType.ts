import { Argument, Mutation } from './generateGraphqlQueries'

export function getMutationType(args: Argument[]): Mutation {
  const containsWhere = args.some(argument => argument.name === 'where')
  const containsId = args.some(argument => argument.name === 'id')
  const containsObject = args.some(argument => argument.name === 'object')
  const containsObjects = args.some(argument => argument.name === 'objects')
  const containsSet = args.some(argument => argument.name === '_set')
  const containsPKColumns = args.some(argument => argument.name === 'pk_columns')

  if (containsObjects) return { operation: 'insert', type: 'many'}
  if (containsObject) return { operation: 'insert', type: 'one'}

  if (containsSet && containsWhere) return { operation: 'update', type: 'many'}
  if (containsSet && containsPKColumns) return { operation: 'update', type: 'one'}

  if (containsWhere) return { operation: 'delete', type: 'many'}
  return { operation: 'delete', type: 'one'}
}