import { Routes } from 'generouted/react-router'
import CssBaseline from '@mui/material/CssBaseline'

import { GlobalStyle } from 'src/components/globals/GlobalStyle'
import { LocalizationProvider } from 'src/components/providers/LocalizationProvider'
import { ThemeProvider } from 'src/components/providers/ThemeProvider'
import { ApolloProvider } from 'src/components/providers/ApolloProvider'
import { SnackbarProvider } from 'src/components/providers/SnackbarProvider'

const App: React.FC = () => (
  <>
    <LocalizationProvider>
      <ApolloProvider>
        <ThemeProvider>
          <CssBaseline />
          <SnackbarProvider>
            <GlobalStyle />
            <Routes />
          </SnackbarProvider>
        </ThemeProvider>
      </ApolloProvider>
    </LocalizationProvider>
  </>
)

export default App
