import React from 'react';
import internal from 'stream';
import { Customer } from '../generated';
import  SimpleCard from './Simplecard';

interface ICustomers {
  customers: Customer[] | undefined
}
const ListPlaceholder: React.FC<ICustomers> = ({ customers }) => {
  return (
    <div>
      {
        customers?.map((customer) => (
          // customer.id; customer.name
          <p key={customer.id}>{SimpleCard(customer.id, customer.name)}</p>
        ))
      }
      

    </div>
  )
}

export default ListPlaceholder
