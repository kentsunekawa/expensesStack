// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle } from 'src/hooks'
import { Heading } from 'src/components/parts/Texts'
import { createStyles } from './styles'

type Num = '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '0' | '×' | 'C'

export type Props = {
  notNumber?: boolean
  disabled?: boolean
  num: Num
  onClick: () => void
}

export const NumButton: React.FC<Props> = ({
  disabled,
  notNumber,
  num,
  onClick,
}) => {
  const { styles } = useStyle(createStyles)

  return (
    <button
      disabled={disabled}
      css={[styles.container, notNumber && styles.notNumberContainer]}
      onClick={onClick}
      type='button'
    >
      <Heading size='h3' css={[styles.text, notNumber && styles.notNumberText]}>
        {num}
      </Heading>
    </button>
  )
}
