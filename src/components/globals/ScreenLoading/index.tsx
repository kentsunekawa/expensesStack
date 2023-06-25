// import from libraries
import 'styled-components/macro'
import { CircularProgress } from '@mui/material'

// import from this project
import { useStyle, useIsLoading } from 'src/hooks'
import { createStyles } from './styles'

export type Props = React.ComponentProps<typeof CircularProgress>

export const ScreenLoading: React.FC<Props> = (props) => {
  const { styles } = useStyle(createStyles)

  const { isLoading } = useIsLoading()

  return isLoading ? (
    <div css={styles.container}>
      <CircularProgress {...props} />
    </div>
  ) : null
}
