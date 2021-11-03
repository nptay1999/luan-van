import React, { ReactNode } from "react"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"

interface PropTypes {
  children: ReactNode
}

const ApolloContext = ({ children }: PropTypes) => {
  const httpLink = createHttpLink({
    uri: "http://localhost:4040/graphql",
  })
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("token")
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    }
  })
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  })

  return <ApolloProvider client={client}>{children}</ApolloProvider>
}

export default ApolloContext
