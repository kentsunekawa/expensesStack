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
import { CategoryBox } from 'src/components/parts/CategoryBox'
import { createStyles } from './styles'

export type Props = {
  category: {
    id: string
    name: string
  } | null
  onChangeCategory: (category: { id: string; name: string } | null) => void
  totalNum: number | null
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
          {categories && (
            <FormControl fullWidth size='small'>
              <InputLabel id='category'>Category</InputLabel>
              <Select
                labelId='category'
                value={category?.id ?? ''}
                label='Category'
                onChange={handleChangeCategory}
                size='small'
                renderValue={(selectedId) => {
                  const selected = categories.find(
                    ({ id }) => id === selectedId,
                  )

                  return selected ? (
                    <CategoryBox
                      name={selected.name}
                      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                      color={selected.color?.hex ?? undefined}
                    />
                  ) : null
                }}
              >
                <MenuItem value='' key='all'>
                  all
                </MenuItem>
                {categories.map(({ id, name, color }) => (
                  <MenuItem value={id} key={id}>
                    {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
                    <CategoryBox name={name} color={color?.hex} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        </Suspense>
      </div>
      <div css={styles.togalArea.container}>
        <Subtitle css={styles.togalArea.text} textAlign='right' size='large'>
          ¥ {totalNum !== null ? totalNum.toLocaleString() : '-'}
        </Subtitle>
        <Divider css={styles.togalArea.divider} />
      </div>
    </Paper>
  )
}
