import { CSSProp } from 'styled-components'

import {
  Expense as ExpenseType,
  Category as CategoryType,
} from 'src/operations/types.d'

export type InsertStyles<T extends string> = {
  [k in T]?: CSSProp
}

export type FetchStatus = {
  isLoading: boolean
  isError: boolean
}

export type Category = Pick<CategoryType, 'id' | 'name'> & {
  color: string
}

export type Expense = Pick<ExpenseType, 'id' | 'amount' | 'memo'> & {
  date: Date
  category: Category | null
}
