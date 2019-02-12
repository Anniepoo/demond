import React, { Component } from 'react';
import './App.css';
import NameEntry from './nameentry.js';
import NotEnoughPlayers from './notenoughplayers.js';
import GameWorld from './gameworld.js';
import ChatOverlay, { ChatBar } from './chat.js';
import NeedArea from './needarea.js';

class App extends Component {
    render() {
      return (
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
    );
  }
}

export default App;
