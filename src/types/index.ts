import { CSSProp } from 'styled-components'

export type InsertStyles<T extends string> = {
  [k in T]?: CSSProp
}

export type FetchStatus = {
  isLoading: boolean
  isError: boolean
}
