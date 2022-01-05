import { PropertyType } from "../../generation/graphql/typeAlias";
import { inputTemplate } from "./inputsTemplate";
export const inputsMetadata = {
    templatePropertyType: {
        [PropertyType.string]: 'StringInputTemplate',
        [PropertyType.datetime]: 'DateTimeInputTemplate'
    },
    template: inputTemplate
};
