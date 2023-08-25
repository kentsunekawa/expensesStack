// import from libraries
import 'styled-components/macro'
import { useState, useCallback } from 'react'
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  TextField,
  Button,
  IconButton,
} from '@mui/material'
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// import from this project
import { createTestIds } from 'src/utils'
import { useStyle, Category } from 'src/hooks'
import { CategoryBox } from 'src/components/parts/CategoryBox'
import { Heading } from 'src/components/parts/Texts'
import { NumButton } from './NumButton'
import { createStyles } from './styles'

export type Mode = 'create' | 'edit'

export type ExpensesInputs = {
  amount: string
  category: { id: string; name: string } | null
  date: Date
  memo: string
}

export type Props = {
  inputs: ExpensesInputs | null
  mode: Mode
  categories: Category[]
  onSubmit: (inputs: ExpensesInputs) => void
  onSubmitDelete?: () => void
  onBack: () => void
}

export const testIds = createTestIds<'amount'>('ExpenseEditor', ['amount'])

export const ExpenseEditor: React.FC<Props> = ({
  mode,
  inputs: _inputs,
  categories,
  onSubmit,
  onSubmitDelete,
  onBack,
}) => {
  const { styles } = useStyle(createStyles)

  const [inputs, setInputs] = useState<ExpensesInputs>(
    _inputs ?? {
      date: new Date(),
      category: null,
      memo: '',
      amount: '0',
    },
  )

  const handleChangeCategory = useCallback(
    (e: SelectChangeEvent) => {
      setInputs((prev) => ({
        ...prev,
        category: categories.find(({ id }) => id === e.target.value) ?? null,
      }))
    },
    [categories],
  )

  const handleChangeDate = useCallback((date: Date | null) => {
    if (date)
      setInputs((prev) => ({
        ...prev,
        date,
      }))
  }, [])

  const handleClickNumButton = useCallback(
    (num: string) => {
      if (inputs.amount.length < 10) {
        setInputs((prev) => ({
          ...prev,
          amount: prev.amount === '0' ? num : `${prev.amount}${num}`,
        }))
      }
    },
    [inputs.amount],
  )

  const handleClickRemoveButton = useCallback(() => {
    setInputs((prev) => ({
      ...prev,
      amount: prev.amount.length > 1 ? prev.amount.slice(0, -1) : '0',
    }))
  }, [])

  const handleClickClearButton = useCallback(() => {
    setInputs((prev) => ({
      ...prev,
      amount: '0',
    }))
  }, [])

  const hanldeClickSubmitButton = useCallback(() => {
    onSubmit(inputs)
  }, [inputs, onSubmit])

  return (
    <div css={styles.container}>
      <div css={styles.inner}>
        <div css={styles.row.container}>
          <div css={styles.numDisplayArea.containre}>
            <IconButton onClick={onBack}>
              <ArrowBackIcon />
            </IconButton>
            <div css={styles.numDisplayArea.numDisplay}>
              <Heading size='h3' textAlign='right' {...testIds.amount}>
                ¥ {Number(inputs.amount).toLocaleString()}
              </Heading>
            </div>
          </div>
        </div>

        <div css={styles.row.container}>
          <div css={styles.row.cell}>
            <FormControl fullWidth>
              <DatePicker
                label='Date'
                value={inputs.date}
                onChange={handleChangeDate}
              />
            </FormControl>
          </div>
          <div css={styles.row.cell}>
            <FormControl fullWidth>
              <InputLabel id='category'>Category</InputLabel>
              <Select
                labelId='category'
                value={inputs.category?.id ?? ''}
                label='Category'
                onChange={handleChangeCategory}
                renderValue={(selectedId) => {
                  const category = categories.find(
                    ({ id }) => id === selectedId,
                  )

                  return category ? (
                    <CategoryBox
                      name={category.name}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      color={category.color?.hex ?? undefined}
                    />
                  ) : null
                }}
              >
                {categories.map(({ id, name, color }) => (
                  <MenuItem value={id} key={id}>
                    <CategoryBox
                      name={name}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      color={color?.hex ?? undefined}
                    />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div css={styles.row.container}>
          <FormControl fullWidth>
            <TextField
              value={inputs.memo}
              label='Memo'
              onChange={(e) =>
                setInputs((prev) => ({
                  ...prev,
                  memo: e.target.value,
                }))
              }
            />
          </FormControl>
        </div>
        <div css={styles.row.container}>
          <div css={styles.numButtonArea.container}>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton num='9' onClick={() => handleClickNumButton('9')} />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton num='8' onClick={() => handleClickNumButton('8')} />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton num='7' onClick={() => handleClickNumButton('7')} />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton num='6' onClick={() => handleClickNumButton('6')} />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton num='5' onClick={() => handleClickNumButton('5')} />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton num='4' onClick={() => handleClickNumButton('4')} />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton num='3' onClick={() => handleClickNumButton('3')} />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton num='2' onClick={() => handleClickNumButton('2')} />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton num='1' onClick={() => handleClickNumButton('1')} />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton
                  notNumber
                  disabled={inputs.amount === '0'}
                  num='×'
                  onClick={handleClickRemoveButton}
                />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton
                  notNumber
                  disabled={inputs.amount === '0'}
                  num='C'
                  onClick={handleClickClearButton}
                />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton
                  disabled={inputs.amount === '0'}
                  num='0'
                  onClick={() => handleClickNumButton('0')}
                />
              </div>
            </div>
          </div>
        </div>
        <div css={styles.row.container}>
          <Button
            fullWidth
            size='large'
            variant='outlined'
            css={styles.submitButton}
            onClick={hanldeClickSubmitButton}
          >
            {mode === 'create' ? 'Register' : 'Update'}
          </Button>
        </div>
        {mode === 'edit' && (
          <div css={styles.row.container}>
            <Button
              fullWidth
              size='large'
              variant='outlined'
              color='error'
              css={styles.submitButton}
              onClick={onSubmitDelete}
            >
              Delete
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
