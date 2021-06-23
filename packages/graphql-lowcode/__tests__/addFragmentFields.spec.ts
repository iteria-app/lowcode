import { addFragmentField } from '../src/modify/addFragmentField'
import * as scenarios from './testScenarios'

describe("Add fragment field", () => {
  test("No fragment in query", () => {
    expect(addFragmentField(scenarios.noFragmentQuery, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.noFragmentQuery)
  })

  test("Fragment with different type", () => {
    expect(addFragmentField(scenarios.diffTypeQuery, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.diffTypeQuery)
  })

  test("Fragment with same type query + formatting", () => {
    expect(addFragmentField(scenarios.sameTypeFormattingInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.sameTypeFormattingOutput)
  })

  test("Fragment with same type query in inline format", () => {
    expect(addFragmentField(scenarios.sameTypeInlineInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.sameTypeInlineOutput)
  })

  test("Multiple same type fragments query", () => {
    expect(addFragmentField(scenarios.multipleSameTypeInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.multipleSameTypeOutput)
  })

  test("Multiple same type fragments query in inline format", () => {
    expect(addFragmentField(scenarios.multipleSameTypeInlineInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.multipleSameTypeInlineOutput)
  })
})