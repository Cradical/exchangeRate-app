import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import * as serviceWorker from './serviceWorker'
import { ApolloProvider, useQuery } from '@apollo/react-hooks'

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

const EXCHNAGE_RATES = gql`
  {
    rates(currency: "USD") {
      currency
      rate
    }
  }
`
const ExchangeRates = () => {
  const { loading, error, data } = useQuery(EXCHNAGE_RATES)

  if (loading) return <h3>Loading ...</h3>
  if (error) return <h3>Error: </h3>

  return data.rates.map(({ currency, rates }) => {
    return (
      <div key={currency}>
        <h6>
          {currency}: {rates}
        </h6>
      </div>
    )
  })
}

const App = () => (
  <ApolloProvider client={client}>
    <h2>Exchange Rate app</h2>
    <ExchangeRates />
  </ApolloProvider>
)

ReactDOM.render(<App />, document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
