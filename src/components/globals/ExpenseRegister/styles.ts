// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    position: fixed;
    left: 0;
    top: 0;
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    background: ${theme.palette.background.default};
    overflow-y: scroll;
  `,
  inner: css`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px;
  `,
  row: {
    container: css`
      width: 100%;
      display: flex;
      gap: 0 8px;
    `,
    cell: css`
      width: calc(50% - 4px);
    `,
  },
  numButtonArea: {
    container: css`
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row-reverse;
      gap: 16px 0;
      padding: 8px 0;
    `,
    cell: css`
      display: flex;
      justify-content: center;
      align-items: center;
      width: 33.3333%;
    `,
    inner: css`
      width: 60%;
    `,
  },
  numDisplayArea: {
    containre: css`
      width: 100%;
      display: flex;
      gap: 0 8px;
      justify-content: space-between;
      align-items: center;
    `,
    numDisplay: css`
      width: calc(100% - 48px);
      padding: 0 8px;
    `,
  },
  submitButton: css`
    height: 56px;
  `,
})
