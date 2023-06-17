// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle } from 'src/hooks'
import { Heading } from 'src/components/parts/Texts'
import { createStyles } from './styles'

type Num = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | 'X' | 'C'

export type Props = {
  disabled?: boolean
  num: Num
  onClick: () => void
}

export const NumButton: React.FC<Props> = ({ disabled, num, onClick }) => {
  const { styles } = useStyle(createStyles)

  return (
    <button disabled={disabled} css={styles.container} onClick={onClick}>
      <Heading size='h3'>{num}</Heading>
    </button>
  )
}
