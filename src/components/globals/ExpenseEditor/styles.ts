// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    background: ${theme.palette.background.default};
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
  selectItem: {
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
  },
  categoryIcon: css`
    display: block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 4px;
  `,
})
