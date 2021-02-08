// TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
import ts, { factory } from "typescript"

import tagFormatter from './react-intl/formatted-tag'
import { Property } from '../entity'

interface NameGetter {
  getName(): string
}

export function tagFormattedMessage(prop: NameGetter, clazz: NameGetter) {
  const typeName = clazz?.getName() ?? 'Unknown'
  const propertyName = prop?.getName() ?? 'unknown'
  return tagFormatter.message(factory.createStringLiteral(typeName + "." + propertyName))
}

export function tagFormattedProperty(prop: Property) {
  //TODO type.isNullable(), type.isUndefined(), type.isUnionOrIntersection(),
  const propertyAccess = factory.createPropertyAccessExpression(
    factory.createIdentifier('row'),//TODO pretty object name
    factory.createIdentifier(prop.getName())
  )

  const propType = prop.getType()
  if (propType.isNumber() || propType.isNumberLiteral() /*, type.getText()*/) {
    return tagFormatter.number(propertyAccess)
  }

  for (let declaration of propType?.getAliasSymbol()?.getDeclarations() ?? []) {
    const declarationText = declaration.getText()//TODO ?.replaceAll('"', "'")
    if (declarationText.indexOf("Scalars['date']") >= 0) {
      return tagFormatter.date(propertyAccess)//TODO new Date()
    } else if (declarationText.indexOf("Scalars['timestamptz']") >= 0 || declarationText.indexOf("Scalars['timestampt']") >= 0) {
      return tagFormatter.dateTime(propertyAccess)
    } else if (declarationText.indexOf("Scalars['timez']") >= 0 || declarationText.indexOf("Scalars['time']") >= 0) {
      return tagFormatter.time(propertyAccess)
    } else if (declarationText.indexOf("Scalars['uuid']") >= 0) {
      // TODO clickable chips with href/navigation to a page
    } else if (declarationText.indexOf("Scalars['bigint']") >= 0 || declarationText.indexOf("Scalars['money']") >= 0) {
      return tagFormatter.number(propertyAccess)
    }
  }

  // TODO type.isObject(), type.isUnknown(),
  // TODO disabled checkbox: type.isBoolean(), type.isBooleanLiteral(), Scalars['Boolean']
  // TODO arrays - list of chips - optionally clickable
  return [factory.createJsxExpression(undefined, propertyAccess)]
}
