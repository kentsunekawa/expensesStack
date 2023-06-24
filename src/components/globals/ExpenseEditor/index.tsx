// import from libraries
import 'styled-components/macro'
import { useState, useCallback, useEffect } from 'react'
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
import { useNavigate } from 'src/router'
import { useStyle, useCategories } from 'src/hooks'
import { Suspense } from 'src/components/parts/Suspense'
import { Heading } from 'src/components/parts/Texts'
import { NumButton } from './NumButton'
import { createStyles } from './styles'

type Mode = 'create' | 'edit'

export type ExpensesInputs = {
  amount: string
  category: { id: string; name: string } | null
  date: Date
  memo: string
}

type Props = {
  inputs: ExpensesInputs
  mode: Mode
  onSubmit: (inputs: ExpensesInputs) => void
}

export const ExpenseEditor: React.FC<Props> = ({
  mode: _mode,
  inputs: _inputs,
  onSubmit,
}) => {
  const navigate = useNavigate()

  const { styles } = useStyle(createStyles)

  const [inputs, setInputs] = useState<ExpensesInputs>(_inputs)
  const [mode] = useState<Mode>(_mode)

  const { categories, fetchStatus, doGetCategories } = useCategories()

  const handleChangeCategory = useCallback(
    (e: SelectChangeEvent) => {
      if (categories) {
        setInputs((prev) => ({
          ...prev,
          category: categories.find(({ id }) => id === e.target.value) ?? null,
        }))
      }
    },
    [categories],
  )

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

  useEffect(() => {
    doGetCategories()
  }, [doGetCategories])

  const hanldeClickSubmitButton = useCallback(() => {
    onSubmit(inputs)
  }, [inputs, onSubmit])

  return (
    <div css={styles.container}>
      <div css={styles.inner}>
        <div css={styles.row.container}>
          <div css={styles.numDisplayArea.containre}>
            <IconButton onClick={() => navigate(-1)}>
              <ArrowBackIcon />
            </IconButton>
            <div css={styles.numDisplayArea.numDisplay}>
              <Heading size='h3' textAlign='right'>
                ¥ {Number(inputs.amount).toLocaleString()}
              </Heading>
            </div>
          </div>
        </div>

        <div css={styles.row.container}>
          <div css={styles.row.cell}>
            <FormControl fullWidth>
              <DatePicker label='Date' value={inputs.date} />
            </FormControl>
          </div>
          <div css={styles.row.cell}>
            <Suspense
              {...fetchStatus}
              loadingProps={{
                size: 32,
              }}
            >
              <FormControl fullWidth>
                <InputLabel id='category'>Category</InputLabel>
                <Select
                  labelId='category'
                  value={inputs.category?.id ?? ''}
                  label='Category'
                  onChange={handleChangeCategory}
                >
                  {categories?.map(({ id, name }) => (
                    <MenuItem value={id} key={id}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Suspense>
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
                  disabled={inputs.amount === '0'}
                  num='X'
                  onClick={handleClickRemoveButton}
                />
              </div>
            </div>
            <div css={styles.numButtonArea.cell}>
              <div css={styles.numButtonArea.inner}>
                <NumButton
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
      </div>
    </div>
  )
}
