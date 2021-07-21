import React from 'react';
import { Customer } from '../generated';

interface ICustomers {
  customers: Customer[] | undefined
}
const ListPlaceholder: React.FC<ICustomers> = ({ customers }) => {
  return (
    <div>
      {
        customers?.map((customer) => (
          <p key={customer.id}>{customer.name}</p>
        ))
      }
    </div>
  )
}

export default ListPlaceholder
