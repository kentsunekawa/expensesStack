import CssBaseline from '@mui/material/CssBaseline'

import { GlobalStyle } from 'src/components/globals/GlobalStyle'
import { LocalizationProvider } from 'src/components/providers/LocalizationProvider'
import { ThemeProvider } from 'src/components/providers/ThemeProvider'
import { ApolloProvider } from 'src/components/providers/ApolloProvider'
import { SnackbarProvider } from 'src/components/providers/SnackbarProvider'
import { ScreenLoading } from 'src/components/globals/ScreenLoading'

export const AppBase: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <LocalizationProvider>
    <ApolloProvider>
      <ThemeProvider>
        <CssBaseline />
        <SnackbarProvider>
          <GlobalStyle />
          <ScreenLoading />
          {children}
        </SnackbarProvider>
      </ThemeProvider>
    </ApolloProvider>
  </LocalizationProvider>
)
