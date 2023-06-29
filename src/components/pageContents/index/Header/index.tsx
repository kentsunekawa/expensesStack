// import from libraries
import 'styled-components/macro'
import { useCallback, useMemo } from 'react'
import { IconButton } from '@mui/material'
import {
  ArrowLeftRounded as ArrowLeftRoundedIcon,
  ArrowRightRounded as ArrowRightRoundedIcon,
} from '@mui/icons-material'
import { getYear, getMonth } from 'date-fns'

// import from this project
import { dateToString, getfirstDateOfAfterNthMonth } from 'src/utils'
import { useStyle } from 'src/hooks'
import { Heading } from 'src/components/parts/Texts'
import { createStyles } from './styles'

export type Props = {
  date: Date
  onChangeDate: (date: Date) => void
}

const today = new Date()

export const Header: React.FC<Props> = ({ date, onChangeDate }) => {
  const { styles } = useStyle(createStyles)

  const canGoNextMonth = useMemo(() => {
    const now = {
      year: getYear(today),
      month: getMonth(today),
    }

    const firstDateOfNextMonth = getfirstDateOfAfterNthMonth(date, 1)
    const next = {
      year: getYear(firstDateOfNextMonth),
      month: getMonth(firstDateOfNextMonth),
    }

    return next.year <= now.year && next.month <= now.month
  }, [date])

  const handleClickMoveButton = useCallback(
    (diff: -1 | 1) => {
      onChangeDate(getfirstDateOfAfterNthMonth(date, diff))
    },
    [date, onChangeDate],
  )

  return (
    <div css={styles.container}>
      <div css={styles.moveButtonArea}>
        <IconButton onClick={() => handleClickMoveButton(-1)}>
          <ArrowLeftRoundedIcon />
        </IconButton>
      </div>
      <div>
        <Heading size='h6'>{dateToString(date, 'yyyy, MMMM')}</Heading>
      </div>
      <div css={styles.moveButtonArea}>
        {canGoNextMonth && (
          <IconButton onClick={() => handleClickMoveButton(1)}>
            <ArrowRightRoundedIcon />
          </IconButton>
        )}
      </div>
    </div>
  )
}
