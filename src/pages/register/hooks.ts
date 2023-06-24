import { useCallback, useState, useMemo } from 'react'

import { ExpensesInputs } from 'src/components/globals/ExpenseEditor'

const initialInputs = {
  date: new Date(),
  category: null,
  memo: '',
  amount: '0',
}

export const useCreateExpense = () => {
  const [inputs, setInputs] = useState<ExpensesInputs>(initialInputs)

  const doCreate = useCallback((newInputs: ExpensesInputs) => {
    console.log(newInputs)

    setTimeout(() => {
      setInputs(initialInputs)
    }, 800)
  }, [])

  return { doCreate, inputs }
}
