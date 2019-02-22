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
        console.log(e);
        console.log(e.key);
        console.log(e.keyCode);
        const key = e.key;
        var code;
        	if (e.keyCode) code = e.keyCode;
        	else if (e.which) code = e.which;
        	var character = String.fromCharCode(code);
            console.log('Code was ' + code.toString());
        	console.log('Character was ' + character);
            // return 13
    }

    render() {
        return (
            <Mutation mutation={ADD_CHAT}>
            {(addchat, data) => {
                return(
                    <div id="chatbar">
                        <input type="text" onKeyPress={e => this.handleChange(e, addchat)} />
                    </div>
                );
            }}
            </Mutation>
        );
    }
}

export default ChatOverlay;
