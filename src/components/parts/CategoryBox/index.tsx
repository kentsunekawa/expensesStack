// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle } from 'src/hooks'
import { Text } from 'src/components/parts/Texts'
import { createStyles } from './styles'

export const CategoryBox: React.FC<{
  name: string
  color?: string
}> = ({ name, color }) => {
  const { styles } = useStyle(createStyles, { color })

  return (
    <div css={styles.container}>
      <span css={styles.icon} />
      <Text>{name}</Text>
    </div>
  )
}
