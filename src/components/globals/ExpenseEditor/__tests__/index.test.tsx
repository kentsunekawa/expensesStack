import { logRoles, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { render } from 'src/tests/utils'
import { Category } from 'src/hooks/useCategories'
import { ExpenseEditor, ExpensesInputs, Props, Mode, testIds } from '../index'
import { Num } from '../NumButton'

const defaultInputs = {
  amount: '0',
  category: null,
  date: new Date(2023, 10, 10, 0, 0, 0),
  memo: '',
}

const categories: Category[] = [
  {
    id: '1',
    name: 'category1',
    color: {
      hex: '#ddd',
    },
  },
  {
    id: '2',
    name: 'category2',
    color: {
      hex: '#000',
    },
  },
  {
    id: '2',
    name: 'category2',
  },
]

const user = userEvent.setup({ delay: null })

const setUp = (mode: Mode, inputs?: Partial<ExpensesInputs>) => {
  jest.setSystemTime(new Date(2023, 10, 10, 0, 0, 0))
  const mockOnSubmit = jest.fn()
  const mockOnSubmitDelete = jest.fn()
  const mockOnBack = jest.fn()
  const expensesInputs: ExpensesInputs | null =
    inputs === null || mode === 'create'
      ? null
      : {
          ...defaultInputs,
          ...inputs,
        }

  const props: Props = {
    inputs: expensesInputs,
    mode: mode ?? 'create',
    categories,
    onSubmit: mockOnSubmit,
    onSubmitDelete: mockOnSubmitDelete,
    onBack: mockOnBack,
  }

  return {
    renderResult: render(<ExpenseEditor {...props} />),
    mockOnSubmit,
    mockOnSubmitDelete,
  }
}

const clickNum = async (numString: Num) =>
  user.click(screen.getByRole('button', { name: numString }))

describe('ExpenseEditor', () => {
  describe('', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })
    afterEach(() => {
      jest.useRealTimers()
    })
    it('登録の初期状態の表示が正しい', async () => {
      const {
        renderResult: { container },
      } = setUp('create')

      expect(
        screen.getByTestId(testIds.amount['data-testid']).textContent,
      ).toBe('¥ 0')
      expect(
        screen.getByPlaceholderText<HTMLInputElement>('YYYY/MM/DD').value,
      ).toBe('2023/11/10')
      expect(screen.getByLabelText<HTMLInputElement>('Memo').value).toBe('')
      expect(
        screen.getByRole('button', { name: 'Register' }),
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Delete' }),
      ).not.toBeInTheDocument()
    })
    it('数字入力が正しくできる', async () => {
      const {
        renderResult: { container },
      } = setUp('create')

      await clickNum('0')
      await clickNum('0')

      expect(
        screen.getByTestId(testIds.amount['data-testid']).textContent,
      ).toBe('¥ 0')

      await clickNum('1')
      await clickNum('2')
      await clickNum('3')
      await clickNum('4')
      await clickNum('5')
      await clickNum('6')
      await clickNum('7')
      await clickNum('8')
      await clickNum('9')
      await clickNum('0')

      expect(
        screen.getByTestId(testIds.amount['data-testid']).textContent,
      ).toBe('¥ 1,234,567,890')

      await clickNum('×')
      await clickNum('×')

      expect(
        screen.getByTestId(testIds.amount['data-testid']).textContent,
      ).toBe('¥ 12,345,678')

      await clickNum('C')

      expect(
        screen.getByTestId(testIds.amount['data-testid']).textContent,
      ).toBe('¥ 0')
    })
  })
})
