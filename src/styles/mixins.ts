// import from libraries
import { css } from 'styled-components'

// import from this project

import { CombinedDefaultTheme } from 'src/styles/theme'

// 共通フォント
export const baseFont = () => css`
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
`

// テキストの行の制限
export const limitTextRow = (limit = 1) => css`
  display: -webkit-box;
  overflow: hidden;
  -webkit-line-clamp: ${limit};
  -webkit-box-orient: vertical;
`

export const borderFrame = (theme: CombinedDefaultTheme) => css`
  border-radius: 8px;
  border: 1px solid ${theme.palette.grey[300]};
  overflow: hidden;
`
