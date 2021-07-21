import { generateGraphqlQueries } from '../src/generate/generateGraphqlQueries'
import * as scenarios from './testScenarios'

describe("Generate graphql queries", () => {
  test("Introspection with single entity with arguments", () => {
    expect(generateGraphqlQueries(scenarios.simpleOptionalArgumentInput, '')).toEqual(scenarios.simpleOptionalArgumentOutput)
  })

  /*test.only("Introspection with multiple entities with arguments", () => {
    expect(generateGraphqlQueries(scenarios.multipleOptionalArgumentsInput, '', 'hasura')).toEqual(scenarios.multipleOptionalArgumentsOutput)
  })
  TODO orderovanie
  */ 

  test("Delete by id mandatory", () => {
    expect(generateGraphqlQueries(scenarios.deleteByIdInput, '')).toEqual(scenarios.deleteByIdOutput)
  })

  test("Delete by fields + affected rows", () => {
    expect(generateGraphqlQueries(scenarios.deleteByFieldsInput, '')).toEqual(scenarios.deleteByFieldsOutput)
  })

  test("Insert one/multiple objects mutations + affected rows", () => {
    expect(generateGraphqlQueries(scenarios.insertMutationsInput, '')).toEqual(scenarios.insertMutationsOutput)
  })

  test("Update one/multiple objects mutations + affected rows", () => {
    expect(generateGraphqlQueries(scenarios.updateMutationsInput, '')).toEqual(scenarios.updateMutationsOutput)
  })

  test("Delete one/multiple objects mutations + affected rows", () => {
    expect(generateGraphqlQueries(scenarios.deleteMutationsInput, '')).toEqual(scenarios.deleteMutationsOutput)
  })

  test("Mutation with returning fields", () => {
    expect(generateGraphqlQueries(scenarios.mutationWithReturningInput, '')).toEqual(scenarios.mutationWithReturningOutput)
  })
})