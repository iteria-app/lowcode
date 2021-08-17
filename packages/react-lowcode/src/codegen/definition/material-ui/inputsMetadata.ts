import { PropertyType } from "../../generation/graphql/typeAlias";
import { inputTemplate, InputTemplate } from "./inputsTemplate";

export type InputsMetadata = {
    templatePropertyType: { [key: number]: string; }
    template: InputTemplate;
};

export const inputsMetadata: InputsMetadata = {
    templatePropertyType: {
        [PropertyType.string]: 'StringInputTemplate',
        [PropertyType.datetime]: 'DateTimeInputTemplate'
    },
    template: inputTemplate
};