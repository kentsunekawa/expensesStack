import { useCallback, useEffect } from 'react'

import { useNavigate } from 'src/router'
import { useCategories } from 'src/hooks'
import {
  ExpenseEditor,
  ExpensesInputs,
} from 'src/components/globals/ExpenseEditor'
import { Suspense } from 'src/components/parts/Suspense'
import { useCreateExpense } from './hooks'

const Register: React.FC = () => {
  const navigate = useNavigate()

  const { categories, fetchStatus, doGetCategories } = useCategories()
  const { doCreate } = useCreateExpense()

  const handleSubmit = useCallback(
    (newInputs: ExpensesInputs) => {
      doCreate(newInputs, () => {
        navigate('/', {
          state: {
            forceFetch: true,
          },
        })
      })
    },
    [doCreate, navigate],
  )

  useEffect(doGetCategories, [doGetCategories])

  return (
    <Suspense
      {...fetchStatus}
      loadingProps={{
        size: 32,
      }}
    >
      {categories && (
        <ExpenseEditor
          mode='create'
          inputs={null}
          categories={categories}
          onSubmit={handleSubmit}
          onBack={() => navigate(-1)}
        />
      )}
    </Suspense>
  )
}

export default Register
