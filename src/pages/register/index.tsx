import { useCallback } from 'react'

import { useNavigate } from 'src/router'
import {
  ExpenseEditor,
  ExpensesInputs,
} from 'src/components/globals/ExpenseEditor'
import { useCreateExpense } from './hooks'

const Register: React.FC = () => {
  const navigate = useNavigate()

  const { doCreate } = useCreateExpense()

  const handleSubmit = useCallback(
    (newInputs: ExpensesInputs) => {
      doCreate(newInputs, () => {
        navigate('/')
      })
    },
    [doCreate, navigate],
  )

  return <ExpenseEditor mode='create' inputs={null} onSubmit={handleSubmit} />
}

export default Register
