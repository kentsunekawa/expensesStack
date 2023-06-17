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
      background: ${theme.palette.background.default};
    `,

    numButtonArea: {
      container: css`
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        flex-direction: row-reverse;
      `,
      cell: css`
        width: 33.3333%;
      `,
      inner: css`
        padding: 8px 24px;
      `,
      buttonWrapper: css`
        width: 33.3333%;
      `,
    },
  }
}
