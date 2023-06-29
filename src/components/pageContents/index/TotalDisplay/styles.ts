// import from libraries
import { css } from 'styled-components'

export const createStyles = () => ({
  container: css`
    width: 100%;
    padding: 8px;
    display: flex;
    gap: 0 8px;
    height: 56px;
  `,
  categoryArea: css`
    width: calc(50% - 4px);
  `,
  togalArea: {
    container: css`
      display: flex;
      flex-wrap: wrap;
      width: calc(50% - 4px);
      justify-content: flex-end;
      align-content: flex-end;
      align-items: flex-end;
    `,
    text: css`
      width: 100%;
      padding: 0 8px;
    `,
    divider: css`
      width: 100%;
    `,
  },
})
