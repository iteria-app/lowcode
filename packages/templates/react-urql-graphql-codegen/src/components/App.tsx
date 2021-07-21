import { useGeneratedQuery } from '../generated'
import Fetching from './Fetching'
import Error from './Error'
import ListPlaceholder from './ListPlaceholder'

export default function App() {
  const [result] = useGeneratedQuery({
    variables: {}
  })

  const { fetching, error, data } = result
  
  if (fetching) return (
    <div className="Cage">
      <Fetching />
    </div>
  );

  if (error) return (
    <div className="Cage">
      <Error error={error} />
    </div>
  );

  return (
    <div className="Cage">
      <ListPlaceholder customers={ data?.customers } />
    </div>
  );
}
