import { Routes } from 'generouted/react-router'
import { ThemeProvider } from '@mui/material/styles'

import { combinedDefaultTheme } from 'src/styles/theme'
import { GlobalStyle } from 'src/components/globals/GlobalStyle'

const App: React.FC = () => (
  <>
    <ThemeProvider theme={combinedDefaultTheme}>
      <GlobalStyle />
      <Routes />
    </ThemeProvider>
  </>
)

export default App
