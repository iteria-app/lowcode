# Public API
## Initialization
JSON options -> factory + plugins -> Dependenci Injection Context
# Design
Typesafe with templates.
Extensible by desing.
Generated code that even developers love!
Not just scaffolding but possible to add generate small code parts into a existing files (code base).

## Codegen Chaining

Generate CRUD application using bottom-up approach:
* generate from entities (possibly ERD - Entity Relation Diagrams synced with DB)
(generated typescript code from graphql queries/mutations)
* fullstack meaning: generates both frontend (React, later also Svelte) and backend (GraphQL / Hasura metadata)


We are thinging about chain of generators: 
Tables + FKs -> GraphQL API (Hasura with conventions) -> GraphQL queries -> graphql-codegen -> @iteria-app/react-lowcode/codegen

At the moment we are focusing on *@iteria-app/react-lowcode/codegen*.
### Generate Server API
inputs: 
* entities (tables)
* relations (foregn keys)

output:
* GraphQL Schema (Hasura Metadata)

### GraphQL Queries
inputs:
* GraphQL Schema
outpus:
* GraphQL Queries mutations
### graphql-codegen
Existing tool

### React Codegen
@iteria-app/react-lowcode/codegen

## Interfaces
Typesafe codegen


### EntitiyCodegen Widgets
interface EntityCodegen should be implemented by many codegen classes
* generateEntityField(widget, entity, field)

GoF Decorators:
* form binding
* authorization

### Widgets

#### Widget
Model (abstraction wraps AST)

Widget
BrowseWidget
FormWidget
interface BrowseTable extends BrowseWidget
interface DataTable extends BrowseWidget
interface BrowseList extends BrowseWidget
interfaces TextInput extends FormWidget
#### Widget Factory
Methods:
* createTextInput(variant): FormWidget
* createTextArea(variant): FormWidget
* createTable(): BrowseWidget
* createDataTable(): BrowseWidget
* ...
### Browse entities (pages)
* multiple entities
* controls GraphQL Query (maybe mutation if the widges supports CRUD)
* uses widget codegen

### Readonly Entity Detail Page
* one entity (and composite/children entities)
* controls GraphQL Query / Mutation
* uses widget codegens

## Templates
Tagged template literals are implementaion details and allows us to write human readable code.
Should be wrapped by interfaces.

## Metadata matching
Intention: Matching in WYSIWIG => apply code morph.

DOM `<input` => React Dev Tolll `<ReactComponent` => framework + variant => avialable possible code morph commands

# Code morph 
Refactoring rules for generationg new code but also for changing existing code.

## Labels / Messages

changeLabelMessageId
patchMessageTranslations


## Entitiy Fields vs. Widget

### Table/DataTable
Methods:
* generateEntityField(component, entity, field)

GoF Decorators:
* Authorization (Castle)

Uses
* CodegenContext.Localization

### Forms

Methods:
* generateEntityField(component, entity, field)

GoF Decorators:
* Binding
* Authorization (Castle)

Uses
* CodegenContext.Localization


## Navigation
* Clone menu item
* Clone route (`react-router` / filesystem based)

### Parsing & Serialization

Source Code -> AST -> Model + AST

Model + AST -> AST -> Source Code

## Serialization 
Inputs:
* Model + AST
* Naming conventions / patterns
Outputs:
* New Files / File Changes

### Patterns
#### Pattern controller component + view only component

### Saving to files
File Changes:
* Unique imports
* Modified part of a source code (source range: start character, end character)
