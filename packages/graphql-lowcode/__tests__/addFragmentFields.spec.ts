import { addFragmentField } from '../src/modify/addFragmentFields'
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

  test("Different fragment type + select query", () => {
    expect(addFragmentField(scenarios.fragmentDiffSelectInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.fragmentDiffSelectInput)
  })

  test("Same fragment type + select query", () => {
    expect(addFragmentField(scenarios.fragmentSelectInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.fragmentSelectOutput)
  })

  test("Same fragment type with inline fields + select query", () => {
    expect(addFragmentField(scenarios.fragmentInlineFieldsInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.fragmentInlineFieldsOutput)
  })

  test("Fragment already contains property", () => {
    expect(addFragmentField(scenarios.propertyInFragmentInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.propertyInFragmentInput)
  })

  test("Property outside of a fragment", () => {
    expect(addFragmentField(scenarios.propertyOutsideOfFragmentInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.propertyOutsideOfFragmentInput)
  })

  test("Property outside + inside of a fragment", () => {
    expect(addFragmentField(scenarios.properyInsideOutsideInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.properyInsideOutsideInput)
  })

  test("Different indentation in fragments", () => {
    expect(addFragmentField(scenarios.differentIndentationInput, { entity: 'entity', property: "newProperty" })).toEqual(scenarios.differentIndentationOutput)
  })
})