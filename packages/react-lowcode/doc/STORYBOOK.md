# Storybook Integration

## Motivation

Many react projects are using storbooks in open source but also for prorietary projects.

We can use:
1.storybooks as components galery for WYSIWYG editing of the code https://help.frontify.com/en/articles/3766324-storybook-integration
2.code generator can use component galery to avoid hardcoding of a specific code (conventious would help to write algorithm)

Useful Story Book features:
1.Tree menu helps to navigate
2.Knobs to parametrize templates
3.Extensibility using addons https://storybook.js.org/addons/storybook-formik/

## Conventions

In early stages of this tool we can define conventions to algoritmize code generation:
1.for attributes (label, placeholder)
2.for tree menu (forms, tables, lists)

## Autolearn

Ideas: 
1.we can autolearn which react component wraps which HTML tags
2.we can use knobs and/or Typescript/TSX types for parameter templates
