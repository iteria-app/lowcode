import React from 'react';

interface IError {
  error: any
}
const Error: React.FC<IError> = ({ error }) => {

  return (
    <>
      {error}
    </>
  )
}

export default Error
