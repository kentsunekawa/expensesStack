// import from libraries
import { css } from 'styled-components'

// import from this project
import { StyleBaseData } from 'src/hooks'

export type Size = 'm' | 's'

export type Args = {
  size?: Size
}

const createSizes = (size?: Size) => {
  switch (size) {
    case 's':
      return {
        fontSize: '20px',
      }
    default:
      return {
        fontSize: '50px',
      }
  }
}

// @ts-ignore
export const createStyles = ({ theme }: StyleBaseData, args?: Args) => {
  // @ts-ignore
  const sizes = createSizes(args?.size)

  return {
    container: css``,
  }
}
