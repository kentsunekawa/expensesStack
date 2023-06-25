import { useCallback } from 'react'

import { usePublishExpenseMutation } from 'src/operations/mutations/__generated__/PublishExpense'

export const usePublishExpense = () => {
  const [publishExpense] = usePublishExpenseMutation()

  const doPublish = useCallback(
    (id: string, onPublished?: () => void) => {
      void publishExpense({
        variables: { where: { id } },
        onCompleted: onPublished,
      })
    },
    [publishExpense],
  )

  return { doPublish }
}
