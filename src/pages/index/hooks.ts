import { useCallback, useState, useMemo } from 'react'
import { makeVar, useReactiveVar } from '@apollo/client'

import { FetchStatus, Expense } from 'src/types'
import { createExpecses } from 'src/mock/mockData/expenses'

type SearchQuery = {
  date: Date
  category: { id: string; name: string } | null
}

const searchQueryVar = makeVar<SearchQuery>({
  date: new Date(),
  category: null,
})

export const changeSearchQuery = (searchQuery: Partial<SearchQuery>) =>
  searchQueryVar({ ...searchQueryVar(), ...searchQuery })

export const useSearchQuery = () => ({
  searchQuery: useReactiveVar(searchQueryVar),
})

export const useGetExpenses = () => {
  const [fetchStatus, setFetchStatus] = useState<FetchStatus>({
    isLoading: false,
    isError: false,
  })

  const [data, setData] = useState<{
    expenses: Expense[]
  } | null>(null)

  const doGetExpenses = useCallback((searchQuery: SearchQuery) => {
    console.log(searchQuery)

    setFetchStatus({
      isLoading: true,
      isError: false,
    })

    setTimeout(() => {
      setFetchStatus({
        isLoading: false,
        isError: false,
      })
      setData({ expenses: createExpecses() })
    }, 800)
  }, [])

  const expenses = useMemo(() => data?.expenses ?? null, [data])

  return {
    doGetExpenses,
    expenses,
    fetchStatus,
  }
}
