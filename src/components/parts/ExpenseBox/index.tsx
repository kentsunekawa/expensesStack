// import from libraries
import 'styled-components/macro'
import { Paper } from '@mui/material'
import { getDate } from 'date-fns'

// import from this project
import { Expense } from 'src/types'
import { dateToString, createTestIds } from 'src/utils'
import { useStyle } from 'src/hooks'
import { Heading, Text } from 'src/components/parts/Texts'
import { createStyles } from './styles'

export type Props = {
  expense: Expense
}

export const testIds = createTestIds<
  'dateText' | 'dayText' | 'categoryName' | 'amout'
>('ExpenseBox', ['dateText', 'dayText', 'categoryName', 'amout'])

export const ExpenseBox: React.FC<Props> = ({
  expense: { amount, category, date },
}) => {
  const { styles } = useStyle(createStyles, {
    color: category?.color,
  })

  return (
    <Paper css={styles.container} variant='elevation'>
      <div css={styles.left}>
        <div css={styles.dateArea.container}>
          <p css={styles.dateArea.dateText} {...testIds.dateText}>
            {getDate(date)}
          </p>
          <p css={styles.dateArea.dayText} {...testIds.dayText}>
            {dateToString(date, 'E')}
          </p>
        </div>
        <div css={styles.iconArea.container}>
          {category && (
            <Text textAlign='left' {...testIds.categoryName}>
              {category.name}
            </Text>
          )}
        </div>
      </div>
      <div css={styles.amoutArea.container}>
        <Heading
          size='h5'
          variant='h5'
          css={styles.amoutArea.text}
          {...testIds.amout}
        >
          <span>¥</span> {amount.toLocaleString()}
        </Heading>
      </div>
    </Paper>
  )
}
