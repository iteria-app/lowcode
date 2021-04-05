import { defineHook } from '../codegen/generation/code-generation/hooks'

export const routingHook = defineHook('routing', 'useRoutes', 'react-router-dom')

export * from './routeHandlers'
export * from './factory'
