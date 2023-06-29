// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    padding: 16px;
  `,
  headerSpace: css`
    width: 100%;
    padding-top: 112px;
  `,
  bottomSpace: css`
    width: 100%;
    padding-top: 72px;
  `,
  header: css`
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
  `,
  expensesArea: css`
    display: flex;
    flex-wrap: wrap;
    gap: 8px 0;
  `,
  goToRegiserButtonPosi: css`
    position: fixed;
    right: 16px;
    bottom: 16px;
  `,
  goToRegiserButton: css`
    width: 56px;
    height: 56px;
    background: ${theme.palette.primary.main};
    color: '#fff';
  `,
  expense: css`
    width: 100%;
  `,
})
