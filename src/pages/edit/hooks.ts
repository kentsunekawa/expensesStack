import { useCallback, useState, useMemo } from 'react'

import { Expense, FetchStatus } from 'src/types'
import { categories } from 'src/mock/mockData/categories'
import { ExpensesInputs } from 'src/components/globals/ExpenseEditor'

export const useGetExpense = () => {
  const [data, setData] = useState<{ expense: Expense } | null>(null)
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>({
    isLoading: false,
    isError: false,
  })

  const doGetExpense = useCallback((id: string) => {
    setFetchStatus({
      isLoading: true,
      isError: false,
    })

    setTimeout(() => {
      setFetchStatus({
        isLoading: false,
        isError: false,
      })
      setData({
        expense: {
          id: '1',
          amount: 100,
          date: new Date(),
          memo: 'めもです',
          category: categories[0],
        },
      })
    }, 800)
  }, [])

  const expense = useMemo(
    () =>
      data
        ? {
            ...data.expense,
            amount: data.expense.amount.toString(),
          }
        : null,
    [data],
  )

  return { doGetExpense, fetchStatus, expense }
}

export const useUpdateExpense = () => {
  const doUpdate = useCallback((newInputs: ExpensesInputs) => {
    console.log(newInputs)

    setTimeout(() => {}, 800)
  }, [])

  return { doUpdate }
}
