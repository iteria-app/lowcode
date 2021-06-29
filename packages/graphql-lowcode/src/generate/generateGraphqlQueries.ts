import { getMutationType } from './hasuraGetMutationType'

interface Type {
  name: null | string,
  kind?: string,
  [key: string]: any
}

interface Field {
  name: string,
  type: Type,
  kind?: string,
  [key: string]: any
}

export interface TypesObject {
  name: string,
  fields: Field[],
  [key: string]: any
}

interface IntrospectionQuery {
  types: TypesObject[],
  [key: string]: any
}

interface Root {
  fields: Field[],
  kind: string,
  [key: string]: any
}

interface Entity {
  queryName: string,
  entityName: string,
  fields: string[],
}

interface Argument {
  name: string,
  [key: string]: any
}

export interface Mutation {
  operation: string,
  type: string
}

export function generateGraphqlQueries(introspection: IntrospectionQuery) {
  const types = introspection.types

  const queryRoot = getQueryRoot(types)
  const mutationRoot = getMutationRoot(types)

  const entities = [...getEntities(queryRoot, types), ...getEntities(mutationRoot, types)]

  const fragmentsQuery = buildFragmentsQuery(entities)

  const selectQuery = buildSelectQuery(queryRoot)
  const mutationQuery = buildMutationQuery(mutationRoot)

  const queries = [selectQuery, mutationQuery, fragmentsQuery]

  const finalQuery = buildGraphqlQuery(queries)

  return finalQuery
}

function getQueryRoot(types: TypesObject[]): Root {
  for (const typeObject of types) {
    //iterate through types to find query root
    if (typeObject.name === 'query_root') return { fields: typeObject.fields, kind: typeObject.kind }
  }

  return { fields: [], kind: '' }
}

function getMutationRoot(types: TypesObject[]): Root {
  for (const typeObject of types) {
    //iterate throught types to find mutation root
    if (typeObject.name === 'mutation_root') return { fields: typeObject.fields, kind: typeObject.kind }
  }

  return { fields: [], kind: '' }
}

function getEntities(root: Root, types: TypesObject[]): Entity[] {
  const queryAndEntityNames = getQueryAndEntityNames(root)

  let entities: Entity[] = []

  for (const field of queryAndEntityNames) {
    const queryName = field.name
    const entityName = field.type.name
    //if query root is type of list, get only scalar fields
    const entityFields = root.kind === 'LIST' ? getFieldNames(entityName, types, 'SCALAR') : getFieldNames(entityName, types)

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

function getFieldNames(entityName: string, types: TypesObject[], ofType?: string): string[] {
  let fieldNames: string[] = []

  const entityFields = getEntityFields(entityName, types)

  entityFields.forEach(field => {
    //skip of type fields, e.g. SCALAR
    if (ofType) {
      if (field.type.kind === ofType) fieldNames = [...fieldNames, field.name]
    }
    else fieldNames = [...fieldNames, field.name]
  })

  return fieldNames
}

function getEntityFields(entityName: string, types: TypesObject[]): Field[] {
  const entity = types.find(type => type.name === entityName)

  if (entity) return entity.fields
  return []
}

function buildParametersString(args: Argument[], kind: string): string {
  let parameters: string[] = []

  //limit to 100 if is type of list and no other parameters are specified
  if (kind === 'LIST') {
    if (!args || !args.some(argument => argument.name == 'limit')) parameters = [...parameters, 'limit: 100']
  }

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
    const fragmentName = `${field.name}_${field.type.name}`
    const parametersString = buildParametersString(field.args, queryRoot.kind)
    const pkParameter = queryRoot.kind !== 'LIST' ? '($id: ID!)' : ''

    const newSelectQuery = `query ${field.name}${pkParameter} {\n  ${field.name}${parametersString} {\n    ...${fragmentName}\n  }\n}`

    selectQueries = [...selectQueries, newSelectQuery]
  })

  return selectQueries.join('\n\n')
}

function buildMutationQuery(mutationRoot: Root): string {
  let mutationQueries: string[] = []

  mutationRoot.fields.forEach(field => {
    const mutationType = getMutationType(mutationRoot.field)

    const fragmentName = `${field.name}_${field.type.name}`

    if(mutationType.operation === 'insert') mutationQueries = [...mutationQueries, buildInsertMutation(field, mutationType, fragmentName)]
    if(mutationType.operation === 'update') mutationQueries = [...mutationQueries, buildUpdateMutation(field, mutationType, fragmentName)]
    if(mutationType.operation === 'delete') mutationQueries = [...mutationQueries, buildDeleteMutation(field, mutationType, fragmentName)]
  })

  return mutationQueries.join('\n\n')

}

function buildDeleteMutation(field: Field, mutationType: Mutation, fragmentName: string): string {
  if (mutationType.type === 'delete_many') return `mutation ${field.name} {\n  ${field.name}(where : $where) {\n    ...${fragmentName}}\n}`
  return `mutation ${field.name} {\n  ${field.name}(id: $id) {\n    ...${fragmentName}}/n}`
}

function buildInsertMutation(field: Field, mutationType: Mutation, fragmentName: string): string {
  if(mutationType.type === 'insert_many') return `mutation ${field.name} {\n  ${field.name}(objects: $objects) {\n    ...${fragmentName}}\n}`
  return `mutation ${field.name} {\n ${field.name}(object: $object) {\n    ...${fragmentName}}\n}`
}

function buildUpdateMutation(field: Field, mutationType: Mutation, fragmentName: string): string {
  if(mutationType.type === 'update_many') return `mutation ${field.name} {\n  ${field.name}(where: $where, _set: $_set) {\n    ...${fragmentName}}\n}`
  return `mutation ${field.name} {\n  ${field.name}(pk_columns: $pk_columns, _set: $_set) {\n    ...${fragmentName}}\n}`
}

function buildFragmentsQuery(entities: Entity[]): string {
  let fragmentsStrings: string[] = []

  entities.forEach(entity => {
    const newFragmentString = `fragment ${entity.queryName}_${entity.entityName} on ${entity.entityName} {\n  ${entity.fields.join('\n  ')}\n}`

    fragmentsStrings = [...fragmentsStrings, newFragmentString]
  })

  return fragmentsStrings.join('\n\n')
}

function buildGraphqlQuery(queries: string[]) {
  queries = queries.filter(query => query != '')

  return `${queries.join('\n\n')}`
}


