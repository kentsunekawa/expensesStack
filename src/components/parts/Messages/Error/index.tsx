// import from libraries
import 'styled-components/macro'
import { ErrorOutline as ErrorIcon } from '@mui/icons-material'

// import from this project
import { useStyle } from 'src/hooks'
import { Text } from 'src/components/parts/Texts'
import { createStyles } from './styles'

export const Error: React.FC = () => {
  const { styles, theme } = useStyle(createStyles)

  return (
    <div css={styles.container}>
      <ErrorIcon color='error' />
      <Text size='large' color={theme.palette.error.main}>
        Error occurred.
      </Text>
    </div>
  )
}
