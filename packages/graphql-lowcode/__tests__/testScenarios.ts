/**
 * No fragment in query
 */
export const noFragmentQuery = 
`{
  field1
  field2 {
    field3
  }
}`

/**
 * Different type query
 */

export const diffTypeQuery = 
`{
  fragment fragmentName on diffEntity {
    field1
  }
}`

/**
 * Same type + formatting
 */

export const sameTypeFormattingInput = 
`{
  fragment fragmentName on entity {
    field1
    field2
    field3 {
      field4
    }
  }

  fragment fragmentName2 on diffEntity {
    field1
  }
}`

export const sameTypeFormattingOutput =
`{
  fragment fragmentName on entity {
    field1
    field2
    field3 {
      field4
    }
    newProperty
  }

  fragment fragmentName2 on diffEntity {
    field1
  }
}`

/**
 * Same type + inline format
 */

export const sameTypeInlineInput = `{ fragment fragmentName on entity { field1 field2 field3 { field4 } } fragment fragmentName2 on diffEntity { field1 }}`

export const sameTypeInlineOutput = `{ fragment fragmentName on entity { field1 field2 field3 { field4 } newProperty } fragment fragmentName2 on diffEntity { field1 }}`

/**
 * Multiple same type fragments
 */

export const multipleSameTypeInput = 
`{
  fragment fragmentName on entity {
    field1
    field2
    field3 {
      field4
    }
  }

  fragment fragmentName2 on diffEntity {
    field1
  }

  fragment fragmentName3 on entity {
    field1
    field2
  }

  fragment fragmentName4 on entity {
    field1
  }
}`

export const multipleSameTypeOutput = 
`{
  fragment fragmentName on entity {
    field1
    field2
    field3 {
      field4
    }
    newProperty
  }

  fragment fragmentName2 on diffEntity {
    field1
  }

  fragment fragmentName3 on entity {
    field1
    field2
    newProperty
  }

  fragment fragmentName4 on entity {
    field1
    newProperty
  }
}`

/**
 * Multiple same type fragments + inline format
 */

export const multipleSameTypeInlineInput = `{ fragment fragmentName on entity { field1 } fragment fragmentName2 on diffEntity { field1 field2 } fragment fragmentName3 on entity { field1 field2 } fragment fragmentName4 on entity { field1 field2 } }`
export const multipleSameTypeInlineOutput = `{ fragment fragmentName on entity { field1 newProperty } fragment fragmentName2 on diffEntity { field1 field2 } fragment fragmentName3 on entity { field1 field2 newProperty } fragment fragmentName4 on entity { field1 field2 newProperty } }`

/**
 * Diff fragment type + select query
 */

export const fragmentDiffSelectInput = 
`{
  query x { 
    ...fragmentName
  }

  fragment fragmentName on diffEntity {
    field1
  }
}`

/**
 * Same fragment type + select query
 */

export const fragmentSelectInput = 
`{
  query x {
    ...fragmentName
  }

  fragment fragmentName on entity {
    field1
  }
}`

export const fragmentSelectOutput =
`{
  query x {
    ...fragmentName
  }

  fragment fragmentName on entity {
    field1
    newProperty
  }
}`

/**
 * Same fragment type with inline fields + select query
 */

export const fragmentInlineFieldsInput =
`{
  query x {
    ...fragmentName
  }

  fragment fragmentName on entity {
    field1 field2 field3
  }
}`

export const fragmentInlineFieldsOutput =
`{
  query x {
    ...fragmentName
  }

  fragment fragmentName on entity {
    field1 field2 field3
    newProperty
  }
}`

/**
 * Property already in fragment
 */
export const propertyInFragmentInput =
`{
  query x {
    ...fragmentName
  }

  fragment fragmentName on entity {
    field1 field2 field3
    newProperty
  }
}`

/**
 * Property outside of a fragment
 */
export const propertyOutsideOfFragmentInput =
`{
  query x {
    ...fragmentName
    newProperty
  }

  fragment fragmentName on diffEntity {
    field1
    field2
    field3
  }
}`

/**
 * Property inside + outside of a fragment
 */

export const properyInsideOutsideInput =
`{
  query x {
    ...fragmentName
    newProperty
  }

  fragment fragmentName on entity {
    field1
    field2
    field3
    newProperty
  }
}`

/**
 * Different indentation in fragments
 */

export const differentIndentationInput =
`{
  query x {
    field1
    newProperty
  }

  fragment fragmentName on entity {
    field1
    field2
  }

  fragment fragmentName on entity {
      field1
      field2
  }

  fragment fragmentName on entity {
  field1 field2
  }
}`

export const differentIndentationOutput =
`{
  query x {
    field1
    newProperty
  }

  fragment fragmentName on entity {
    field1
    field2
    newProperty
  }

  fragment fragmentName on entity {
      field1
      field2
      newProperty
  }

  fragment fragmentName on entity {
  field1 field2
  newProperty
  }
}`

/**
 * Simple introspection query
 */
export const simpleIntrospectionInput = {
  types: [
    {
      name: 'query_root',
      kind: 'LIST',
      fields: [
        {
          name: 'entity1s',
          type: {
            name: 'entity1'
          }
        }
      ]
    },
    {
      name: 'entity1',
      fields: [
        {
          name: 'id',
          type: {
            name: 'uuid',
            kind: 'SCALAR'
          }
        },
        {
          name: 'name',
          type: {
            name: 'string',
            kind: 'SCALAR'
          }
        },
        {
          name: 'objectName',
          type: {
            name: '',
            kind: 'OBJECT'
          }
        }
      ]
    }
  ]
}

export const simpleIntrospectionOutput = 
`query entity1s {
  entity1s(limit: 100) {
    ...entity1s_entity1
  }
}

fragment entity1s_entity1 on entity1 {
  id
  name
}`

/**
 *  Multiple entities in query_root
 */

export const multipleEntitiesInput = {
  types: [
    {
      name: 'query_root',
      kind: 'LIST',
      fields: [
        {
          name: 'entity1s',
          type: {
            name: 'entity1'
          }
        },
        {
          name: 'entity2s',
          type: {
            name: 'entity2'
          }
        }
      ]
    },
    {
      name: 'entity1',
      fields: [
        {
          name: 'id',
          type: {
            name: 'uuid',
            kind: 'SCALAR'
          }
        },
        {
          name: 'name',
          type: {
            name: 'string',
            kind: 'SCALAR'
          }
        },
        {
          name: 'objectName',
          type: {
            name: '',
            kind: 'OBJECT'
          }
        }
      ]
    },
    {
      name: 'entity2',
      fields: [
        {
          name: 'id',
          type: {
            name: 'uuid',
            kind: 'SCALAR'
          }
        }
      ]
    }
  ]
}

export const multipleEntitiesOutput =
`query entity1s {
  entity1s(limit: 100) {
    ...entity1s_entity1
  }
}

query entity2s {
  entity2s(limit: 100) {
    ...entity2s_entity2
  }
}

fragment entity1s_entity1 on entity1 {
  id
  name
}

fragment entity2s_entity2 on entity2 {
  id
}`

/**
 * Query_root is not LIST type query
 */

export const notListTypeIntrospectionInput = {
  types: [
    {
      name: 'query_root',
      kind: 'OBJECT',
      fields: [
        {
          name: 'entity1s',
          type: {
            name: 'entity1'
          }
        },
      ]
    },
    {
      name: 'entity1',
      fields: [
        {
          name: 'id',
          type: {
            name: 'uuid',
            kind: 'SCALAR'
          }
        },
      ]
    },
  ]
}