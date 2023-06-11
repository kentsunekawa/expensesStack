import { createTheme } from '@mui/material/styles'

export const muiTheme = createTheme()

const commonTheme = {}

export const combinedDefaultTheme = {
  ...muiTheme,
  ...commonTheme,
}

export type MuiTheme = typeof muiTheme
export type CombinedDefaultTheme = typeof combinedDefaultTheme
