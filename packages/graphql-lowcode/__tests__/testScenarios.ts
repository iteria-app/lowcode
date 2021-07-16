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
 * Introspection with optional single argument
 */

export const simpleOptionalArgumentInput = {
  queryType: {
    name: 'query_root'
  },
  types: [
    {
      name: 'query_root',
      fields: [
        {
          args: [
            {
              name: 'where',
              type: {
                name: 'whereObject',
                kind: 'INPUT_OBJECT',
                ofType: null
              }
            },
            {
              name: 'limit',
              type: {
                name: 'Int',
                kind: 'SCALAR',
                ofType: null
              }
            }
          ],
          name: 'entity1s',
          type: {
            name: 'entity1',
            kind: 'OBJECT',
            ofType: null
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
            kind: 'SCALAR',
            ofType: null
          }
        },
      ]
    },
  ]
}

export const simpleOptionalArgumentOutput =
  `query entity1s($where: whereObject, $limit: Int) {
  entity1s(where: $where, limit: $limit) {
    ...entity1s_entity1
  }
}

fragment entity1s_entity1 on entity1 {
  id
}`

/**
 * Introspection with optional single argument
 */

export const multipleOptionalArgumentsInput = {
  queryType: {
    name: 'query_root'
  },
  types: [
    {
      name: 'query_root',
      fields: [
        {
          args: [
            {
              name: 'where',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'whereObject',
                ofType: null
              }
            },
            {
              name: 'limit',
              type: {
                kind: 'SCALAR',
                name: 'Int',
                ofType: null
              }
            }
          ],
          name: 'entity1s',
          type: {
            name: null,
            kind: 'LIST',
            ofType: {
              kind: 'OBJECT',
              name: 'entity1',
              ofType: null
            }
          }
        },
        {
          args: [
            {
              name: 'order_by',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'order_by_object',
                ofType: null
              }
            },
            {
              name: 'offset',
              type: {
                kind: 'SCALAR',
                name: 'Int',
                ofType: null
              }
            }
          ],
          name: 'entity2s',
          type: {
            name: 'entity2',
            kind: 'OBJECT',
            ofType: null
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
            kind: 'SCALAR',
            ofType: null
          }
        },
      ]
    },
    {
      name: 'entity2',
      fields: [
        {
          name: 'id',
          type: {
            name: 'uuid',
            kind: 'SCALAR',
            ofType: null
          }
        }
      ]
    }
  ]
}

export const multipleOptionalArgumentsOutput =
  `query entity1s($where: whereObject, $limit: Int = 100, $offset: Int) {
  entity1s(where: $where) {
    ...entity1s_entity1
  }
}

query entity2s {
  entity2s {
    ...entity2s_entity2
  }
}

fragment entity1s_entity1 on entity1 {
  id
}

fragment entity2s_entity2 on entity2 {
  id
}`

/**
 * Delete by id mutation
 */

export const deleteByIdInput = {
  mutationType: {
    name: 'mutation_root'
  },
  types: [
    {
      name: 'mutation_root',
      fields: [
        {
          args: [
            {
              name: 'id',
              type: {
                kind: 'NON_NULL',
                name: null,
                ofType: {
                  name: 'Int',
                  kind: 'uuid',
                  ofType: null
                }
              }
            }
          ],
          name: 'delete_table_by_pk',
          type: {
            kind: 'OBJECT',
            name: 'entity',
            ofType: null
          }
        }
      ]
    },
    {
      name: 'entity',
      fields: [
        {
          name: 'id',
          type: {
            name: 'uuid',
            kind: 'SCALAR',
            ofType: null
          }
        },
        {
          name: 'name',
          type: {
            name: 'string',
            kind: 'SCALAR',
            ofType: null
          }
        }
      ]
    }
  ]
}

export const deleteByIdOutput =
  `mutation delete_table_by_pk($id: Int!) {
  delete_table_by_pk(id: $id) {
    ...delete_table_by_pk_entity
  }
}

fragment delete_table_by_pk_entity on entity {
  id
  name
}`

/**
 * Delete objects based on their fields + affected_rows
 */

export const deleteByFieldsInput = {
  mutationType: {
    name: 'mutation_root'
  },
  types: [
    {
      name: 'mutation_root',
      fields: [
        {
          args: [
            {
              name: 'where',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'whereObject',
                ofType: null
              }
            }
          ],
          name: 'delete_object',
          type: {
            kind: 'OBJECT',
            name: 'entity',
            ofType: null
          }
        }
      ]
    },
    {
      name: 'entity',
      fields: [
        {
          name: 'affected_rows',
          type: {
            name: 'Int',
            kind: 'SCALAR',
            ofType: null
          }
        }
      ]
    }
  ]
}

export const deleteByFieldsOutput =
  `mutation delete_object($where: whereObject) {
  delete_object(where: $where) {
    ...delete_object_entity
  }
}

fragment delete_object_entity on entity {
  affected_rows
}`

/**
 * Single object insert mutation + multiple object insert mutation + affected_rows
 */

