import React, { Component } from 'react';

export class ChatOverlay extends Component {
  render() {
      return (
              <div id="chatoverlay">
                <p>Chat Overlay</p>
              </div>
    );
  }
}

export class ChatBar extends Component {
  render() {
      return (
              <div id="chatbar">
                <p>Chat Bar</p>
              </div>
    );
  }
}

export default ChatOverlay;
