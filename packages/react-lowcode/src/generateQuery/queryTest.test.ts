import { generateNewIntrospectonQuery } from "./functions";
import { sourceFileEntity, getEntityProperty, parseGraphqlTypes } from "../codegen/tests/helper";
import { getScenario } from './scenaria'


describe("codegen queryTest", () => {
    test(".test query string", () => {
        const queryString = generateNewIntrospectonQuery(getScenario('7'));        
    });

    
})