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
} from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'

// import from this project
import { useStyle, useIsShowExpenseRegister } from 'src/hooks'
import { Heading } from 'src/components/parts/Texts'
import { NumButton } from './NumButton'
import { createStyles } from './styles'

type Inputs = {
  date: Date
  categoryId: string
  memo: string
  amount: string
}

const initialInputs = {
  date: new Date(),
  categoryId: '1',
  memo: '',
  amount: '0',
}

const Main: React.FC = () => {
  const { styles } = useStyle(createStyles)

  const [inputs, setInputs] = useState<Inputs>(initialInputs)

  const handleChange = useCallback((e: SelectChangeEvent) => {
    setInputs((prev) => ({
      ...prev,
      categoryId: e.target.value,
    }))
  }, [])

  const handleClickNumButton = useCallback((num: string) => {
    console.log(inputs.amount)

    if (inputs.amount.length < 10) {
      setInputs((prev) => ({
        ...prev,
        amount: prev.amount === '0' ? num : `${prev.amount}${num}`,
      }))
    }
  }, [])

  const handleClickBackButton = useCallback(() => {
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

  return (
    <div css={styles.container}>
      <div>
        <FormControl fullWidth>
          <DatePicker label='Date' value={inputs.date} />
        </FormControl>
      </div>
      <div>
        <Heading size='h4' textAlign='right'>
          ¥ {Number(inputs.amount).toLocaleString()}
        </Heading>
      </div>
      <div>
        <FormControl fullWidth>
          <InputLabel id='category'>Category</InputLabel>
          <Select
            labelId='category'
            value={inputs.categoryId}
            label='Category'
            onChange={handleChange}
          >
            <MenuItem value='1'>外食</MenuItem>
            <MenuItem value='2'>日用品・必需品</MenuItem>
            <MenuItem value='3'>自由出費</MenuItem>
          </Select>
        </FormControl>
      </div>
      <div>
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
              onClick={handleClickBackButton}
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
  )
}

export const ExpenseRegister: React.FC = () => {
  const { isShowExpenseRegister } = useIsShowExpenseRegister()

  return isShowExpenseRegister ? <Main /> : null
}
