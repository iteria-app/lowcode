const listPageTemplate = `import { useGeneratedQuery } from '../generated'
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

export default App;`

export { listPageTemplate }