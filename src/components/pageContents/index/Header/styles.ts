// import from libraries
import { css } from 'styled-components'
import { rgba } from 'polished'

// import from this project
import { StyleBaseData } from 'src/hooks'

const height = 48

export const createStyles = ({ theme }: StyleBaseData) => ({
  container: css`
    position: fixed;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: ${height}px;
    padding: 0 16px;
    background: ${rgba(theme.palette.background.paper, 0.8)};
  `,
  space: css`
    width: 100%;
    padding-top: ${height}px;
  `,
  moveButtonArea: css`
    width: 40px;
  `,
})
