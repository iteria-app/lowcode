import { Argument } from './types'

export function getHasuraInputFields(args: Argument[]): String[] {
  const containsWhere = args.some(argument => argument.name === 'where')
  const containsId = args.some(argument => argument.name === 'id')
  const containsObject = args.some(argument => argument.name === 'object')
  const containsObjects = args.some(argument => argument.name === 'objects')
  const containsSet = args.some(argument => argument.name === '_set')
  const containsPKColumns = args.some(argument => argument.name === 'pk_columns')

  if (containsObjects) return ['objects'] //insert many
  if (containsObject) return ['object'] //insert one

  if (containsSet && containsWhere) return ['where', '_set'] //update many
  if (containsSet && containsPKColumns) return ['_set', 'pk_columns'] //update one

  if (containsWhere) return ['where'] //delete many
  return ['id'] //delete one
}