import { is } from './introspection'
import { generateGraphqlQueries, getRoot, getNestedOfTypeName } from './generateGraphqlQueries'
import { IntrospectionQuery, Field, TypesObject } from './types'

interface graphqlFile {
  fileName: string,
  content: string
}

generateGraphQlFiles(is.data.__schema, ['customer'])

function generateGraphQlFiles(introspection: IntrospectionQuery, names: string[]) {
  const queryRoot = getRoot(introspection.types, 'query_root')
  const mutationRoot = getRoot(introspection.types, 'mutation_root')

  let graphqlFiles: graphqlFile[] = []

  //Filtering all queries that works with entities given as parameter 'names'
  //Generating queries for each name in parameter
  //Writing queries into 'name'.graphql file
  names.forEach(name => {
    const filteredQueryRootFields = filterQueries(queryRoot.fields, introspection.types, name)
    const filteredMutationRootFields = filterQueries(mutationRoot.fields, introspection.types, name)

    //changing introspection roots fields for filteredFields
    const modifiedIntrospection = findAndChangeRootFields(introspection, filteredQueryRootFields, filteredMutationRootFields)

    const generatedQueries = generateGraphqlQueries(modifiedIntrospection)
    console.log(generatedQueries)

    graphqlFiles = [...graphqlFiles, { fileName: name, content: generatedQueries }]
  })

  return graphqlFiles
}

//Filters every root field whether it is returning the entity given in parameter
function filterQueries(rootFields: Field[], types: TypesObject[], entityName: string) {
  return rootFields.filter(field => isReturningEntity(field, types, entityName))
}

//Recursively goes through every query/mutation root fields and finds if they are returning given entity
function isReturningEntity(field: Field, allTypes: TypesObject[], entityName: string): boolean {
  const ofType = isOfType(field, entityName)
  if (ofType === true) return true
  if (ofType === 'leaf') return false

  const nestedOfTypeName = getNestedOfTypeName(field)
  allTypes = allTypes.filter(type => type.name === nestedOfTypeName)

  const nestedType = allTypes.find(type => type.name === nestedOfTypeName)
  return nestedType?.fields?.some(nestedField => isReturningEntity(nestedField, allTypes, entityName)) ? true : false
}

//Checks whether the field is of type given in parameter entity name
function isOfType(field: Field, entityName: string) {
  let actualType = field.type

  while (actualType.ofType) actualType = actualType.ofType

  if (actualType.name === entityName) return true
  if (actualType.kind === 'SCALAR') return 'leaf'
  return false
}

//Changes introspection roots fields with given fields in parameter
function findAndChangeRootFields(introspection: IntrospectionQuery, queryRootFields: Field[], mutationRootFields: Field[]) {
  for (const type of introspection.types) {
    if (type.name === 'query_root') {
      type.fields = queryRootFields
    }
    if (type.name === 'mutation_root') {
      type.fields = mutationRootFields
    }
  }

  return introspection
}