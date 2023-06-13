import { useMemo } from 'react'

import {
  combinedDefaultTheme as theme,
  CombinedDefaultTheme,
} from 'src/styles/theme'

export type StyleBaseData = {
  theme: CombinedDefaultTheme
}

export const useStyle = <T, U>(
  createStyles: (styleBaseData: StyleBaseData, args?: T) => U,
  args?: T,
): {
  theme: CombinedDefaultTheme
  styles: U
} => ({
  theme,
  styles: useMemo(() => createStyles({ theme }, args), [args, createStyles]),
})
