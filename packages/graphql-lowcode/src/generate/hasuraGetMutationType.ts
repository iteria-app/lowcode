import { TypesObject, Mutation } from './generateGraphqlQueries'

export function getMutationType(type: TypesObject): Mutation {
  const containsWhere = type.fields.some(field => field.name === 'where')
  const containsId = type.fields.some(field => field.name === 'id')
  const containsObject = type.fields.some(field => field.name === 'object')
  const containsObjects = type.fields.some(field => field.name === 'objects')
  const containsSet = type.fields.some(field => field.name === '_set')
  const containsPKColumns = type.fields.some(field => field.name === 'pk_columns')

  if (containsObjects) return { operation: 'insert', type: 'many'}
  if (containsObject) return { operation: 'insert', type: 'one'}

  if (containsSet && containsWhere) return { operation: 'update', type: 'many'}
  if (containsSet && containsPKColumns) return { operation: 'update', type: 'one'}

  if (containsWhere) return { operation: 'delete', type: 'many'}
  if (containsId) return { operation: 'insert', type: 'one'}
}