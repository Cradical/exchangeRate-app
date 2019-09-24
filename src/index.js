import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import RootComponent from './App'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider } from '@apollo/react-hooks'

import ApolloClient, { gql } from 'apollo-boost'

const client = new ApolloClient({
  uri: 'https://48p1r2roz4.sse.codesandbox.io',
})

client
  .query({
    query: gql`
      {
        rates(currency: "USD") {
          currency
        }
      }
    `,
  })
  .then(result => console.log(result))

const App = () => (
  <ApolloProvider client={client}>
    <RootComponent />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
