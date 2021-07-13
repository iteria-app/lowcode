import { IntrospectionQuery, Field, TypesObject, EntityQuery, Argument, Root, Type } from './types'
import { getHasuraInputFields } from './hasuraGetMutationType'

export function generateGraphqlQueries(introspection: IntrospectionQuery, name: string) {
  const types = introspection.types

  const queryRoot = getRoot(types, 'query_root')
  const mutationRoot = getRoot(types, 'mutation_root')

  const entities = [...getEntities(queryRoot, types, 'SCALAR'), ...getEntities(mutationRoot, types)]

  const fragmentsQuery = buildFragmentsQuery(entities, types, 'hasura')

  //filter queries that returns SCALAR type

  const selectQuery = buildSelectQuery(queryRoot, name)
  const mutationQuery = buildMutationQuery(mutationRoot, name)

  const queries = [selectQuery, mutationQuery, fragmentsQuery]

  const finalQuery = buildGraphqlQuery(queries)

  return finalQuery
}

export function getRoot(types: TypesObject[], type: string): Root {
  for (const typeObject of types) {
    //iterate through types to find query/mutation root
    if (typeObject.fields && typeObject.name === type) return { fields: typeObject.fields, kind: typeObject.kind }
  }

  return { fields: [], kind: '' }
}

function getEntities(root: Root, types: TypesObject[], filterOnlyFields? :string): EntityQuery[] {
  const queryAndEntityNames = getQueryAndEntityNames(root)

  let entities: EntityQuery[] = []

  for (const field of queryAndEntityNames) {
    const queryName = field.name
    const entityName = getNestedOfType(field).name ?? ''
    let entityFields = getEntityFields(entityName, types)

    //if parameter fitlerOnlyFields then skip every root that does not return filtered type fields
    if(filterOnlyFields && !entityFields.some(field => getNestedOfType(field).kind === filterOnlyFields)) {
      //remove it from root
      root.fields = root.fields.filter(fieldToBeDelete => fieldToBeDelete !== field)
      continue
    }
    entities = [...entities, { queryName, entityName, fields: entityFields }]
  }

  return entities
}

function getQueryAndEntityNames(queryRoot: Root) {
  let queryAndEntityNames: any[] = []

  for (const field of queryRoot.fields) {
    queryAndEntityNames = [...queryAndEntityNames, field]
  }

  return queryAndEntityNames
}

//gets the deepest ofType name value from returning field
function getReturningType(returningField: Field): string {
  let actualType = returningField.type

  while (actualType.ofType) {
    actualType = actualType.ofType
  }

  return actualType.name ? actualType.name : ''
}

function getEntityFields(entityName: string, types: TypesObject[]): Field[] {
  const entity = types.find(type => type.name === entityName)

  if (entity && entity.fields) return entity.fields
  return []
}

//Finds the deepest nested field type name/entity
export function getNestedOfType(field: Field | Argument): Type {
  let actualType = field.type

  while (actualType.ofType) actualType = actualType.ofType

  if (actualType.name) return actualType
  return { name: '', kind: '' }
}

function isMandatory(field: Field | Argument) {
  let actualType = field.type

  while (actualType.ofType) {
    if (actualType.kind === 'NON_NULL') return true
    actualType = actualType.ofType
  }

  return false
}

function isListType(field: Field) {
  let actualType = field.type

  while (actualType.ofType) {
    if (actualType.kind === 'LIST') return true
    actualType = actualType.ofType
  }

  return false
}

function getOrderByTypeName(field: Field) {
  for (const arg of field.args) {
    if (arg.name === 'order_by') {
      return getNestedOfType(arg).name
    }
  }

  return ''
}

