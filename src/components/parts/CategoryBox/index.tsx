// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle } from 'src/hooks'
import { Text } from 'src/components/parts/Texts'
import { createStyles } from './styles'

export type Props = {
  text?: string
}

export const CategoryBox: React.FC<{
  name: string
  color?: string
}> = ({ name, color }) => {
  const { styles } = useStyle(createStyles)

  return (
    <div css={styles.container}>
      <span
        css={styles.icon}
        style={{
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          backgroundColor: color ?? undefined,
        }}
      />
      <Text>{name}</Text>
    </div>
  )
}
