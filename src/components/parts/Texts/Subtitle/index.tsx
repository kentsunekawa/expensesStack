// import from libraries
import 'styled-components/macro'
import { Typography } from '@mui/material'

// import from this project
import { useStyle } from 'src/hooks'
import { createStyles, Size, Weight } from 'src/styles/commonStyles/textStyles'

export type Props = {
  size?: Size
  weight?: Weight
} & React.ComponentProps<typeof Typography>

export const Subtitle: React.FC<Props> = ({
  size = 'medium',
  weight,
  children,
  css,
  ...restProps
}) => {
  const { styles } = useStyle(createStyles)

  return (
    <Typography
      css={[styles.subTitle[size], weight && styles.weight[weight], css]}
      {...restProps}
    >
      {children}
    </Typography>
  )
}
