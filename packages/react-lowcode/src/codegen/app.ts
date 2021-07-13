import { AppGenerator } from './generation/generators/app-generator'
import { UiFramework, TableType, Formatter } from './definition/context-types'
import { CodeDir, CodeRW } from '../io'
import ts, { factory } from "typescript"
import { Property } from './generation/entity/index'
import { CodegenOptions } from './interfaces'
import TemplateResolver from './generation/generators/template/template-resolver'
import { generateGraphqlFile, getEntity } from '../../../graphql-lowcode/src/generate/generateGraphqlFiles'
import { getNestedOfType } from '../../../graphql-lowcode/src/generate/generateGraphqlQueries'
import { IntrospectionQuery } from '../../../graphql-lowcode/src/generate/types'

// generates CRUD React pages (master-detail, eg. orders list, order detail form) from typescript
export function generatePages(introspection: IntrospectionQuery, io: CodeRW & CodeDir, options?: CodegenOptions) {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  options?.names.map(name => {
    //generates graphql queries for each entity name in props
    const graphqlQueries = generateGraphqlFile(introspection, name)
    if (graphqlQueries != '') io.writeFile(`./src/views/${name}/${name}.graphql`, graphqlQueries)

    const entityType = getEntity(introspection.types, name)

    if (entityType && entityType.fields) {
      const entityName = entityType.name

      let props: Property[] = []
      entityType.fields.forEach(field => {
        const propName = field.name
        const propType = getNestedOfType(field).name ?? ''

        props = [...props, { getName: () => propName, getType: () => propType }]
      })

      const entity = {
        getName: () => entityName,
        properties: props
      }

      let context = { uiFramework: UiFramework.MaterialUI, formatter: Formatter.None, index: { tableType: TableType.BasicTable, height: "400px" } };

      const generator = new AppGenerator(context, entity)
      const page = generator.generateListComponent(/* TODO entity / type name should be input - not in context */)

      const filePath = `src/components/${name}.tsx`
      const sourceFile = ts.createSourceFile(
        filePath,
        '',
        ts.ScriptTarget.ESNext,
        true,
        ts.ScriptKind.TSX
      )

      const pageSourceCode = printer.printList(ts.ListFormat.MultiLine, factory.createNodeArray([...page!.imports, page!.functionDeclaration]), sourceFile)

      console.log(`table for ${name} was generated: ${pageSourceCode}`)
      io.writeFile(filePath, pageSourceCode)

      //generate list wrapper
      const templateResolver = new TemplateResolver(entity);
      const listWrapper = templateResolver.generateListPage(options.pageListTemplate);

      if (listWrapper) {
        const listWrapperFilePath = `src/components/${name}Page.tsx`
        const sourceFileWrapperSourceFile = ts.createSourceFile(
          listWrapperFilePath,
          listWrapper,
          ts.ScriptTarget.ESNext,
          true,
          ts.ScriptKind.TSX
        )

        // TODO:PC: Need print here? or only: io.writeFile(listWrapperFilePath, listWrapper)
        const wrapperPageSourceCode = printer.printFile(sourceFileWrapperSourceFile);

        console.log(`page for ${name} table was generated: ${wrapperPageSourceCode}`)

        io.writeFile(listWrapperFilePath, wrapperPageSourceCode)
      }
    }
  })
}