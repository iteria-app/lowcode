import * as fs from 'fs';
import * as path from 'path';
import { vakintro } from './vakintro';
import { CodegenRw } from '../../../react-lowcode/src/codegen/io/codegenRw';
import { generatePages } from '../../../react-lowcode/src/codegen';
const fetch = require('node-fetch');
/*const args = yargs.options({
  'entities': { type: 'string', demandOption: true, alias: 'e' },
  'uiFramework': { type: 'string', demandOption: false, alias: 'ui' },
  'tableType': { type: 'string', demandOption: false, alias: 't' },
  'componentPath': { type: 'string', demandOption: false, alias: 'cp' },
  'generatedPath': { type: 'string', demandOption: false, alias: 'gp' },
  'routesPath': { type: 'string', demandOption: false, alias: 'rp' },
  'menuPath': { type: 'string', demandOption: false, alias: 'mp' },
}).argv

const entityNames = args['entities'].split(' ')
const uiFramework = args['uiFramework']
const tableType = args['tableType']
const componentPath = args['componentPath']
const generatedPath = args['generatedPath']
const routesPath = args['routesPath']
const menuPath = args['menuPath']

const getIntrospection = async () => {
  //TODO vytiahnut linku z env
  const response = await fetch('https://dev-vak.herokuapp.com/v1/graphql', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ query: "\n    query IntrospectionQuery {\n      __schema {\n        queryType { name }\n        mutationType { name }\n        subscriptionType { name }\n        types {\n          ...FullType\n        }\n        directives {\n          name\n          description\n          locations\n          args {\n            ...InputValue\n          }\n        }\n      }\n    }\n\n    fragment FullType on __Type {\n      kind\n      name\n      description\n      fields(includeDeprecated: true) {\n        name\n        description\n        args {\n          ...InputValue\n        }\n        type {\n          ...TypeRef\n        }\n        isDeprecated\n        deprecationReason\n      }\n      inputFields {\n        ...InputValue\n      }\n      interfaces {\n        ...TypeRef\n      }\n      enumValues(includeDeprecated: true) {\n        name\n        description\n        isDeprecated\n        deprecationReason\n      }\n      possibleTypes {\n        ...TypeRef\n      }\n    }\n\n    fragment InputValue on __InputValue {\n      name\n      description\n      type { ...TypeRef }\n      defaultValue\n    }\n\n    fragment TypeRef on __Type {\n      kind\n      name\n      ofType {\n        kind\n        name\n        ofType {\n          kind\n          name\n          ofType {\n            kind\n            name\n            ofType {\n              kind\n              name\n              ofType {\n                kind\n                name\n                ofType {\n                  kind\n                  name\n                  ofType {\n                    kind\n                    name\n                  }\n                }\n              }\n            }\n          }\n        }\n      }\n    }\n  " })
  })

  const introspection = await response.json()
  return introspection
}*/
const writer = new CodegenRw();
//TODO add option for DetailPage, etc...
const generateListPage = async () => {
    const listTemplate = fs.readFileSync(path.resolve('../react-lowcode/src/codegen/tests/list/files/page-list-template.txt'), 'utf-8');
    const detailTemplate = fs.readFileSync(path.resolve('../react-lowcode/src/codegen/tests/detail/files/detail-test-file.txt'), 'utf-8');
    const introspection = vakintro; //await getIntrospection()
    generatePages(introspection.data.__schema, writer, { names: ['smena'], pageListTemplate: listTemplate, detailPageTemplate: detailTemplate });
};
generateListPage();
