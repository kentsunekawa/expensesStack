// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css``,
  goToRegiserButtonPosi: css`
    position: fixed;
    right: 16px;
    bottom: 72px;
  `,
  goToRegiserButton: css`
    width: 56px;
    height: 56px;
    background: ${theme.palette.primary.main};
    color: '#fff';
  `,
  totalDisplayArea: css`
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
  `,
})
