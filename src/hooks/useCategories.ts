import { useCallback, useMemo } from 'react'

import { Stage } from 'src/operations/types.d'
import { useGetCategoriesLazyQuery } from 'src/operations/queries/__generated__/GetCategories'

export const useCategories = () => {
  const [getCategories, { data, loading, error }] = useGetCategoriesLazyQuery()

  const doGetCategories = useCallback(() => {
    void getCategories({
      variables: {
        stage: import.meta.env.PROD ? Stage.Published : Stage.Draft,
      },
    })
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
