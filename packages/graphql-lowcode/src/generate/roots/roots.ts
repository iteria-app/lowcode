import { IntrospectionQuery, TypesObject, Root } from '../types'

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
 * @param queryRootName Query root name
 * @param mutationRootName Mutation root name
 * @param subscriptionRootName Subscription root name
 * @returns Array of root type objects `[query, mutation, subscription]`
 */

export function getRoots(
  types: TypesObject[],
  rootNames: { type: string, name?: string }[],
): (Root | undefined)[] {
  let roots: (Root | undefined)[] = []

  rootNames.forEach(root => {
    if (root.name) {
      for (const typeObject of types) {
        if (typeObject.fields && typeObject.name === root.name) {
          roots = [...roots, { fields: typeObject.fields, kind: typeObject.kind, name: root.name }]
        }
      }
    }
    else roots = [...roots, undefined]
  })

  return roots
}