import { generateGraphqlQueries } from '../src/generate/generateGraphqlQueries'
import * as scenarios from './testScenarios'

describe("Generate graphql queries", () => {
  test("Simple introspection query", () => {
    expect(generateGraphqlQueries(scenarios.simpleIntrospectionInput)).toEqual(scenarios.simpleIntrospectionOutput)
  })
})