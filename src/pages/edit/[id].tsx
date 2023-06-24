import { useEffect } from 'react'

import { useParams } from 'src/router'
import { Suspense } from 'src/components/parts/Suspense'
import { ExpenseEditor } from 'src/components/globals/ExpenseEditor'
import { useGetExpense, useUpdateExpense } from './hooks'

const Edit: React.FC = () => {
  const { id } = useParams('/edit/:id')
  const { doGetExpense, fetchStatus, expense } = useGetExpense()
  const { doUpdate } = useUpdateExpense()

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
        <ExpenseEditor mode='edit' inputs={expense} onSubmit={doUpdate} />
      )}
    </Suspense>
  )
}

export default Edit
