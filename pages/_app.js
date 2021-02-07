import '../styles/globals.css'
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client'
import { ChakraProvider } from "@chakra-ui/react"
const client = new ApolloClient({
  uri: 'https://tinderforgamers.herokuapp.com/graphql',
  cache: new InMemoryCache()
})

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ApolloProvider client={client}>
        <Component {...pageProps} />
      </ApolloProvider>
    </ChakraProvider>
  )
}

export default MyApp
