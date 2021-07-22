import { Property } from '../entity'

export enum PropertyType {
  string,
  numeric,
  datetime,
  date,
  time,
  currency,
  navigation
}

export function getPropertyType(prop: Property) {
  switch(prop.getType().toString().toLowerCase()) {
    case 'date': return PropertyType.date
    case 'timestamptz': return PropertyType.datetime
    case 'timez': return PropertyType.time
    case 'uuid': return PropertyType.navigation
    case 'bigint' || 'int': return PropertyType.numeric
    case 'money': return PropertyType.currency
    default: return PropertyType.string
  }
}
