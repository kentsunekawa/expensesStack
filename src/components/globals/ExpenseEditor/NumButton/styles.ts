// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    position: relative;
    width: 100%;
    border: 2px solid ${theme.palette.primary.main};
    border-radius: 50%;
    &:before {
      content: '';
      display: block;
      padding-top: 100%;
    }
    &:active {
      opacity: 0.3;
    }
  `,
  text: css`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${theme.palette.primary.main};
    font-weight: 500;
  `,
  notNumberContainer: css`
    border: 2px solid ${theme.palette.primary.dark};
  `,
  notNumberText: css`
    color: ${theme.palette.primary.dark};
  `,
})
