import { generateGraphqlQueries } from '../src/generate/generateGraphqlQueries'
import * as scenarios from './testScenarios'

describe("Generate graphql queries", () => {
  test("Simple introspection query", () => {
    expect(generateGraphqlQueries(scenarios.simpleIntrospectionInput)).toEqual(scenarios.simpleIntrospectionOutput)
  })

  test("Multiple entities in introspection query_root", () => {
    expect(generateGraphqlQueries(scenarios.multipleEntitiesInput)).toEqual(scenarios.multipleEntitiesOutput)
  })

  test("Different query_root type (OBJECT)", () => {
    expect(generateGraphqlQueries(scenarios.notListTypeIntrospectionInput)).toEqual('')
  })
})