import { useEffect, useCallback } from 'react'

import { useParams, useNavigate } from 'src/router'
import { Suspense } from 'src/components/parts/Suspense'
import {
  ExpenseEditor,
  ExpensesInputs,
} from 'src/components/globals/ExpenseEditor'
import { useGetExpense, useUpdateExpense, useDeleteExpense } from './hooks'

const Edit: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams('/edit/:id')
  const { doGetExpense, fetchStatus, expense } = useGetExpense()
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

  return (
    <Suspense
      {...fetchStatus}
      loadingProps={{
        minHeight: 300,
      }}
    >
      {expense && (
        <ExpenseEditor
          mode='edit'
          inputs={expense}
          onSubmit={handleSubmit}
          onSubmitDelete={handleSubmitDelete}
        />
      )}
    </Suspense>
  )
}

export default Edit
