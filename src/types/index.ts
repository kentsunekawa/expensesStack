import { CSSProp } from 'styled-components'

export type InsertStyles<T extends string> = {
  [k in T]?: CSSProp
}

export type FetchStatus = {
  isLoading: boolean
  isError: boolean
}

export type Expense = {
  id: string
  amount: number
  category: { id: string; name: string; color: string }
  date: Date
  memo: string
}
