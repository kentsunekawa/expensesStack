import { useCallback, useMemo } from 'react'

import { useGetCategoriesLazyQuery } from 'src/operations/queries/__generated__/GetCategories'

export const useCategories = () => {
  const [getCategories, { data, loading, error }] = useGetCategoriesLazyQuery()

  const doGetCategories = useCallback(() => {
    void getCategories()
  }, [getCategories])

  const categories = useMemo(() => data?.categories ?? null, [data])

  const fetchStatus = useMemo(
    () => ({
      isLoading: loading,
      isError: !!error,
    }),
    [loading, error],
  )

  return { categories, doGetCategories, fetchStatus }
}
