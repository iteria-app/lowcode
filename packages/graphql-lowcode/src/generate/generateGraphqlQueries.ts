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

interface Fragment {
  name: string,
  queryName: string,
  entity: string,
  fields: string[]
}

interface QueryRoot {
  queryName: string,
  entityName: string
}

export function generateGraphqlQueries(introspection: IntrospectionQuery) {
  const types = introspection.types

  const queryRoot = getQueryRoot(types)
  const entityFields = getEntityFields(types, queryRoot.entityName)

  const fragmentQuery = buildFragmentQuery(entityFields, queryRoot)
  const selectQuery = buildSelectQuery(queryRoot)

  const finalQuery = buildGraphqlQuery(selectQuery, fragmentQuery)
  
  return finalQuery
}

function getQueryRoot(types: TypesObject[]): QueryRoot {
  for(const typeObject of types) {
    //iterate thrugh types to find query root
    if (typeObject.name === 'query_root') {
      const queryName = typeObject.fields[0].name ? typeObject.fields[0].name : ''
      const entityName = typeObject.fields[0].type.name ? typeObject.fields[0].type.name : ''

      return { queryName: queryName, entityName: entityName }
    }
  }

  return {queryName: '', entityName: ''}
}

function getEntityFields(types: TypesObject[], entityName: string): Field[] {
  for(const typeObject of types) {
    if(typeObject.name === entityName) return typeObject.fields
  }

  return []
}

function getScalarFields(fields: Field[]) {
  let scalarFields: string[] = []

  fields.forEach(field => {
    //skip non scalar fields
    if (field.type && field.name && field.type.kind === 'SCALAR') scalarFields = [...scalarFields, field.name]
  })

  return scalarFields
}

function buildSelectQuery(queryRoot: QueryRoot) {
  const fragmentName = `${queryRoot.queryName}_${queryRoot.entityName}`

  return `query ${queryRoot.queryName} {\n  ${queryRoot.queryName}(limit: 100) {\n    ...${fragmentName}\n  }\n}`
}

function buildFragmentQuery(entityFields: Field[], queryRoot: QueryRoot) {
  const scalarFields = getScalarFields(entityFields)

  return `fragment ${queryRoot.queryName}_${queryRoot.entityName} on ${queryRoot.entityName} {\n  ${scalarFields.join('\n  ')}\n}`
}

function buildGraphqlQuery(selectQuery: string, fragmentQuery: string) {
  return `${selectQuery}\n\n${fragmentQuery}`
}


