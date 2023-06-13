import { Routes } from 'generouted/react-router'

import { GlobalStyle } from 'src/components/globals/GlobalStyle'
import { ThemeProvider } from 'src/components/providers/ThemeProvider'
import { ApolloProvider } from 'src/components/providers/ApolloProvider'
import { SnackbarProvider } from 'src/components/providers/SnackbarProvider'
import { ExpenseRegister } from 'src/components/globals/ExpenseRegister'

const App: React.FC = () => (
  <>
    <ApolloProvider>
      <ThemeProvider>
        <SnackbarProvider>
          <GlobalStyle />
          <ExpenseRegister />
          <Routes />
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  </>
)

export default App
