import { factory, Type } from "typescript"

import tagFormatter from './react-components/react-intl/intl-formatted-tag'
import { Property } from './entity'
import { NumericLiteral } from "ts-morph"

interface NameGetter {
  getName(): string
}

export enum PropertyType {
  string,
  numeric,
  datetime,
  date,
  time,
  currency,
  navigation
}

export function getPropertyType(prop: Property): PropertyType {
  let propertyType = PropertyType.string;

  const propType = prop.getType()

  if (propType.isNumber() || propType.isNumberLiteral()) {
    propertyType = PropertyType.numeric;
  }

  let typeText: string = prop.getTypeText();

  if (typeText.indexOf("Scalars['date']") >= 0) {
    propertyType = PropertyType.date
  } else if (typeText.indexOf("Scalars['timestamptz']") >= 0 || typeText.indexOf("Scalars['timestampt']") >= 0) {
    propertyType = PropertyType.datetime
  } else if (typeText.indexOf("Scalars['timez']") >= 0 || typeText.indexOf("Scalars['time']") >= 0) {
    propertyType = PropertyType.time
  } else if (typeText.indexOf("Scalars['uuid']") >= 0) {
    propertyType = PropertyType.navigation
  } else if (typeText.indexOf("Scalars['bigint']") >= 0 || typeText.indexOf("Scalars['float8']") >= 0) {
    propertyType = PropertyType.numeric;
  } else if(typeText.indexOf("Scalars['money']") >= 0){
    propertyType = PropertyType.currency;
  }
 
  return propertyType;
}
