// import from libraries
import 'styled-components/macro'
import { useCallback, useEffect } from 'react'
import {
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  SelectChangeEvent,
  Paper,
  Divider,
} from '@mui/material'

// import from this project
import { useStyle, useCategories } from 'src/hooks'
import { Suspense } from 'src/components/parts/Suspense'
import { Subtitle } from 'src/components/parts/Texts'
import { createStyles } from './styles'

export type Props = {
  category: {
    id: string
    name: string
  } | null
  onChangeCategory: (category: { id: string; name: string } | null) => void
  totalNum: string
}

export const TotalDisplay: React.FC<Props> = ({
  category,
  totalNum,
  onChangeCategory,
}) => {
  const { styles } = useStyle(createStyles)

  const { categories, fetchStatus, doGetCategories } = useCategories()

  const handleChangeCategory = useCallback(
    (e: SelectChangeEvent) => {
      if (categories) {
        onChangeCategory(
          categories.find(({ id }) => id === e.target.value) ?? null,
        )
      }
    },
    [categories, onChangeCategory],
  )

  useEffect(() => {
    doGetCategories()
  }, [doGetCategories])

  return (
    <Paper css={styles.container}>
      <div css={styles.categoryArea}>
        <Suspense
          {...fetchStatus}
          loadingProps={{
            size: 24,
          }}
        >
          <FormControl fullWidth size='small'>
            <InputLabel id='category'>Category</InputLabel>
            <Select
              labelId='category'
              value={category?.id ?? ''}
              label='Category'
              onChange={handleChangeCategory}
              size='small'
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
      <div css={styles.togalArea.container}>
        <Subtitle css={styles.togalArea.text} textAlign='right' size='large'>
          ¥ {Number(totalNum).toLocaleString()}
        </Subtitle>
        <Divider css={styles.togalArea.divider} />
      </div>
    </Paper>
  )
}
