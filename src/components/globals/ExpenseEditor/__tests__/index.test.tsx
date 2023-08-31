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
    mockOnBack,
  }
}

const clickNum = async (numString: Num) =>
  user.click(screen.getByRole('button', { name: numString }))

describe('ExpenseEditor', () => {
  beforeEach(() => {
    jest.useFakeTimers()
  })
  afterEach(() => {
    jest.useRealTimers()
  })
  it('登録の初期状態の表示が正しい', async () => {
    setUp('create')

    expect(screen.getByTestId(testIds.amount['data-testid']).textContent).toBe(
      '¥ 0',
    )
    expect(
      screen.getByPlaceholderText<HTMLInputElement>('YYYY/MM/DD').value,
    ).toBe('2023/11/10')

    expect(
      screen.getByTestId(testIds.category['data-testid']).querySelector('input')
        ?.value ?? 'unexist',
    ).toBeFalsy()
    expect(screen.getByLabelText<HTMLInputElement>('Memo').value).toBe('')
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument()
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

    setUp('edit', initialInputs)

    expect(screen.getByTestId(testIds.amount['data-testid']).textContent).toBe(
      '¥ 1,000',
    )
    expect(
      screen.getByPlaceholderText<HTMLInputElement>('YYYY/MM/DD').value,
    ).toBe('2023/10/10')
    expect(
      screen.getByTestId(testIds.category['data-testid']).querySelector('input')
        ?.value ?? 'unexist',
    ).toBe(initialInputs.category?.id)

    expect(screen.getByLabelText<HTMLInputElement>('Memo').value).toBe(
      initialInputs.memo,
    )
    expect(screen.getByRole('button', { name: 'Update' })).toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Delete' })).toBeInTheDocument()
  })

  it('入力値が変更できる', async () => {
    const { mockOnSubmit } = setUp('create')

    // 数字の入力が正しくできる
    await clickNum('0')
    await clickNum('0')

    expect(screen.getByTestId(testIds.amount['data-testid']).textContent).toBe(
      '¥ 0',
    )

    await clickNum('1')
    expect(screen.getByTestId(testIds.amount['data-testid']).textContent).toBe(
      '¥ 1',
    )
    await clickNum('C')
    expect(screen.getByTestId(testIds.amount['data-testid']).textContent).toBe(
      '¥ 0',
    )

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

    expect(screen.getByTestId(testIds.amount['data-testid']).textContent).toBe(
      '¥ 1,234,567,890',
    )

    await clickNum('×')
    await clickNum('×')

    expect(screen.getByTestId(testIds.amount['data-testid']).textContent).toBe(
      '¥ 12,345,678',
    )

    // 日付を変更できる
    const dateInput =
      screen.getByPlaceholderText<HTMLInputElement>('YYYY/MM/DD')
    await user.type(dateInput, '2023/08/31')

    // カテゴリを変更できる
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
    const selectedCategory = categories[2]
    await user.click(options[2])
    expect(
      screen.getByTestId(testIds.category['data-testid']).querySelector('input')
        ?.value ?? 'unexist',
    ).toBe(selectedCategory.id)
    expect(
      screen.getByTestId(testIds.category['data-testid']).querySelector('p')
        ?.textContent,
    ).toBe(selectedCategory.name)

    // メモが正しく入力できる
    const memoInput = screen.getByLabelText<HTMLInputElement>('Memo')
    const memoText = 'hogehoge'
    await user.type(memoInput, memoText)
    expect(memoInput.value).toBe(memoText)

    const registerButton = screen.getByRole('button', { name: 'Register' })
    expect(registerButton).toBeInTheDocument()

    await user.click(registerButton)

    expect(mockOnSubmit).toHaveBeenCalledWith({
      amount: '12345678',
      category: selectedCategory,
      date: new Date(2023, 7, 31, 0, 0, 0),
      memo: memoText,
    })
  })

  it('削除ができる', async () => {
    const { mockOnSubmitDelete } = setUp('edit')
    const deleteButton = screen.getByRole('button', { name: 'Delete' })
    expect(deleteButton).toBeInTheDocument()

    await user.click(deleteButton)
    expect(mockOnSubmitDelete).toHaveBeenCalled()
  })

  it('バックボタンができる', async () => {
    const { mockOnBack } = setUp('edit')
    const backButton = screen.getByTestId(testIds.backButton['data-testid'])
    expect(backButton).toBeInTheDocument()

    await user.click(backButton)
    expect(mockOnBack).toHaveBeenCalled()
  })

  it('Snapshot', () => {
    const {
      renderResult: { container },
    } = setUp('create')
    expect(container).toMatchSnapshot()
  })
})
