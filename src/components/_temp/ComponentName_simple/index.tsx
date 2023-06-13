// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle } from 'src/hooks'
import { createStyles } from './styles'

export type Props = {
  text?: string
}

export const ComponentName: React.FC<Props> = ({ text }) => {
  const { styles } = useStyle(createStyles)

  return <div css={styles.container}>text</div>
}