export const insertMutationsInput = {
  mutationType: {
    name: 'mutation_root'
  },
  types: [
    {
      name: 'mutation_root',
      fields: [
        {
          args: [
            {
              name: 'object',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'newObject',
                ofType: null
              }
            }
          ],
          name: 'insert_object',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'insert_response',
            ofType: null
          }
        },
        {
          args: [
            {
              name: 'objects',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'newObjects',
                ofType: null
              }
            }
          ],
          name: 'insert_objects',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'insert_response',
            ofType: null
          }
        }
      ]
    },
    {
      name: 'insert_response',
      fields: [
        {
          name: 'affected_rows',
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          }
        }
      ]
    }
  ]
}

export const insertMutationsOutput =
  `mutation insert_object($object: newObject) {
  insert_object(object: $object) {
    ...insert_object_insert_response
  }
}

mutation insert_objects($objects: newObjects) {
  insert_objects(objects: $objects) {
    ...insert_objects_insert_response
  }
}

fragment insert_object_insert_response on insert_response {
  affected_rows
}

fragment insert_objects_insert_response on insert_response {
  affected_rows
}`

/**
 * Single object update mutation + multiple object update mutation + affected_rows
 */

export const updateMutationsInput = {
  mutationType: {
    name: 'mutation_root'
  },
  types: [
    {
      name: 'mutation_root',
      fields: [
        {
          args: [
            {
              name: 'where',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'whereObjects',
                ofType: null,
              }
            },
            {
              name: '_set',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'updatedObjects',
                ofType: null,
              }
            }
          ],
          name: 'update_objects',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'update_response',
            ofType: null
          }
        },
        {
          args: [
            {
              name: 'pk_columns',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'pk_columns_input',
                ofType: null
              }
            },
            {
              name: '_set',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'updatedObject',
                ofType: null
              }
            }
          ],
          name: 'update_object',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'update_response',
            ofType: null
          }
        }
      ]
    },
    {
      name: 'update_response',
      fields: [
        {
          name: 'affected_rows',
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          }
        }
      ]
    }
  ]
}

export const updateMutationsOutput =
  `mutation update_objects($where: whereObjects, $_set: updatedObjects) {
  update_objects(where: $where, _set: $_set) {
    ...update_objects_update_response
  }
}

mutation update_object($pk_columns: pk_columns_input, $_set: updatedObject) {
  update_object(pk_columns: $pk_columns, _set: $_set) {
    ...update_object_update_response
  }
}

fragment update_objects_update_response on update_response {
  affected_rows
}

fragment update_object_update_response on update_response {
  affected_rows
}`

/**
 * Single delete update mutation + multiple object delete mutation + affected_rows
 */

export const deleteMutationsInput = {
  mutationType: {
    name: 'mutation_root'
  },
  types: [
    {
      name: 'mutation_root',
      fields: [
        {
          args: [
            {
              name: 'where',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'objectsToBeDeleted',
                ofType: null
              }
            },
          ],
          name: 'delete_objects',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'delete_response',
            ofType: null
          }
        },
        {
          args: [
            {
              name: 'id',
              type: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "SCALAR",
                  name: "uuid",
                  ofType: null
                }
              }
            },
          ],
          name: 'delete_object',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'delete_response',
            ofType: null,
          }
        }
      ]
    },
    {
      name: 'delete_response',
      fields: [
        {
          name: 'affected_rows',
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          }
        }
      ]
    }
  ]
}

export const deleteMutationsOutput =
  `mutation delete_objects($where: objectsToBeDeleted) {
  delete_objects(where: $where) {
    ...delete_objects_delete_response
  }
}

mutation delete_object($id: uuid!) {
  delete_object(id: $id) {
    ...delete_object_delete_response
  }
}

fragment delete_objects_delete_response on delete_response {
  affected_rows
}

fragment delete_object_delete_response on delete_response {
  affected_rows
}`

/**
 * Single delete update mutation + multiple object delete mutation + affected_rows
 */

export const mutationWithReturningInput = {
  mutationType: {
    name: "mutation_root"
  },
  types: [
    {
      name: 'mutation_root',
      fields: [
        {
          args: [
            {
              name: 'where',
              type: {
                kind: 'INPUT_OBJECT',
                name: 'objectToBeDeleted',
                ofType: null
              }
            },
          ],
          name: 'delete_objects',
          type: {
            kind: 'INPUT_OBJECT',
            name: 'delete_response',
            ofType: null
          }
        }
      ]
    },
    {
      name: 'delete_response',
      fields: [
        {
          name: 'affected_rows',
          type: {
            kind: 'SCALAR',
            name: 'Int',
            ofType: null
          }
        },
        {
          name: 'returning',
          type: {
            kind: "NON_NULL",
            name: null,
            ofType: {
              kind: "LIST",
              name: null,
              ofType: {
                kind: "NON_NULL",
                name: null,
                ofType: {
                  kind: "OBJECT",
                  name: "deleted_object",
                  ofType: null
                }
              }
            }
          },
        }
      ]
    },
    {
      name: 'deleted_object',
      fields: [
        {
          name: 'id',
          type: {
            name: 'uuid',
            kind: 'SCALAR',
            ofType: null
          }
        },
        {
          name: 'name',
          type: {
            name: 'string',
            kind: 'SCALAR',
            ofType: null
          }
        }
      ]
    }
  ]
}

export const mutationWithReturningOutput =
  `mutation delete_objects($where: objectToBeDeleted) {
  delete_objects(where: $where) {
    ...delete_objects_delete_response
  }
}

fragment delete_objects_delete_response on delete_response {
  affected_rows
  returning {
    id
    name
  }
}`