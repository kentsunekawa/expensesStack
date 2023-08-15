// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

type Args = {
  color?: string
}

export const createStyles = (_: StyleBaseData, args?: Args) => ({
  container: css`
    display: flex;
    gap: 0 4px;
    align-items: center;
  `,
  icon: css`
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 4px;
    background: ${args?.color};
  `,
})
