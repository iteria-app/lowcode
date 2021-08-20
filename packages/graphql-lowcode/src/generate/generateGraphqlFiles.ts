import { generateGraphqlQueries, getNestedOfType } from './generateGraphqlQueries'
import { getRootNames, getRoots } from './roots/roots'
import { IntrospectionQuery, Field, TypesObject, Root } from './types'

/**
 * 
 * @param introspection Introspection JSON `data.__schema`
 * @param name Entity name
 * @param target GraphQL server name that queries are built for
 * @returns 
 */

export function generateGraphqlFile(introspection: IntrospectionQuery, names: string[]): { queries: string, entityName: string }[] {
  const rootNames = getRootNames(introspection)

  const roots = getRoots(introspection.types, rootNames)

  let usedQueryNames: string[] = []

  const generatedQueries = names.map(name => {
    const modifiedRoots = filterRootQueries(roots, introspection.types, name, usedQueryNames)

    //adds each modifiedRoot field name to userQueryNames to prevent duplicity
    modifiedRoots.forEach(modifiedRoot =>
      modifiedRoot?.fields.forEach(field => usedQueryNames = [...usedQueryNames, field.name]))

    const modifiedIntrospection = replaceRootFields(modifiedRoots, introspection)

    return { queries: generateGraphqlQueries(modifiedIntrospection, name), entityName: name }
  })

  return generatedQueries
}

function replaceRootFields(roots: (Root | undefined)[], introspection: IntrospectionQuery): IntrospectionQuery {
  //cloning a object, because we only want his values
  const modifiedIntrospection: IntrospectionQuery = JSON.parse(JSON.stringify(introspection))

  roots.forEach(root => {
    if(root) {
      const modifiedType = modifiedIntrospection.types.find(type => type.name === root.name)
      if(modifiedType) modifiedType.fields = [...root.fields]
    }
  })

  return modifiedIntrospection
}

/**
 * 
 * @param roots Query, Mutation, Subscription root nodes
 * @param types Introspection JSON `data.__schema.types`
 * @param entityName Name of filtered entity
 * @returns Filtered roots
 */

function filterRootQueries(roots: (Root | undefined)[], types: TypesObject[], entityName: string, usedQueryNames: string[]): (Root | undefined)[] {
  const modifiedRoots = roots.map(root => {
    if (root) {
      const modifiedRoot = { ...root }
      modifiedRoot.fields = modifiedRoot.fields.filter(field => isReturningEntity(field, types, entityName) && !usedQueryNames.includes(field.name))
      return modifiedRoot
    }
    return root
  })

  return modifiedRoots
}

/**
 * Recursively goes through every query/mutation root fields and finds if they are returning given entity
 * @param field Root field
 * @param allTypes Types object from Introspection
 * @param entityName Name of entity 
 * @returns True/false whether field is returning given entity
 */

function isReturningEntity(field: Field, allTypes: TypesObject[], entityName: string): boolean {
  const ofType = isOfType(field, entityName)
  if (ofType === true) return true
  if (ofType === 'leaf') return false

  const nestedOfTypeName = getNestedOfType(field).name
  allTypes = allTypes.filter(type => type.name === nestedOfTypeName)

  const nestedType = allTypes.find(type => type.name === nestedOfTypeName)
  return nestedType?.fields?.some(nestedField => isReturningEntity(nestedField, allTypes, entityName)) ? true : false
}

/**
 * Checks whether the field is of type given in parameter entity name
 * @returns True/false whether field is of given type
 */

function isOfType(field: Field, entityName: string) {
  let actualType = field.type

  while (actualType.ofType) actualType = actualType.ofType

  if (actualType.name && actualType.name.toLowerCase() === entityName.toLowerCase()) return true
  if (actualType.kind === 'SCALAR') return 'leaf'
  return false
}

export function getEntity(types: TypesObject[], entityName: string) {
  return types.find(type => type.name === entityName)
}