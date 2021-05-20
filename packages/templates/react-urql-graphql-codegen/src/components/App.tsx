import { useGeneratedQuery } from '../generated'
import Fetching from './Fetching'
import Error from './Error'
import ListPlaceholder from './ListPlaceholder'
import { useState } from 'react'

function App() {
  const [input, setInput] = useState("")
  const [result] = useGeneratedQuery({
    variables: { search: "%" + input + "%" }
  })

  const { fetching, error, data } = result
  if (fetching) return <Fetching />;
  if (error) return <Error error={error} />;

  const handleChange = (value: string) => {
    setInput(value)
  }

  return (
    <>
      <input
        type="text"
        onChange={(e) => handleChange(e.target.value)}
        value={input}
        autoFocus={true}
      />
      <ListPlaceholder customers={data?.customers} />
    </>
  );
}

export default App;
