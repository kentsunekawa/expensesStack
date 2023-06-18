// import from libraries
import 'styled-components/macro'
import CircularProgress from '@mui/material/CircularProgress'

// import from this project
import { useStyle } from 'src/hooks'
import { createStyles, Args } from './styles'

export type Props = React.ComponentProps<typeof CircularProgress> & Args

export const Loading: React.FC<Props> = ({ minHeight, ...restprops }) => {
  const { styles } = useStyle(createStyles, { minHeight })

  return (
    <div css={styles.container}>
      <CircularProgress {...restprops} />
    </div>
  )
}
