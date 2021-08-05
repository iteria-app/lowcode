import { generateCode } from "ts-factory-code-generator-generator"
import { getListPageComponentName } from "../../generation/entity/helper"
import TemplateResolver from "../../generation/generators/template/template-resolver"
import { is2 } from "../introspection-example"
import { createEntityFromIntrospection, Entity } from "../../generation/entity"

describe("TemplateResolver", () => {
    //todo:add expect also if gprahhql related stuff were generated correctly
    test("Generate page for list component", () => {
        const entity: Entity | undefined = createEntityFromIntrospection(is2.data.__schema, "Customer")
        const templateResolver = new TemplateResolver(entity!, is2.data.__schema);

        const template = `
import { useGeneratedQuery } from '../generated'
import Fetching from './Fetching'
import Error from './Error'
import ListPlaceholder from './ListPlaceholder'

function App() {
    const [result] = useGeneratedQuery({
        variables: {}
    })

    const { fetching, error, data } = result
    if (fetching) return <Fetching />;
    if (error) return <Error error={error} />;

    return (
        <ListPlaceholder customers={data?.customers} />
    );
}

export default App;
              `;

        const generatedCode = templateResolver.generateListPage(template, 'src/generated');
        console.log(`generated list page: ${generateCode}`)

        expect(generatedCode).toContain('import { CustomerList } from "./CustomerList";');
        expect(generatedCode).toContain('<CustomerList customers={data?.customers}/>');
        expect(generatedCode).toContain(`function ${getListPageComponentName(entity!)}`);
        
        expect(generatedCode).not.toContain("import ListPlaceholder from './ListPlaceholder'");
        expect(generatedCode).not.toContain("<ListPlaceholder customers={data?.customers} />");
        expect(generatedCode).not.toContain("function App()");

    });
});