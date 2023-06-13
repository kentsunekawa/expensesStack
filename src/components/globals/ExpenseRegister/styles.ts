// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

export const createStyles = ({ theme }: StyleBaseData) => {
  return {
    container: css`
      position: fixed;
      left: 0;
      top: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1000;
    `,
  }
}
