import { SnackbarProvider as Provider } from 'notistack'

type Props = {
  children: React.ReactNode
}

export const SnackbarProvider: React.FC<Props> = ({ children }) => (
  <Provider>{children}</Provider>
)
