import { Project, StructureKind } from "ts-morph";
import { graphqlGenTs1 } from './typeAlias.example'

test('typeAlias test 1', () => {


// initialize
const project = new Project({
    // Optionally specify compiler options, tsconfig.json, in-memory file system, and more here.
    // If you initialize with a tsconfig.json, then it will automatically populate the project
    // with the associated source files.
    // Read more: https://ts-morph.com/setup/
});



// add source files
//project.addSourceFilesAtPaths("src/**/*.ts");
const myClassFile = project.createSourceFile("src/types.ts", graphqlGenTs1);

myClassFile.addStatements()

// get information
const typeAlias = myClassFile.getTypeAlias("Parent");
if (typeAlias) {
  typeAlias.getName();          // returns: "MyClass"
  typeAlias.hasExportKeyword(); // returns: true
  typeAlias.isDefaultExport();  // returns: false
}

const props = typeAlias?.getType()?.getProperties()
props?.forEach((prop)=> {
  const t = prop.getTypeAtLocation(myClassFile)//typeAlias?.getTypeNode()
  console.log('typeAlias prop', prop.getName(), 'str', 
  
  
  t.isString(), t.isStringLiteral(), 'nullable', t.isNullable(), t.isUndefined(), t.isUnionOrIntersection(), 'num', t.isNumber(), t.isNumberLiteral()/*, t.getText()*/, 'unknown', t.isUnknown(), 'obj', t.isObject(), 'bool', t.isBoolean(), t.isBooleanLiteral(), 'args', t.getTypeArguments());
  prop.getDeclarations().forEach(dec => {
    //Maybe<Scalars['Boolean']>
    //Maybe<Scalars['date']>
    //Maybe<Scalars['timez']>
    //Scalars['bigint']
    //float8
    //timestamptz
    //Maybe<Scalars['uuid']>
    console.log('typeAlias prop declaration', 
      prop.getName(), 
      dec.getText())
  })
})



//project.getSourceFileOrThrow("src/ExistingFile.ts").delete();

// asynchronously save all the changes above
//await project.save();

// get underlying compiler node from the typescript AST from any node
//const compilerNode = myClassFile.compilerNode;

})