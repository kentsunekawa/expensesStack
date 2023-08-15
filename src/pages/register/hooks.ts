import { useCallback } from 'react'
import { dateToString } from 'src/utils'
import { usePublishExpense, toggleIsLoading } from 'src/hooks'
import { useCreateExpenseMutation } from 'src/operations/mutations/__generated__/CreateExpense'
import { ExpensesInputs } from 'src/components/globals/ExpenseEditor'

export const useCreateExpense = () => {
  const { doPublish } = usePublishExpense()

  const [createExpense] = useCreateExpenseMutation()

  const doCreate = useCallback(
    (newInputs: ExpensesInputs, onSucceeded: () => void) => {
      const { amount, date, category, memo } = newInputs
      toggleIsLoading(true)
      void createExpense({
        variables: {
          data: {
            amount: Number(amount),
            memo: memo ?? null,
            date: dateToString(date, 'yyyy-MM-dd'),
            category: category
              ? {
                  connect: {
                    id: category.id,
                  },
                }
              : null,
          },
        },
        onCompleted: (data) => {
          if (process.env.PROD) {
            if (data.createExpense?.id)
              doPublish(data.createExpense?.id, () => {
                toggleIsLoading(false)
                onSucceeded()
              })
          } else {
            toggleIsLoading(false)
            onSucceeded()
          }
        },
      })
    },
    [createExpense, doPublish],
  )

  return { doCreate }
}
