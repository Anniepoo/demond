import React, { Component } from 'react';

class GameWorld extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            playerid: props.playerid
        };

        this.moveListener = this.moveListener.bind(this);

        props.addlistener(this.moveListener);
    }

    moveListener(key) {
        console.log('gameworld sees key ' + key);
    }

    render() {
        return (
            <div id="gameworld">
                <div id="board">
                    <p>&nbsp;</p>
                </div>
            </div>
        );
    }
}

export default GameWorld;
