// import from libraries
import 'styled-components/macro'
import { useEffect, useCallback, useMemo } from 'react'
import { IconButton } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import { useNavigate } from 'src/router'
import { useStyle } from 'src/hooks'
import { Suspense } from 'src/components/parts/Suspense'
import {
  useGetExpenses,
  changeSearchQuery,
  useSearchQuery,
} from './index/hooks'
import { createStyles } from './index/styles'
import { Header } from '../components/pageContents/index/Header'
import { TotalDisplay } from '../components/pageContents/index/TotalDisplay'
import { ExpenseBox } from '../components/parts/ExpenseBox'

const Home: React.FC = () => {
  const navigate = useNavigate()

  const { styles } = useStyle(createStyles)

  const { searchQuery } = useSearchQuery()
  const { doGetExpenses, expenses, fetchStatus } = useGetExpenses()

  const handleChangeCategory = useCallback(
    (category: { id: string; name: string } | null) => {
      changeSearchQuery({ category })
    },
    [],
  )

  const handleClickExpense = useCallback(
    (id: string) => {
      navigate('/edit/:id', {
        params: {
          id,
        },
      })
    },
    [navigate],
  )

  const totalNum = useMemo(
    () =>
      expenses && expenses.length > 0
        ? expenses.map(({ amount }) => amount).reduce((sum, elem) => sum + elem)
        : null,
    [expenses],
  )

  useEffect(() => {
    doGetExpenses(searchQuery)
  }, [doGetExpenses, searchQuery])

  return (
    <div css={styles.container}>
      <Header
        date={searchQuery.date}
        onChangeDate={(date) => changeSearchQuery({ date })}
      />
      <Suspense {...fetchStatus} loadingProps={{ minHeight: 300 }}>
        {expenses && (
          <div css={styles.expensesArea}>
            {expenses.length > 0 ? (
              <>
                {expenses.map((expense) => (
                  <button
                    key={expense.id}
                    type='button'
                    onClick={() => handleClickExpense(expense.id)}
                    css={styles.expense}
                  >
                    <ExpenseBox key={expense.id} expense={expense} />
                  </button>
                ))}
              </>
            ) : (
              <>0 件です</>
            )}
          </div>
        )}
      </Suspense>
      <div css={styles.goToRegiserButtonPosi}>
        <IconButton
          css={styles.goToRegiserButton}
          onClick={() => navigate('/register')}
        >
          <AddIcon />
        </IconButton>
      </div>
      <div css={styles.totalDisplayArea}>
        <TotalDisplay
          totalNum={totalNum}
          category={searchQuery.category}
          onChangeCategory={handleChangeCategory}
        />
      </div>
    </div>
  )
}

export default Home