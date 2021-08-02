import { sourceFileEntity, getEntityProperty, parseGraphqlTypes, getEntityPropertyIntrospection } from "../helper";
import { graphqlGenTs1 } from "../typeAlias.example";
import { deleteColumn, insertColumn, insertColumnToBasicTableGrommet, insertColumnToBasicTableMui, insertColumnToDataTableGrommet, insertFormWidget } from "../../facade/facadeApi";
import { CodegenRw } from "../../io/codegenRw";
import { SourceLineCol } from "../../../ast";
import { FacadeInsertOptions } from "../../facade/interfaces";
import { TestListHelper } from "../list/list-helper";
import { is2 } from "../introspection-example"
import { Property } from "../../generation/entity";

describe("codegen facade tests", () => {
  describe(".add column", () => {
    describe("UiFramework.MaterialUI", () => {
      describe("TableType.BasicTable", () => {
        test("with (Formatter.None) (undefined position)", async() => {
          const myClassFile = parseGraphqlTypes(graphqlGenTs1);
          const testEntity = sourceFileEntity(myClassFile);
          const entityName = testEntity?.getName().toLowerCase();
      
          const tablePosition: SourceLineCol = {
            lineNumber: 14, 
            columnNumber: 11, 
            fileName: 'src/codegen/tests/facade/files/mui/basic-table/none/add-column.txt'
          };
      
          const options: FacadeInsertOptions = {
            entity: testEntity!!, 
            entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0]
          };
      
          const result = await insertColumnToBasicTableMui(tablePosition, options, new CodegenRw());
          const headercolumnValues = TestListHelper.getMuiBasicTableHeaderColumnValues(result);
          const bodycolumnValues = TestListHelper.getMuiBasicTableBodyColumnValues(result);
      
          expect(headercolumnValues).toStrictEqual([
            'avatarUrl',
            'createdAt',
            'email',
            'id',
            'name',
            'phone',
            'updatedAt',
            'testdate'
          ]);
      
          expect(bodycolumnValues).toStrictEqual([
            `${entityName}.avatarUrl`,
            `${entityName}.createdAt`,
            `${entityName}.email`,
            `${entityName}.id`,
            `${entityName}.name`,
            `${entityName}.phone`,
            `${entityName}.updatedAt`,
            `${entityName}.testdate`
          ]);
        });   
      
        test("with (Formatter.None) (defined position)", async() => {
          const myClassFile = parseGraphqlTypes(graphqlGenTs1);
          const testEntity = sourceFileEntity(myClassFile);
          const entityName = testEntity?.getName().toLowerCase();
      
          const tablePosition: SourceLineCol = {
            lineNumber: 14, 
            columnNumber: 11, 
            fileName: 'src/codegen/tests/facade/files/mui/basic-table/none/add-column.txt'
          };
      
          const options: FacadeInsertOptions = {
            entity: testEntity!!, 
            entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], 
            index: 1
          };
      
          const result = await insertColumnToBasicTableMui(tablePosition, options, new CodegenRw());
          const headercolumnValues = TestListHelper.getMuiBasicTableHeaderColumnValues(result);
          const bodycolumnValues = TestListHelper.getMuiBasicTableBodyColumnValues(result);
      
          expect(headercolumnValues).toStrictEqual([
            'testdate',
            'avatarUrl',
            'createdAt',
            'email',
            'id',
            'name',
            'phone',
            'updatedAt'
          ]);
      
          expect(bodycolumnValues).toStrictEqual([
            `${entityName}.testdate`,
            `${entityName}.avatarUrl`,
            `${entityName}.createdAt`,
            `${entityName}.email`,
            `${entityName}.id`,
            `${entityName}.name`,
            `${entityName}.phone`,
            `${entityName}.updatedAt`
          ]);
        });   
      
        test("with (Formatter.ReactIntl) (undefined position)", async() => {
          const myClassFile = parseGraphqlTypes(graphqlGenTs1);
          const testEntity = sourceFileEntity(myClassFile);
          const entityName = testEntity?.getName().toLowerCase();

          const tablePosition: SourceLineCol = {
            lineNumber: 14, 
            columnNumber: 11, 
            fileName: 'src/codegen/tests/facade/files/mui/basic-table/react-intl/add-column.txt'
          };
          const options: FacadeInsertOptions = {
            entity: testEntity!!, 
            entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], 
          };
      
          const result = await insertColumnToBasicTableMui(tablePosition, options, new CodegenRw());

          const headercolumnValues = TestListHelper.getMuiBasicTableHeaderColumnValues(result);
          const bodycolumnValues = TestListHelper.getMuiBasicTableBodyColumnValues(result);

          // TODO:PC: Customize: getMuiBasicTableBodyColumnValues for Formatter.ReactIntl
          // expect(headercolumnValues).toStrictEqual([
          //   'avatarUrl',
          //   'createdAt',
          //   'email',
          //   'id',
          //   'name',
          //   'phone',
          //   'updatedAt',
          //   'testdate'
          // ]);
      
          // expect(bodycolumnValues).toStrictEqual([
          //   `${entityName}.avatarUrl`,
          //   `${entityName}.createdAt`,
          //   `${entityName}.email`,
          //   `${entityName}.id`,
          //   `${entityName}.name`,
          //   `${entityName}.phone`,
          //   `${entityName}.updatedAt`,
          //   `${entityName}.testdate`
          // ]);
        });   
      
        test("with (Formatter.ReactIntl) (defined position)", () => {
          const myClassFile = parseGraphqlTypes(graphqlGenTs1)
          const testEntity = sourceFileEntity(myClassFile)
          const tablePosition: SourceLineCol = {
            lineNumber: 14, 
            columnNumber: 11, 
            fileName: 'src/codegen/tests/facade/files/mui/basic-table/react-intl/add-column.txt'
          };
          const options: FacadeInsertOptions = {
            entity: testEntity!!, 
            entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], 
            index: 2
          };
      
          insertColumnToBasicTableMui(tablePosition, options, new CodegenRw()).then(
            (data) => console.log(data)
          )
        });  
      });

      describe("TableType.DataTable", () => {
        test(".add column (UiFramework.MaterialUI) (TableType.DataTable) (Formatter.None) (undefined position)", async () => {
          // TODO:PC: implement!!
        });
      
        test(".add column (UiFramework.MaterialUI) (TableType.DataTable) (Formatter.None) (defined position)", async () => {
          // TODO:PC: implement!!
        });
      
        test(".add column (UiFramework.MaterialUI) (TableType.DataTable) (Formatter.ReactIntl) (undefined position)", async () => {
          // TODO:PC: implement!!
        });
      
        test(".add column (UiFramework.MaterialUI) (TableType.DataTable) (Formatter.ReactIntl) (defined position)", async () => {
          const tablePosition: SourceLineCol = {
            lineNumber: 10,
            columnNumber: 61,
            fileName: 'src/codegen/tests/facade/files/mui/data-table/react-intl/add-column.txt'
          };

          const property: Property | undefined = getEntityPropertyIntrospection(is2.data.__schema, 'testdate')

          const options: FacadeInsertOptions = {
            entityField: property!,
            index: 1
          };
      
          // TODO:PC: in result is: <FormattedMessage id=".testdate" defaultMessage="testdate"/> 
          // id should be: customer.testdate (missing entity or entityName!!!)
          // need to create a test for check this
          const result = await insertColumn(tablePosition, options, new CodegenRw());
          const position = TestListHelper.getMuiDataTablePosition(result);
          const columnNames = TestListHelper.getMuiDataTableColumnNames(result, position);
      
          // TODO:PC: Index setting doesn't seem to be taken into account (column always inserted at the end)
          expect(columnNames).toStrictEqual([
            'testdate',
            'id',
            'name',
            'createdAt',
            'email'
          ]);
        });
      });
    });
  });

    test(".delete column from existing table", () => {
      deleteColumn({lineNumber: 15,columnNumber: 73, fileName: 'src/codegen/tests/list/list-test-file.txt'}, { index:5 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });

    test(".add widget to existing detail page", async () => {
      const myClassFile = parseGraphqlTypes(graphqlGenTs1);
      const testEntity = sourceFileEntity(myClassFile);

      const formPosition: SourceLineCol = {
        lineNumber: 50,
        columnNumber: 19, 
        fileName: 'src/codegen/tests/detail/detail-test-file.txt'
      };

      const options: FacadeInsertOptions = {
        entity: testEntity!!, 
        entityField: getEntityProperty(graphqlGenTs1,'test2')[0]
      };

      const result = await insertFormWidget(formPosition, options, new CodegenRw());
      console.log(result);
    });

    test(".add widget at position to existing detail page", () => {
      insertFormWidget({lineNumber: 50,columnNumber: 19, fileName: 'src/codegen/tests/detail/detail-test-file.txt'}, {entityField: getEntityProperty(graphqlGenTs1,'test2')[0], index:3}, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });

    test(".add column to existing data table (Grommet)", () => {
      // This test without formating not works!!!
      insertColumnToDataTableGrommet({lineNumber: 13, columnNumber: 17, fileName: 'src/codegen/tests/list/files/data-table-grommet-test-file.txt'}, { entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });

    test(".add column to existing data table with formatter (Grommet)", () => {
      insertColumnToDataTableGrommet({lineNumber: 13, columnNumber: 17, fileName: 'src/codegen/tests/list/files/data-table-grommet-with-formatter-test-file.txt'}, { entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });

    test(".add column to existing basic table (Grommet)", () => {
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)
      
      insertColumnToBasicTableGrommet({lineNumber: 18, columnNumber: 11, fileName: 'src/codegen/tests/list/files/basic-table-grommet-test-file.txt'}, {entity: testEntity!!, entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });  

    test(".add column to existing basic table with formatter (Grommet)", () => {
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)
      
      insertColumnToBasicTableGrommet({lineNumber: 14, columnNumber: 11, fileName: 'src/codegen/tests/list/files/basic-table-grommet-with-formatter-test-file.txt'}, {entity: testEntity!!, entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });  
    
    test(".add column to existing basic table with formatter (Grommet) without self closing tag FormattedMessage", () => {
      const myClassFile = parseGraphqlTypes(graphqlGenTs1)
      const testEntity = sourceFileEntity(myClassFile)
      
      insertColumnToBasicTableGrommet({lineNumber: 8, columnNumber: 11, fileName: 'src/codegen/tests/list/files/basic-table-grommet-with-formatter-2-test-file.txt'}, {entity: testEntity!!, entityField: getEntityProperty(graphqlGenTs1, 'testdate')[0], index: 2 }, new CodegenRw()).then(
        (data) => console.log(data)
      )
    });  
})