import { PageComponent } from "../react-components/react-component-helper";
export interface ComponentGenerator {
    generateComponent(): PageComponent | undefined;
}
