import { useCallback, useMemo, useState } from 'react'

import { FetchStatus } from 'src/types'
import { categories as mockCategories } from 'src/mock/mockData/categories'

export const useCategories = () => {
  const [fetchStatus, setIsFetchStatus] = useState<FetchStatus>({
    isLoading: false,
    isError: false,
  })
  const [data, setData] = useState<{
    categories: {
      id: string
      name: string
    }[]
  } | null>(null)

  const doGetCategories = useCallback(() => {
    setIsFetchStatus({
      isError: false,
      isLoading: true,
    })
    setTimeout(() => {
      setData({
        categories: mockCategories,
      })
      setIsFetchStatus({
        isError: false,
        isLoading: false,
      })
    }, 800)
  }, [])

  const categories = useMemo(() => data?.categories ?? null, [data])

  return { categories, doGetCategories, fetchStatus }
}
