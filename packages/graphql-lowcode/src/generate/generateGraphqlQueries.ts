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

interface TypesObject {
  name: string,
  fields: Field[],
  [key: string]: any
}

interface IntrospectionQuery {
  types: TypesObject[],
  [key: string]: any
}

interface QueryRoot {
  fields: Field[],
  [key: string]: any
}

interface Entity {
  queryName: string,
  entityName: string,
  scalarFields: string[]
}

export function generateGraphqlQueries(introspection: IntrospectionQuery) {
  const types = introspection.types

  const queryRoot = getQueryRoot(types)
  //if introspection query does not have query_root of type list
  if(!queryRoot.fields.length) return ''

  const entities = getEntities(queryRoot, types)

  const fragmentsQuery = buildFragmentsQuery(entities)
  const selectQuery = buildSelectQuery(queryRoot)

  const finalQuery = buildGraphqlQuery(selectQuery, fragmentsQuery)

  return finalQuery
}

function getQueryRoot(types: TypesObject[]): QueryRoot {
  for (const typeObject of types) {
    //iterate thrugh types to find query root
    if (typeObject.name === 'query_root' && typeObject.kind === 'LIST') {
      return typeObject
    }
  }

  return { fields: [] }
}

function getEntities(queryRoot: QueryRoot, types: TypesObject[]): Entity[] {
  const queryAndEntityNames = getQueryAndEntityNames(queryRoot)

  let entities: Entity[] = []

  for (const field of queryAndEntityNames) {
    const queryName = field.name
    const entityName = field.type.name
    const scalarFields = getScalarFields(entityName, types)

    entities = [...entities, { queryName, entityName, scalarFields }]
  }

  return entities
}

function getQueryAndEntityNames(queryRoot: QueryRoot) {
  let queryAndEntityNames: any[] = []

  for (const field of queryRoot.fields) {
    queryAndEntityNames = [...queryAndEntityNames, field]
  }

  return queryAndEntityNames
}

function getScalarFields(entityName: string, types: TypesObject[]): string[] {
  let scalarFields: string[] = []

  const entityFields = getEntityFields(entityName, types)

  entityFields.forEach(field => {
    //skip non scalar fields
    if (field.type.kind === 'SCALAR') scalarFields = [...scalarFields, field.name]
  })

  return scalarFields
}

function getEntityFields(entityName: string, types: TypesObject[]): Field[] {
  const entityFields = types.find(type => type.name === entityName)

  if(entityFields) return entityFields.fields
  return []
}

function buildSelectQuery(queryRoot: QueryRoot) {
  let selectQueries: string[] = []

  for (const field of queryRoot.fields) {
    const fragmentName = `${field.name}_${field.type.name}`
    const newSelectQuery = `query ${field.name} {\n  ${field.name}(limit: 100) {\n    ...${fragmentName}\n  }\n}`

    selectQueries = [...selectQueries, newSelectQuery]
  }

  return selectQueries.join('\n\n')
}

function buildFragmentsQuery(entities: Entity[]) {
  let fragmentsStrings: string[] = []

  for (const entity of entities) {
    const newFragmentString = `fragment ${entity.queryName}_${entity.entityName} on ${entity.entityName} {\n  ${entity.scalarFields.join('\n  ')}\n}`

    fragmentsStrings = [...fragmentsStrings, newFragmentString]
  }

  return fragmentsStrings.join('\n\n')
}

function buildGraphqlQuery(selectQuery: string, fragmentQuery: string) {
  return `${selectQuery}\n\n${fragmentQuery}`
}


