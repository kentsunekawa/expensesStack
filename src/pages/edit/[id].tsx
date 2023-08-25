// import from libraries
import 'styled-components/macro'
import { useEffect, useCallback } from 'react'
import { Button } from '@mui/material'

import { useParams, useNavigate } from 'src/router'
import { useStyle, useCategories } from 'src/hooks'
import { Suspense } from 'src/components/parts/Suspense'
import { Messages } from 'src/components/parts/Messages'
import {
  ExpenseEditor,
  ExpensesInputs,
} from 'src/components/globals/ExpenseEditor'
import { useGetExpense, useUpdateExpense, useDeleteExpense } from './hooks'
import { createStyles } from './styles'

const Edit: React.FC = () => {
  const { styles } = useStyle(createStyles)

  const navigate = useNavigate()
  const { id } = useParams('/edit/:id')
  const {
    categories,
    fetchStatus: fetchCategoriesStatus,
    doGetCategories,
  } = useCategories()
  const {
    doGetExpense,
    fetchStatus: fetchExpenseStatus,
    expense,
    isNotFound,
  } = useGetExpense()
  const { doUpdate } = useUpdateExpense(id)
  const { doDelete } = useDeleteExpense(id)

  const handleSubmit = useCallback(
    (newInputs: ExpensesInputs) => {
      doUpdate(newInputs, () => {
        navigate('/')
      })
    },
    [doUpdate, navigate],
  )

  const handleSubmitDelete = useCallback(() => {
    const result = window.confirm('Do you really want to delete this data?')
    if (result) {
      doDelete(() => {
        navigate('/')
      })
    }
  }, [doDelete, navigate])

  useEffect(() => {
    doGetExpense(id)
  }, [id, doGetExpense])

  useEffect(doGetCategories, [doGetCategories])

  return (
    <Suspense
      {...fetchExpenseStatus}
      loadingProps={{
        minHeight: 300,
      }}
    >
      {isNotFound ? (
        <Messages.Empty message='Not found.'>
          <div css={styles.backArea}>
            <Button onClick={() => navigate(-1)}>Back</Button>
          </div>
        </Messages.Empty>
      ) : (
        <Suspense
          {...fetchCategoriesStatus}
          loadingProps={{
            minHeight: 300,
          }}
        >
          {expense && categories && (
            <ExpenseEditor
              mode='edit'
              inputs={expense}
              categories={categories}
              onSubmit={handleSubmit}
              onSubmitDelete={handleSubmitDelete}
              onBack={() => navigate(-1)}
            />
          )}
        </Suspense>
      )}
    </Suspense>
  )
}

export default Edit
