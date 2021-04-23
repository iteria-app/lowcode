import * as hooks from '../codegen/generation/ts/hooks'

export const routingHook = hooks.defineHook('routing', 'useRoutes', 'react-router-dom')

export * from './routeHandlers'
export * from './factory'
