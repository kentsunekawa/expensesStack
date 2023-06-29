// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle } from 'src/hooks'
import { Text } from 'src/components/parts/Texts'
import { createStyles } from './styles'

export type Props = {
  message: string
}

export const Empty: React.FC<Props> = ({ message }) => {
  const { styles, theme } = useStyle(createStyles)

  return (
    <div css={styles.container}>
      <Text size='large' color={theme.palette.text.secondary}>
        {message}
      </Text>
    </div>
  )
}
