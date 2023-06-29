// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

export type Args = {
  minHeight?: string | number
}

export const createStyles = (_: StyleBaseData, args?: Args) => ({
  container: css`
    width: 100%;
    height: 100%;
    ${args?.minHeight &&
    css`
      min-height: ${typeof args.minHeight === 'string'
        ? args.minHeight
        : `${args.minHeight}px`};
    `}
    display: flex;
    justify-content: center;
    align-items: center;
  `,
})
