import React, { Component } from 'react';
import './App.css';
import blocks from './blocks.json'

import { ApolloClient, InMemoryCache, ApolloProvider, gql, useQuery } from '@apollo/client';

const PAIR_DYNAMIC = gql`
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

const PAIR_STATIC = gql`
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
  const { loading, error, data } = useQuery(PAIR_STATIC);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  console.log(data);
  console.log(blocks);
  return (
    <div>
      Success!
    </div>
  )
}

// function FetchPair(address) {
function FetchPair() {
  let address = "0xbb2b8038a1640196fbe3e38816f3e67cba72d940";
  const { loading, error, data } = useQuery(PAIR_DYNAMIC, {
    variables: { id: address },
  });

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    JSON.stringify(data)
  )
}

export default class App extends Component {

  render () {
    return (
      <div className="App">
        <ApolloProvider client={client}>
          <FetchPair />
        </ApolloProvider>
      </div>
    );
  }
}
