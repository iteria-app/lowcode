import MuiDetailGenerator from "../../generation/generators/detail/mui-detail-generator";
import { getEntityProperty } from "../helper";
import { graphqlGenTs1 } from "../typeAlias.example";

describe(".create Input Element from template", () => {
    test("Input.Text", () => {
      const generator = new MuiDetailGenerator({});
      const property = getEntityProperty(graphqlGenTs1,'test2')[0];

      const result = generator.createInputElementFromTemplate(property);
      console.log(result);
    });
  });