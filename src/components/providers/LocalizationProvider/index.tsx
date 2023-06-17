import ja from 'date-fns/locale/ja'
import { LocalizationProvider as Provider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

type Props = {
  children: React.ReactNode
}

export const LocalizationProvider: React.FC<Props> = ({ children }) => (
  <Provider
    dateAdapter={AdapterDateFns}
    adapterLocale={ja}
    dateFormats={{ monthAndYear: 'yyyy年MM月' }}
  >
    {children}
  </Provider>
)
