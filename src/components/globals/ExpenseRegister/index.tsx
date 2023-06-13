// import from libraries
import 'styled-components/macro'

// import from this project
import { useStyle, useIsShowExpenseRegister } from 'src/hooks'
import { createStyles } from './styles'

const Main: React.FC = () => {
  const { styles } = useStyle(createStyles)

  return <div css={styles.container}>hoge</div>
}

export const ExpenseRegister: React.FC = () => {
  const { isShowExpenseRegister } = useIsShowExpenseRegister()

  return isShowExpenseRegister ? <Main /> : null
}
