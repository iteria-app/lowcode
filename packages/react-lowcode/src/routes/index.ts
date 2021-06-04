import * as hooks from '../codegen/ast/hooks'

export const routingHook = hooks.defineHook('routing', 'useRoutes', 'react-router-dom')

export * from './routeHandlers'
export * from './factory'
