// import from libraries
import 'styled-components/macro'
import { Paper } from '@mui/material'
import { getDate } from 'date-fns'

// import from this project
import { dateToString } from 'src/utils'
import { Expense } from 'src/types'
import { useStyle } from 'src/hooks'
import { Heading, Text } from 'src/components/parts/Texts'
import { createStyles } from './styles'

export type Props = {
  expense: Expense
}

export const ExpenseBox: React.FC<Props> = ({
  expense: { amount, category, date },
}) => {
  const { styles } = useStyle(createStyles, {
    color: category.color,
  })

  return (
    <Paper css={styles.container} variant='elevation'>
      <div css={styles.left}>
        <div css={styles.dateArea.container}>
          <p css={styles.dateArea.dateText}>{getDate(date)}</p>
          <p css={styles.dateArea.dayText}>{dateToString(date, 'E')}</p>
        </div>
        <div css={styles.iconArea.container}>
          <Text textAlign='left'>{category.name}</Text>
        </div>
      </div>
      <div css={styles.amoutArea.container}>
        <Heading size='h5' css={styles.amoutArea.text}>
          <span>¥</span> {amount.toLocaleString()}
        </Heading>
      </div>
    </Paper>
  )
}
