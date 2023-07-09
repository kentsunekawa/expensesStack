import { useCallback, useMemo } from 'react'
import { makeVar, useReactiveVar } from '@apollo/client'

import {
  dateToString,
  utcDateStringToDate,
  getfirstDateOfAfterNthMonth,
  getlastDateOfAfterNthMonth,
} from 'src/utils'
import { Stage } from 'src/operations/types.d'
import { useGetExpensesLazyQuery } from 'src/operations/queries/__generated__/GetExpenses'

type SearchQuery = {
  date: Date
  category: { id: string; name: string } | null
}

export const isFirstFetchVar = makeVar<boolean>(true)

export const searchQueryVar = makeVar<SearchQuery>({
  date: new Date(),
  category: null,
})

export const resetVars = () => {
  isFirstFetchVar(true)
}

export const changeSearchQuery = (searchQuery: Partial<SearchQuery>) =>
  searchQueryVar({ ...searchQueryVar(), ...searchQuery })

export const useSearchQuery = () => ({
  searchQuery: useReactiveVar(searchQueryVar),
})

export const useGetExpenses = () => {
  const [getExpenses, { data, loading, error }] = useGetExpensesLazyQuery()

  const doGetExpenses = useCallback(
    (searchQuery: SearchQuery, forceFetch: boolean) => {
      void getExpenses({
        fetchPolicy:
          forceFetch && isFirstFetchVar() ? 'network-only' : undefined,
        variables: {
          stage: import.meta.env.PROD ? Stage.Published : Stage.Draft,
          where: {
            date_gte: dateToString(
              getfirstDateOfAfterNthMonth(searchQuery.date, 0),
              'yyyy-MM-dd',
            ),
            date_lte: dateToString(
              getlastDateOfAfterNthMonth(searchQuery.date, 0),
              'yyyy-MM-dd',
            ),
            category: searchQuery.category
              ? {
                  id: searchQuery.category?.id,
                }
              : undefined,
          },
        },
        onCompleted: () => {
          isFirstFetchVar(false)
        },
      })
    },
    [getExpenses],
  )

  const expenses = useMemo(
    () =>
      data
        ? data.expenses.map(({ id, amount, memo, date, category }) => ({
            id,
            amount,
            memo,
            date: utcDateStringToDate(date, 'Date'),
            category: category
              ? {
                  id: category.id,
                  name: category.name,
                  color: (category.color?.hex ?? '') as string,
                }
              : null,
          }))
        : null,
    [data],
  )

  const fetchStatus = useMemo(
    () => ({
      isLoading: loading,
      isError: !!error,
    }),
    [loading, error],
  )

  return {
    doGetExpenses,
    expenses,
    fetchStatus,
  }
}
