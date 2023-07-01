import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme({
  palette: {
    primary: {
      main: '#976CFF',
    },
    mode: 'dark',
  },
})

const commonTheme = {}

export const combinedDefaultTheme = {
  ...muiTheme,
  ...commonTheme,
}

export type MuiTheme = typeof muiTheme
export type CombinedDefaultTheme = typeof combinedDefaultTheme
