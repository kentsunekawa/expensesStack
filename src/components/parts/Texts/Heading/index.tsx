// import from libraries
import 'styled-components/macro'
import { Typography } from '@mui/material'

// import from this project
import { useStyle } from 'src/hooks'
import {
  createStyles as createTextStyles,
  HeadingSize,
} from 'src/styles/commonStyles/textStyles'

export type Props = React.ComponentProps<typeof Typography> & {
  icon?: React.ReactNode
  size?: HeadingSize
}

// DOM component
export const Heading: React.FC<Props> = ({
  size = 'h1',
  css,
  children,
  ...restProps
}) => {
  const { styles } = useStyle(createTextStyles)

  return (
    <Typography css={[styles.heading[size], css]} {...restProps}>
      {children}
    </Typography>
  )
}
