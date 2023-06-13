import {
  ApolloProvider as Provider,
  ApolloClient,
  InMemoryCache,
} from '@apollo/client'

type Props = {
  children: React.ReactNode
}

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: import.meta.env.VITE_API_URL,
  cache,
})

export const ApolloProvider: React.FC<Props> = ({ children }) => {
  return <Provider client={client}>{children}</Provider>
}
