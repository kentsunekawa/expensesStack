import { ThemeProvider as Provider } from '@mui/material/styles'

import { combinedDefaultTheme } from 'src/styles/theme'

type Props = {
  children: React.ReactNode
}

export const ThemeProvider: React.FC<Props> = ({ children }) => (
  <Provider theme={combinedDefaultTheme}>{children}</Provider>
)
