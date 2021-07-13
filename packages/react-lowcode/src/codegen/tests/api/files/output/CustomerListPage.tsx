import { useGeneratedQuery } from '../generated';
import Fetching from './Fetching';
import Error from './Error';
import { CustomerList } from "./CustomerList";
function CustomerListPage() {
    const [result] = useGeneratedQuery({
        variables: {}
    });
    const { fetching, error, data } = result;
    if (fetching)
        return <Fetching />;
    if (error)
        return <Error error={error}/>;
    return (<CustomerList customers={data?.customers}/>);
}
export default CustomerListPage;
