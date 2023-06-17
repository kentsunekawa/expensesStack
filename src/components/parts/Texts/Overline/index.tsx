// import from libraries
import 'styled-components/macro'
import { Typography } from '@mui/material'

// import from this project
import { useStyle } from 'src/hooks'
import { createStyles } from 'src/styles/commonStyles/textStyles'

export type Props = React.ComponentProps<typeof Typography>

export const Overline: React.FC<Props> = ({ children, css, ...restProps }) => {
  const { styles } = useStyle(createStyles)

  return (
    <Typography css={[styles.overline, css]} {...restProps}>
      {children}
    </Typography>
  )
}