function buildParametersAndVariablesString(field: Field, name: string) {
  const inputFields = getHasuraInputFields(field.args)

  //checks whether argument is list type, if yes add limit = 100, offset
  //if args can be ordered by 'order_by' argument, add it to list query
  const order_by = ''//getOrderByTypeName(field)
  const order_by_ParamString = order_by != '' ? `, order_by: $order_by` : ''
  const order_by_VarString = order_by != '' ? `, $order_by: ${order_by}` : ''
  const listTypeVar = isListType(field) ? `$limit: Int = 100, $offset: Int${order_by_VarString}` : ''
  const listTypeParam = isListType(field) ? `limit: $limit, offset: $offset${order_by_ParamString}` : ''

  //filtering arguments for further use, only few are needed
  const filteredArgs = field.args.filter((arg: { name: String }) => inputFields.includes(arg.name))

  let queryParams: string[] = []
  let variables: string[] = []

  filteredArgs.forEach((arg: { name: string }) => {
    let newParameter = ''

    if (inputFields.includes('_set') && arg.name === '_set') newParameter = `${arg.name}: $${name}`
    else if (inputFields.includes('object') && arg.name === 'object') newParameter = `${arg.name}: $${name}`
    else if (inputFields.includes('objects') && arg.name === 'objects') newParameter = `${arg.name}: $${name}`

    else newParameter = `${arg.name}: $${arg.name}`

    //adds '!' after type name
    const mandatory = isMandatory(arg) ? '!' : ''

    let newVariable = ''
    const variableType = getNestedOfType(arg).name

    if (inputFields.includes('_set') && arg.name === '_set') newVariable = `$${name}: ${variableType}${mandatory}`
    else if (inputFields.includes('object') && arg.name === 'object') newVariable = `$${name}: ${variableType}${mandatory}`
    else if (inputFields.includes('objects') && arg.name === 'objects') newVariable = `$${name}: ${variableType}${mandatory}`

    else newVariable = `$${arg.name}: ${variableType}${mandatory}`

    queryParams = [...queryParams, newParameter]
    variables = [...variables, newVariable]
  })

  //adds order_by params and variables to final strings
  if (order_by != '') {
    queryParams = [...queryParams, listTypeParam]
    variables = [...variables, listTypeVar]
  }

  return { params: queryParams.length ? `(${queryParams.join(', ')})` : '', variables: variables.length ? `(${variables.join(', ')})` : '' }
}

function buildSelectQuery(queryRoot: Root, name: string): string {
  let selectQueries: string[] = []

  queryRoot.fields.forEach(query => {
    const fragmentName = `${query.name}_${getNestedOfType(query).name}`
    const { params, variables } = buildParametersAndVariablesString(query, name)

    const newSelectQuery = `query ${query.name}${variables} {\n  ${query.name}${params} {\n    ...${fragmentName}\n  }\n}`

    selectQueries = [...selectQueries, newSelectQuery]
  })

  return selectQueries.join('\n\n')
}

function buildMutationQuery(mutationRoot: Root, name: string): string {
  let mutationQueries: string[] = []

  mutationRoot.fields.forEach(field => {
    const fragmentName = `${field.name}_${getNestedOfType(field).name}`

    mutationQueries = [...mutationQueries, buildMutationString(field, fragmentName, name)]
  })

  return mutationQueries.join('\n\n')

}

function buildMutationString(field: Field, fragmentName: string, name: string) {
  const { params, variables } = buildParametersAndVariablesString(field, name)

  return `mutation ${field.name}${variables} {\n  ${field.name}${params} {\n    ...${fragmentName}\n  }\n}`
}

function buildReturningString(types: TypesObject[], returningType: string): string {
  let returningFields: string[] = []

  for (const type of types) {
    if (type.name === returningType && type.fields) {
      type.fields.forEach(field => {
        if (getNestedOfType(field).kind === 'SCALAR') {
          returningFields = [...returningFields, field.name]
        }
      })

      break
    }
  }

  return `returning {\n    ${returningFields.join('\n    ')}\n  }`
}

function buildFragmentsQuery(entities: EntityQuery[], types: TypesObject[], target?: string): string {
  let fragmentsStrings: string[] = []

  entities.forEach(entity => {
    let fragmentFields: string[] = []

    entity.fields.forEach(field => {
      //if mutation root has returning type, build returning object with fields to be inserted into fragment fields
      if (target && target === 'hasura' && field.name === 'returning') {
        const returningType = getReturningType(field)
        const returningString = buildReturningString(types, returningType)

        fragmentFields = [...fragmentFields, returningString]
      } else {
        if (getNestedOfType(field).kind === 'SCALAR') fragmentFields = [...fragmentFields, field.name]
      }
    })

    const newFragmentString = `fragment ${entity.queryName}_${entity.entityName} on ${entity.entityName} {\n  ${fragmentFields.join('\n  ')}\n}`

    if (fragmentFields.length) fragmentsStrings = [...fragmentsStrings, newFragmentString]
  })

  return fragmentsStrings.join('\n\n')
}

function buildGraphqlQuery(queries: string[]) {
  queries = queries.filter(query => query != '')

  return `${queries.join('\n\n')}`
}


