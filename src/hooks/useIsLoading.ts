import { useReactiveVar } from '@apollo/client'

import { isLoadingVar } from 'src/cache'

export const toggleIsLoading = (isLoading: boolean) => isLoadingVar(isLoading)

export const useIsLoading = () => ({
  isLoading: useReactiveVar(isLoadingVar),
})
