// TODO https://github.com/vvakame/typescript-formatter/blob/master/lib/formatter.ts
import { Symbol, Type } from "ts-morph"
import ts, { factory } from "typescript"

import tagFormatter from '../react/react-intl/formatted-tag'

export function tagformatProperty(prop: Symbol, type: Type<ts.Type>) {
  //TODO type.isNullable(), type.isUndefined(), type.isUnionOrIntersection(),
  const propertyAccess = factory.createPropertyAccessExpression(
    factory.createIdentifier('row'),//TODO pretty object name
    factory.createIdentifier(prop.getName())
  )

  if (type.isNumber() || type.isNumberLiteral() /*, type.getText()*/) {
    return tagFormatter.number(propertyAccess)
  }

  for (let declaration of prop.getDeclarations() ?? []) {
    //console.log("typeAlias prop declaration", prop.getName(), declaration.getText())
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
