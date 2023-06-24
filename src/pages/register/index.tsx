import { ExpenseEditor } from 'src/components/globals/ExpenseEditor'
import { useCreateExpense } from './hooks'

const Register: React.FC = () => {
  const { doCreate, inputs } = useCreateExpense()

  return <ExpenseEditor mode='create' inputs={inputs} onSubmit={doCreate} />
}

export default Register
