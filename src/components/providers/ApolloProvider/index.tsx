import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

type Props = {
  children: React.ReactNode
}

const cache = new InMemoryCache()

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_API_URL,
})

const authLink = setContext(() => ({
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN ?? ''}`,
  },
}))

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache,
})

export const ApolloProvider: React.FC<Props> = ({ children }) => (
  <Provider client={client}>{children}</Provider>
)
