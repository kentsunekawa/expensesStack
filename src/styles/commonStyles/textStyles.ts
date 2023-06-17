// import from libraries
import { css } from 'styled-components'

export type HeadingSize = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
export type Size = 'small' | 'medium' | 'large'
export type Weight = 'normal' | 'bold'

export const createStyles = () => ({
  weight: {
    normal: css`
      font-weight: normal;
    `,
    bold: css`
      font-weight: bold;
    `,
  },
  heading: {
    h1: css`
      font-size: 60px;
      line-height: 1.6em;
      letter-spacing: -0.026em;
    `,
    h2: css`
      font-size: 48px;
      line-height: 1.6em;
      letter-spacing: -0.02em;
    `,
    h3: css`
      font-size: 40px;
      line-height: 1.6em;
      letter-spacing: -0.02em;
    `,
    h4: css`
      font-size: 34px;
      line-height: 1.6em;
      letter-spacing: -0.024em;
    `,
    h5: css`
      font-size: 28px;
      line-height: 1.6em;
      letter-spacing: 0;
    `,
    h6: css`
      font-size: 24px;
      line-height: 1.6em;
      letter-spacing: -0.017em;
    `,
  },
  text: {
    small: css`
      font-size: 12px;
      line-height: 1.6em;
      letter-spacing: 0;
    `,
    medium: css`
      font-size: 14px;
      line-height: 1.6em;
      letter-spacing: 0;
    `,
    large: css`
      font-size: 16px;
      line-height: 1.6em;
      letter-spacing: 0;
    `,
    right: css`
      text-align: right;
    `,
  },
  subTitle: {
    small: css`
      font-size: 18px;
      line-height: 1.6em;
      letter-spacing: 0;
    `,
    medium: css`
      font-size: 20px;
      line-height: 1.6em;
      letter-spacing: 0;
    `,
    large: css`
      font-size: 22px;
      line-height: 1.6em;
      letter-spacing: 0;
    `,
  },
  caption: css`
    font-size: 12px;
    line-height: 1.6em;
    letter-spacing: -0.03em;
  `,
  overline: css`
    font-size: 10px;
    line-height: 1.6em;
    letter-spacing: -0.025em;
  `,
  buttonLabel: {
    small: css`
      font-size: 14px;
      line-height: 1.6em;
      letter-spacing: -0.028em;
    `,
    medium: css`
      font-size: 16px;
      line-height: 1.6em;
      letter-spacing: 0;
    `,
    large: css`
      font-size: 18px;
      line-height: 1.6em;
      letter-spacing: 0;
    `,
  },
})
