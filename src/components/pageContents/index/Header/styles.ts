// import from libraries
import { css } from 'styled-components'
import { rgba } from 'polished'

// import from this project
import { StyleBaseData } from 'src/hooks'

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 48px;
    padding: 0 16px;
    background: ${rgba(theme.palette.background.paper, 0.8)};
  `,
  moveButtonArea: css`
    width: 40px;
  `,
})
