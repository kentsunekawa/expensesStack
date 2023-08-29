import { getByRole, screen } from '@testing-library/react'
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
    id: '3',
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

      expect(
        screen
          .getByTestId(testIds.category['data-testid'])
          .querySelector('input')?.value ?? 'unexist',
      ).toBeFalsy()
      expect(screen.getByLabelText<HTMLInputElement>('Memo').value).toBe('')
      expect(
        screen.getByRole('button', { name: 'Register' }),
      ).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Delete' }),
      ).not.toBeInTheDocument()
    })

    it('編集の初期状態の表示が正しい', async () => {
      const initialInputs: ExpensesInputs = {
        amount: '1000',
        category: categories[1],
        date: new Date(2023, 9, 10, 0, 0, 0),
        memo: 'This is a memo.',
      }

      const {
        renderResult: { container },
      } = setUp('edit', initialInputs)

      expect(
        screen.getByTestId(testIds.amount['data-testid']).textContent,
      ).toBe('¥ 1,000')
      expect(
        screen.getByPlaceholderText<HTMLInputElement>('YYYY/MM/DD').value,
      ).toBe('2023/10/10')
      expect(
        screen
          .getByTestId(testIds.category['data-testid'])
          .querySelector('input')?.value ?? 'unexist',
      ).toBe(initialInputs.category?.id)
      expect(screen.getByLabelText<HTMLInputElement>('Memo').value).toBe(
        initialInputs.memo,
      )
      expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
      expect(
        screen.queryByRole('button', { name: 'Delete' }),
      ).toBeInTheDocument()
    })

    it('入力値が変更できる', async () => {
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

      const button = getByRole(
        screen.getByTestId(testIds.category['data-testid']),
        'button',
      )
      await user.click(button)

      const options = screen.getAllByTestId(
        testIds.categoryMenuItem['data-testid'],
      )
      expect(options[0]).toHaveAttribute('data-value', categories[0].id)
      expect(options[1]).toHaveAttribute('data-value', categories[1].id)
      expect(options[2]).toHaveAttribute('data-value', categories[2].id)
      const selectedOption = options[2]
      await user.click(selectedOption)
      expect(
        screen
          .getByTestId(testIds.category['data-testid'])
          .querySelector('input')?.value ?? 'unexist',
      ).toBe(selectedOption.getAttribute('data-value'))
      console.log(screen.getAllByText(categories[2].name))

      // expect(screen.getByText(categories[2].name)).toBeInTheDocument()
    })
  })
})
