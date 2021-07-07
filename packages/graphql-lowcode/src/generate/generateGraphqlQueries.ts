import { IntrospectionQuery, Field, TypesObject, EntityQuery, Argument, Root } from './types'

export function generateGraphqlQueries(introspection: IntrospectionQuery) {
  const types = introspection.types

  const queryRoot = getRoot(types, 'query_root')
  const mutationRoot = getRoot(types, 'mutation_root')

  const entities = [...getEntities(queryRoot, types), ...getEntities(mutationRoot, types)]

  const fragmentsQuery = buildFragmentsQuery(entities, types, 'hasura')

  const selectQuery = buildSelectQuery(queryRoot)
  const mutationQuery = buildMutationQuery(mutationRoot)

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

function getEntities(root: Root, types: TypesObject[]): EntityQuery[] {
  const queryAndEntityNames = getQueryAndEntityNames(root)

  let entities: EntityQuery[] = []

  for (const field of queryAndEntityNames) {
    const queryName = field.name
    const entityName = getNestedOfTypeName(field)
    let entityFields = getEntityFields(entityName, types)

    //if root is type of LIST get only SCALAR fields
    if (root.kind === 'LIST') entityFields = entityFields.filter(field => field.type.kind === 'SCALAR')

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
export function getNestedOfTypeName(field: Field) {
  let actualType = field.type

  while (actualType.ofType) actualType = actualType.ofType

  if(actualType.name) return actualType.name
  return 'null'
}

function buildParametersString(args: Argument[], kind: string): string {
  let parameters: string[] = []

  if (args) {
    args.forEach(argument => {
      const newParameter = `${argument.name}: $${argument.name}`

      parameters = [...parameters, newParameter]
    })
  }

  return parameters.length ? `(${parameters.join(', ')})` : ''
}

function buildSelectQuery(queryRoot: Root): string {
  let selectQueries: string[] = []

  queryRoot.fields.forEach(field => {
    const fragmentName = `${field.name}_${getNestedOfTypeName(field)}`
    const parametersString = buildParametersString(field.args, queryRoot.kind)

    const newSelectQuery = `query ${field.name} {\n  ${field.name}${parametersString} {\n    ...${fragmentName}\n  }\n}`

    selectQueries = [...selectQueries, newSelectQuery]
  })

  return selectQueries.join('\n\n')
}

function buildMutationQuery(mutationRoot: Root): string {
  let mutationQueries: string[] = []

  mutationRoot.fields.forEach(field => {
    //const mutationType = getMutationType(field.args)
    const fragmentName = `${field.name}_${getNestedOfTypeName(field)}`

    mutationQueries = [...mutationQueries, buildMutationString(field, fragmentName)]
  })

  return mutationQueries.join('\n\n')

}

function buildMutationString(field: Field, fragmentName: string) {
  const parametersQuery = buildParametersString(field.args, '')

  return `mutation ${field.name} {\n  ${field.name}${parametersQuery} {\n    ...${fragmentName}\n  }\n}`
}

function buildReturningString(types: TypesObject[], returningType: string): string {
  let returningFields: string[] = []

  for (const type of types) {
    if (type.name === returningType && type.fields) {
      type.fields.forEach(field => {
        returningFields = [...returningFields, field.name]
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
      } else fragmentFields = [...fragmentFields, field.name]
    })
    const newFragmentString = `fragment ${entity.queryName}_${entity.entityName} on ${entity.entityName} {\n  ${fragmentFields.join('\n  ')}\n}`

    fragmentsStrings = [...fragmentsStrings, newFragmentString]
  })

  return fragmentsStrings.join('\n\n')
}

function buildGraphqlQuery(queries: string[]) {
  queries = queries.filter(query => query != '')

  return `${queries.join('\n\n')}`
}


