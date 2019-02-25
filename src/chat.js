import React, { Component } from 'react';
import gql from "graphql-tag";
import { Subscription } from "react-apollo";
import { Mutation } from "react-apollo";

const WATCH_CHAT = gql`
subscription talk {
    recentchat {
        id
        name
        contents
    }
}
`;

export class ChatOverlay extends Component {
    render() { // TODO this is fromm ChattyGame
      return(
            <Subscription subscription={WATCH_CHAT}>
             {({ loading, error, data }) => {
        	       if (loading) return <span>Loading...</span>;
        	       if (error) return <span>Error :</span>;
        	       return (
                        <div id="chatoverlay">
                            <ul>
                            { data.recentchat.map(({ id, name, contents }) => (
                                    <li key={id.toString()}>
                                      <span className="playername">{name}:</span>
                                      <span className="contents">{contents}</span>
                                    </li>
                                  ))
                            }
                            </ul>
                        </div>
                    );
        	}}
        	</Subscription>
        );
    }
}


const ADD_CHAT = gql`
mutation addchat($chat: chat_insert_input!) {
    insert_chat(objects: [$chat]) {
      returning {
        id
        time
      }
    }
}
`;

export class ChatBar extends Component {

    constructor(props) {
        super(props);

        this.state = {ischatting: false,
                        gamemove: props.gamemove};

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e, mutatefn){
        var code;

    	if (e.keyCode) code = e.keyCode;
    	else if (e.which) code = e.which;
    	var character = String.fromCharCode(code);
        console.log('Code was ' + code.toString());
    	console.log('Character was ' + character);

        if (this.state.ischatting && code === 13) { // enter key
            var contents = document.getElementById("chatbar").value;
            mutatefn({variables:
                {chat:
                    {   player: this.props.playerid,
                        contents: document.getElementById("chatbar").value
                    }
                }
            });
            e.preventDefault();
            document.getElementById("chatbar").value = "";
        } else if (!this.state.ischatting && character === "/") {
            this.setState({ischatting: true});
            document.getElementById("chatbar").value = "";
            e.preventDefault();
        } else if (this.state.ischatting && character === "/") {
            this.setState({ischatting: false});
            document.getElementById("chatbar").value = "";
            e.preventDefault();
        } else if (!this.state.ischatting) {
            if(this.state.gamemove !== undefined)
                this.state.gamemove(character);
            document.getElementById("chatbar").value = "";
            e.preventDefault();
        }
    }

    handleData(data) {
        document.getElementById("chatbar").value = "";
    }

    render() {
        return (
            <Mutation   mutation={ADD_CHAT}
                        onCompleted={this.handleData.bind(this)}>
            {(addchat, data) => {
                return(
                    <div id="chatbarbox">
                        <input id="chatbar" type="text"
                                onKeyPress={e => this.handleChange(e, addchat)}
                                className={this.state.ischatting ? "chatting" : "playing"}/>
                    </div>
                );
            }}
            </Mutation>
        );
    }
}

export default ChatOverlay;
