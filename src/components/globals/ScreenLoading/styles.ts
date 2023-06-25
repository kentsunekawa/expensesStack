// import from libraries
import { css } from 'styled-components'
import { rgba } from 'polished'

// import from this project
import { StyleBaseData } from 'src/hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    position: fixed;
    left: 0;
    top: 0;
    z-index: 1000;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${rgba(theme.palette.background.paper, 0.8)};
  `,
})
