import { Expense } from 'src/types'

import { categories } from './categories'

export const createExpecses = (): Expense[] =>
  new Array(50).fill(null).map((_, i) => ({
    id: `${i.toString()}`,
    amount: 1000000,
    category: categories[i % categories.length],
    memo: 'メモです',
    date: new Date(),
  }))
