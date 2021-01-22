import { functionalComponent } from "../util/code"
import { astFindStart } from "./ast"
import { isInsideMapPatternFunction } from "./mapRecognition"

test("should ", () => {
  const node = astFindStart(functionalComponent, 196)

  expect(isInsideMapPatternFunction(node!)).toBeTruthy()
})
