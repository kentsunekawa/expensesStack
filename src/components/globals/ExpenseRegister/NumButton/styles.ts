// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

export const createStyles = ({ theme }: StyleBaseData) => {
  return {
    container: css`
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      background: ${theme.palette.primary.main};
      border-radius: 50%;

      &:before {
        content: '';
        display: block;
        padding-top: 100%;
      }
    `,
  }
}
