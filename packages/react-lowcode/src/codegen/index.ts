import ts, { factory } from "typescript"
import { HookImport } from '../ast/hooks'
import { TagImport } from '../ast/tags'

export { insertColumn, insertFormWidget } from './insert-facade'
export { generatePages } from './pages-facade'
interface ThemeCodegen {
    providerTag(...children: ts.JsxChild[]): any
}

interface IntlCodegen {
    providerTag(...children: ts.JsxChild[]): any
}

export interface AppGenerators {
    newSourceFileContext(path: string): JsxFileContext
    theme: ThemeCodegen,
    intl: IntlCodegen,
    //authorization: AuthorizationCodegen
}

export class JsxFileContext {

    uniqueImports() {
        return []
    }
  
    useHook(hook: HookImport, ...params: []) {
        // TODO unique import
        return null
    }
  
    tag(tag: TagImport, ...children: ts.JsxChild[]) {
        // TODO unique import
        return null
    }
  
    returnFragment(...children: ts.JsxChild[]): ts.Statement | null {
  
        if (children?.length == 1) {
            // TODO handle one child
        }
    
        factory.createReturnStatement(factory.createJsxFragment(
            factory.createJsxOpeningFragment(),
            children,
            factory.createJsxJsxClosingFragment()
          ))
    
        return null
    }
}  
