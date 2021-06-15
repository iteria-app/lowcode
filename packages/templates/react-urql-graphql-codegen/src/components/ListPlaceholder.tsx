import React from 'react';
import { Customer } from '../generated';

interface ICustomers {
  customers: Customer[] | undefined
}
const ListPlaceholder: React.FC<ICustomers> = ({ customers }) => {
  return (
    <>
      {
        customers?.map((customer) => (
          <p key={customer.id}>{customer.name}</p>
        ))
      }
    </>
  )
}

export default ListPlaceholder
