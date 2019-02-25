import React, { Component } from 'react';
import GameWorld from './gameworld.js';
import ChatOverlay, { ChatBar } from './chat.js';
import NeedArea from './needarea.js';

class ChattyGame extends Component {
    constructor(props) {
        super(props);
        this.addListenMove = this.addListenMove.bind(this);
        this.gamemove = this.gamemove.bind(this);

        this.state = {
            moveListener: undefined
        }
    }

    addListenMove(func) {
        this.setState({moveListener: func});
    }

    gamemove(key) {
        const { moveListener } = this.state;
        if (moveListener) {
            moveListener(key);
        }
    }

    render() {
      return(
            <div id="maingame">
                <div id="gamearea">
                    <GameWorld playerid={this.props.playerid}
                        addlistener={this.addListenMove} />
                    <ChatOverlay playerid={this.props.playerid} />
                </div>
                <NeedArea />
                <ChatBar playerid={this.props.playerid}
                            gamemove={this.gamemove}/>
            </div>
        );
    }
}

export default ChattyGame;
