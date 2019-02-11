import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Game from './board.js';
import Character from './character.js';

class App extends Component {
  render() {
    return (
	    <Game />
	    <Character />
    );
  }
}

export default App;
