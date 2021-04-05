# How to contribute to Codegen

Write:
a. small templates using tagged template literal and wrap them behind and interface.
b. write more compilated templates using `tag()`, `returnFragment()`, `useHook()`

# Conventions
Prefer composition over integritance.

# Imports
```
import { tsAst } from "../../ts-tag"
import ts, { factory } from "typescript"
```

## Codegen Functions

### Returing File Content
Function is the same as (standard) file name:

```
export function srcIndexTsx()
export function srcIndexJsx()
export function srcAppsx()
export function srcRoutingTsx()
```

### Returning JSX AST
Function name suffix Tag corensponds to return type.

```
export function routeTag(componentID: string, path = '/'): typescript.JsxSelfClosingElement 
```
## Registering new library
### UI Framework
### Locale
### Form Bindings & validation
### Navigation
### AAA
