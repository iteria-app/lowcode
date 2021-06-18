We use templates to make codegen human readable.

Goal: every *.tsx file can be a template (just apply reafactoring rules / code morph while generating new code).

We define some helpers functions/components like `<ListPlacholder>` that can simplify aplying refactoring rules.
This allows to define templates without dependency on a UI library for example.
