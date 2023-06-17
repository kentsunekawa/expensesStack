import { css } from 'styled-components'

export const base = css`
  &.MuiTypography-root {
    display: flex;
    line-height: 1.6em;
    font-size: 20px;
    & .icon {
      line-height: inherit;
      margin-right: 0.2em;
      font-size: 120%;
      & > span {
        line-height: inherit;
      }
    }
  }
`

export const size = {
  xs: css`
    font-size: 16px;
  `,
  s: css`
    font-size: 18px;
  `,
  m: css``,
  l: css`
    font-size: 22px;
  `,
  xl: css`
    font-size: 24px;
  `,
  xxl: css`
    font-size: 36px;
  `,
}

export const type = {
  pageTitle: css`
    font-size: 28px;
    &.MuiTypography-root {
      line-height: 27px;
      font-weight: 400;
      & .icon {
        color: ${({ theme }) => theme.palette.text.primary};
      }
    }
  `,
}

export const fontWeight = {
  normal: css`
    font-weight: normal;
  `,
  bold: css``,
}

export const align = {
  center: css`
    text-align: center;
    justify-content: center;
  `,
  right: css`
    text-align: right;
    justify-content: flex-end;
  `,
  left: css`
    text-align: left;
    justify-content: flex-start;
  `,
}
