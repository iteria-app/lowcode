import { tsAst } from '../ts-tag'

import { createFunctionalComponent } from '../generation/react-components/react-component-helper'
import { routingHook } from '../../routes'
import { AppGenerators } from '..'

export function srcAppTsx(app: AppGenerators) {
    let appProps = []
    const themeProvider = app.theme.providerTag()
    const intlProvider = app.intl.providerTag()
    //TODO appProps = intlProvider.declareProps(appProps)
    
    const { tag, useHook, returnFragment, ...sourceFile } = app.newSourceFileContext('src/App.tsx')
    const appBody = [
        // TODO useHook(routingHook),
        returnFragment(
            tag(intlProvider, 
                tag(themeProvider, 
                    tsAst`{${routingHook.defaultInstanceName}}`))
        )
    ]

    const appComponent = createFunctionalComponent('App', appProps, appBody)
    return [
        //sourceFile.uniqueImports(),
        appComponent
    ]
    /*return tsAst`
        import { IntlProvider } from 'react-intl'
        import { useRoutes } from 'react-router-dom'

        import routes from './routes'

        type AppProps = {
          locale: string,
          messages: { [messageId: string]: string }
        }
        const App: React.FC<AppProps> = ({ locale, messages }) => {
            return (
              <IntlProvider locale={locale} messages={messages}>
                ${context.theme.providerJsx(routing.variableReference)}
              </IntlProvider>
            )
        }
    `*/
}

export function srcIndexJsx() {

}
