import { AppTheme, MuiTheme, CombinedDefaultTheme } from 'styles/theme'
import { CSSProp } from 'styled-components'

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends CombinedDefaultTheme {}
}

declare module 'react' {
  interface Attributes {
    css?: CSSProp
  }
}
