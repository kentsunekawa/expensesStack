import { useCallback, useMemo, useState } from 'react'
import { dateToString, utcDateStringToDate } from 'src/utils'
import { usePublishExpense, toggleIsLoading } from 'src/hooks'
import { Stage } from 'src/operations/types.d'
import { useGetExpenseLazyQuery } from 'src/operations/queries/__generated__/GetExpense'
import { useUpdateExpenseMutation } from 'src/operations/mutations/__generated__/UpdateExpense'
import { useDeleteExpenseMutation } from 'src/operations/mutations/__generated__/DeleteExpense'
import { ExpensesInputs } from 'src/components/globals/ExpenseEditor'

export const useGetExpense = () => {
  const [isNotFound, setIsNotFound] = useState<boolean>(false)
  const [getExpense, { data, loading, error }] = useGetExpenseLazyQuery()

  const doGetExpense = useCallback(
    (id: string) => {
      void getExpense({
        variables: {
          stage: process.env.PROD ? Stage.Published : Stage.Draft,
          where: {
            id,
          },
        },
        onCompleted: (result) => {
          setIsNotFound(result.expense === null)
        },
      })
    },
    [getExpense],
  )

  const expense = useMemo(
    () =>
      data?.expense
        ? {
            id: data.expense.id,
            amount: data.expense.amount.toString(),
            category: data.expense.category
              ? {
                  id: data.expense.category.id,
                  name: data.expense.category.name,
                }
              : null,
            memo: data.expense.memo ?? '',
            date: utcDateStringToDate(data.expense.date, 'Date'),
          }
        : null,
    [data],
  )

  const fetchStatus = useMemo(
    () => ({
      isLoading: loading,
      isError: !!error,
    }),
    [error, loading],
  )

  return { doGetExpense, fetchStatus, expense, isNotFound }
}

export const useUpdateExpense = (id: string) => {
  const { doPublish } = usePublishExpense()

  const [updateExpense] = useUpdateExpenseMutation()

  const doUpdate = useCallback(
    (newInputs: ExpensesInputs, onSucceeded: () => void) => {
      const { amount, date, category, memo } = newInputs
      toggleIsLoading(true)
      void updateExpense({
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
          where: {
            id,
          },
        },
        onCompleted: (data) => {
          if (process.env.PROD) {
            if (data.updateExpense?.id) {
              doPublish(data.updateExpense?.id, () => {
                toggleIsLoading(false)
                onSucceeded()
              })
            }
          } else {
            toggleIsLoading(false)
            onSucceeded()
          }
        },
      })
    },
    [id, updateExpense, doPublish],
  )

  return { doUpdate }
}

export const useDeleteExpense = (id: string) => {
  const [deleteExpense] = useDeleteExpenseMutation()

  const doDelete = useCallback(
    (onSucceeded: () => void) => {
      toggleIsLoading(true)
      void deleteExpense({
        variables: {
          where: { id },
        },
        update: (cache) => {
          const normalizedId = cache.identify({ id, __typename: 'Expense' })
          cache.evict({ id: normalizedId })
          cache.gc()
        },
        onCompleted: () => {
          toggleIsLoading(false)
          onSucceeded()
        },
      })
    },
    [deleteExpense, id],
  )

  return { doDelete }
}
