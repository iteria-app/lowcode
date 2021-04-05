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

changeLabelKey
changeLabelValue

GoF Decorators:
* form binding
* authorization

## Templates
Tagged template literals allows us to write human readable code.

## Metadata matching
Matching in WYSIWIG => apply code morph.

<input => <ReactComponent => framework + variant => avialable possible commands


# Code morph 
Refactoring rules

## add/remove column

## add/remove formfield

## clone menu item
(clone route)

## Serialization 
Model (imports, controller component + view only component) + Naming conventions -> Files
