// import from libraries
import 'styled-components/macro'
import { useEffect, useCallback } from 'react'
import { IconButton } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'

import { useNavigate } from 'src/router'
import { useStyle } from 'src/hooks'
import { createStyles } from './styles'
import { TotalDisplay } from '../../components/pageContents/index/TotalDisplay'

const Home: React.FC = () => {
  const navigate = useNavigate()

  const { styles } = useStyle(createStyles)

  const handleChangeCategory = useCallback(
    (category: { id: string; name: string } | null) => {},
    [],
  )

  return (
    <div>
      hoge
      <div css={styles.goToRegiserButtonPosi}>
        <IconButton
          css={styles.goToRegiserButton}
          onClick={() => navigate('/register')}
        >
          <AddIcon />
        </IconButton>
      </div>
      <div css={styles.totalDisplayArea}>
        <TotalDisplay
          totalNum='80000'
          category={null}
          onChangeCategory={handleChangeCategory}
        />
      </div>
    </div>
  )
}

export default Home
