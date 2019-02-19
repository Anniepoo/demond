import React, { Component } from 'react';
import './App.css';
import NameEntry from './nameentry.js';
import NotEnoughPlayers from './notenoughplayers.js';
import GameWorld from './gameworld.js';
import ChatOverlay, { ChatBar } from './chat.js';
import NeedArea from './needarea.js';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { ApolloProvider } from "react-apollo";
import { Query } from "react-apollo";

const client = new ApolloClient({
  uri: "https://rakshasa-game.herokuapp.com/v1alpha1/graphql"
});

class App extends Component {
    render() {
        return (
    <ApolloProvider client={client}>
      <div id="app">
        <div id="gamelayer">
          <div id="gamearea">
            <GameWorld />
            <ChatOverlay />
          </div>
          <NeedArea />
          <ChatBar />
        </div>
        <NotEnoughPlayers />
        <NameEntry />
      </div>
      <TestApollo />
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
