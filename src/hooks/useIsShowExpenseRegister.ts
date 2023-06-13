import { useReactiveVar } from '@apollo/client'

import { isShowExpenseRegisterVar } from 'src/cache'

export const toggleIsShowExpenseRegister = (isShow: boolean) =>
  isShowExpenseRegisterVar(isShow)

export const useIsShowExpenseRegister = () => ({
  isShowExpenseRegister: useReactiveVar(isShowExpenseRegisterVar),
})
