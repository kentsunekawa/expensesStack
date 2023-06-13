// import from libraries
import 'styled-components/macro'

// import from this project
import { InsertStyles } from 'src/types'
import { useStyle } from 'src/hooks'
import { createStyles, Size } from './styles'

export type Props = {
  insertStyles?: InsertStyles<'container'>
  size?: Size
}

export const ComponentName: React.FC<Props> = ({ insertStyles, size }) => {
  const { styles } = useStyle(createStyles, { size })

  return <div css={[styles.container, insertStyles?.container]}>Component</div>
}
