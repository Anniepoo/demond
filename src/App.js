import React, { Component } from 'react';
import './App.css';
import NameGatheringGame from './namegathergame.js';
import ApolloClient from "apollo-client";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";

import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: "https://rakshasa-game.herokuapp.com/v1alpha1/graphql",
});

// Create a WebSocket link:
const wsLink = new WebSocketLink({
  uri: "ws://rakshasa-game.herokuapp.com/v1alpha1/graphql",
  options: {
    reconnect: true
  }
});

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink,
);

// Instantiate client
const client = new ApolloClient({
  link,
  cache: new InMemoryCache()
})

class App extends Component {
    render() {
        return (
    <ApolloProvider client={client}>
        <div id="app">
            <NameGatheringGame />
        </div>
    </ApolloProvider>
    );
  }
}

const TestApollo = () => (
  <Query
    query={gql`
      {
        towers {
          id
          col
          row
        }
      }
    `}
>
   {({ loading, error, data }) => {
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error 8c/</p>;
console.log(data);

      return (
<div id="alltowers">
{ data.towers.map(({ id, row, col }) => (
        <div key={id}>
          <p>{row}, {col}</p>
        </div>
      ))
}
</div>
)
    }}
  </Query>
);

export default App;
