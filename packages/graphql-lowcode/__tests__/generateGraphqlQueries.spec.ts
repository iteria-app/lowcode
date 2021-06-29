import { generateGraphqlQueries } from '../src/generate/generateGraphqlQueries'
import * as scenarios from './testScenarios'

describe("Generate graphql queries", () => {
  test("Simple introspection query", () => {
    expect(generateGraphqlQueries(scenarios.simpleIntrospectionInput)).toEqual(scenarios.simpleIntrospectionOutput)
  })

  test("Multiple entities in introspection query_root", () => {
    expect(generateGraphqlQueries(scenarios.multipleEntitiesInput)).toEqual(scenarios.multipleEntitiesOutput)
  })

  /*test("Different query_root type (OBJECT)", () => {
    expect(generateGraphqlQueries(scenarios.notListTypeIntrospectionInput)).toEqual(scenarios.notListTypeIntrospectionOutput)
  })*/

  test("Introspection with single entity with arguments", () => {
    expect(generateGraphqlQueries(scenarios.simpleOptionalArgumentInput)).toEqual(scenarios.simpleOptionalArgumentOutput)
  })

  test("Introspection with multiple entities with arguments", () => {
    expect(generateGraphqlQueries(scenarios.multipleOptionalArgumentsInput)).toEqual(scenarios.multipleOptionalArgumentsOutput)
  })

  test("Delete by id", () => {
    expect(generateGraphqlQueries(scenarios.deleteByIdInput)).toEqual(scenarios.deleteByIdOutput)
  })

  test("Delete by fields + affected rows", () => {
    expect(generateGraphqlQueries(scenarios.deleteByFieldsInput)).toEqual(scenarios.deleteByFieldsOutput)
  })
})