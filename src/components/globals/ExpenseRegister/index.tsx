// import from libraries
import 'styled-components/macro'
import { useState, useCallback, useRef, useEffect } from 'react'
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

type Expense = {
  date: Date
  category: { id: string; name: string } | null
  memo: string
  amount: string
}

type Props = {
  expense: Expense | null
}

type Mode = 'create' | 'edit'

const initialInputs = {
  date: new Date(),
  category: null,
  memo: '',
  amount: '0',
}

export const ExpenseRegister: React.FC<Props> = ({ expense }) => {
  const navigate = useNavigate()

  const { styles } = useStyle(createStyles)

  const containerRef = useRef<HTMLDivElement>(null)

  const [inputs, setInputs] = useState<Expense>(expense ?? initialInputs)
  const [mode] = useState<Mode>(expense ? 'edit' : 'create')

  const { categories, fetchStatus, doGetCategories } = useCategories()

  const handleChange = useCallback(
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

  useEffect(() => {
    const setHeight = () => {
      if (containerRef.current && window) {
        containerRef.current.style.height = `${window.innerHeight}px`
      }
    }
    setHeight()

    window.addEventListener('resize', setHeight)

    return () => window.addEventListener('remove', setHeight)
  }, [])

  return (
    <div css={styles.container} ref={containerRef}>
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
                  onChange={handleChange}
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
          >
            {mode === 'create' ? 'Register' : 'Update'}
          </Button>
        </div>
      </div>
    </div>
  )
}
