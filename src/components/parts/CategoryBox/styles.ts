// import from libraries
import { css } from 'styled-components'

// import from this project

export const createStyles = () => ({
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
  `,
})
