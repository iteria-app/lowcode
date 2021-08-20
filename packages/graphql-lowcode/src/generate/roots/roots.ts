import { IntrospectionQuery, TypesObject, Root } from '../types'
import { Field, Type } from '../types'

/**
 * @param introspection Introspection JSON `data`
 * @returns Query, mutation and subscription root names or undefined if no root is defined.
 */

export function getRootNames(introspection: IntrospectionQuery): { type: string, name?: string }[] {
  const queryTypeName = introspection.queryType?.name
  const mutationTypeName = introspection.mutationType?.name
  const subscriptionTypeName = introspection.subscriptionType?.name

  return [
    { type: 'query', name: queryTypeName },
    { type: 'mutation', name: mutationTypeName },
    { type: 'subscription', name: subscriptionTypeName }
  ]
}

/**
 * 
 * @param types Introspection JSON `data.types`
 * @returns Array of root type objects `[query, mutation, subscription]`
 */

export function getRoots(types: TypesObject[], rootNames: { type: string, name?: string }[],): (Root | undefined)[] {
  const [query, mutation, subscription] = rootNames

  const roots = types.filter(type => type.fields && rootNames.some(root => type.name === root.name)).map(filteredType => {
    return { fields: filteredType.fields ?? [], kind: filteredType.kind, name: filteredType.name }
  })

  const queryRoot = roots.find(root => root.name === query.name)
  const mutationRoot = roots.find(root => root.name === mutation.name)
  const subscriptionRoot = roots.find(root => root.name === subscription.name)

  return [queryRoot, mutationRoot, subscriptionRoot]
}

export function getQueryNames(introspection: IntrospectionQuery, entityName: string) {
  const rootNames = getRootNames(introspection)
  const [queryRoot, mutationRoot, subscriptionRoot] = getRoots(introspection.types, rootNames)

  //looks for list type query that includes entityName else picks first listTypeQuery
  const listTypeQuery = queryRoot?.fields.filter(field => 
    isListType(field)).find(field => 
      field.name.toLowerCase().indexOf(entityName) >= 0) ?? queryRoot?.fields[0]

  const detailTypeQuery = queryRoot?.fields.find(field => isObjectType(field, entityName) ?? queryRoot?.fields[0])

  //TODO update, insert etc...

  return {
    listQueryName: listTypeQuery?.name,
    detailQueryName: detailTypeQuery?.name
  }
}

function isListType(typeField: Field | Type) {
  for(typeField = typeField.type; typeField.ofType; typeField = typeField.ofType) {
    if(typeField.kind === 'LIST') return true
  }

  return false
}

function isObjectType(typeField: Field | Type, entityName: string) {
  for(typeField = typeField.type; typeField.ofType; typeField = typeField.ofType) {
    if (typeField.kind === 'OBJECT' && typeField.name === entityName) return true
    if (typeField.kind !== 'NON_NULL') return false
  }

  return false
}