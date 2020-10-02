import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const PAIR1 = gql`
  query GetPair($id: String!) {
    pair (id: $id) {
      id
      token0 {
        id
        symbol
        name
        decimals
      }
    }
  }
`;

const PAIR2 = gql`
  {
    pair(id: "0xbb2b8038a1640196fbe3e38816f3e67cba72d940") {
      txCount
      reserveUSD
    }
  }
`;

const client = new ApolloClient({
  uri: 'https://api.thegraph.com/subgraphs/name/uniswap/uniswap-v2',
  cache: new InMemoryCache()
})

function StaticPair() {
  const { loading, error, data } = useQuery(PAIR2);
  
  if (loading) return null;
  if (error) return `Error! ${error}`;

  console.log(data);
  return (
    <div>
      Success!
    </div>
  )
}

function FetchPair(address) {
  const { loading, error, data } = useQuery(PAIR1, {
    variables: { address },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  console.log(data);
}

export default class App extends Component {

  render () {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          {/* <FetchPair /> */}
          <StaticPair />
        </ApolloProvider>
      </div>
    );
  }
}
