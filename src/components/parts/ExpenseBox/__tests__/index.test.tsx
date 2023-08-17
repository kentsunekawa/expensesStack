import { render, screen } from '@testing-library/react'

import { Expense } from 'src/types'
import { ExpenseBox, testIds } from '../index'

describe('ExpenseBox', () => {
  it('わかんない', () => {
    const expense: Expense = {
      id: '1',
      amount: 100,
      memo: 'This is a memo.',
      date: new Date(2023, 8, 1, 0, 0, 0),
      category: {
        id: '2',
        name: 'food',
        color: '#ddd',
      },
    }
    render(<ExpenseBox expense={expense} />)

    expect(
      screen.getByTestId(testIds.categoryName['data-testid']).textContent,
    ).toBe(expense.category?.name)
    expect(screen.getByTestId(testIds.amout['data-testid']).textContent).toBe(
      `¥ ${expense.amount}`,
    )
    expect(
      screen.getByTestId(testIds.dateText['data-testid']).textContent,
    ).toBe('1')
    expect(screen.getByTestId(testIds.dayText['data-testid']).textContent).toBe(
      'Fri',
    )
  })
})
