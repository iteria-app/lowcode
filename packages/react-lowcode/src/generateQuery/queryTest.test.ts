import { generateNewIntrospectonQuery } from "./functions";
import { sourceFileEntity, getEntityProperty, parseGraphqlTypes } from "../codegen/tests/helper";
import { constantsFoTestingGeneratorQueries } from './scenaria'


describe("codegen queryTest", () => {
    test(".test query string", () => {
        const queryString = generateNewIntrospectonQuery(constantsFoTestingGeneratorQueries.scenario7);        
    });

    
})