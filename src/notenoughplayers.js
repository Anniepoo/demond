import React, { Component } from 'react';
import gql from "graphql-tag";
import { Subscription } from "react-apollo";


const WATCH_PLAYERS = gql`
subscription enuf {
  enough_players {
    root
  }
}
`;

class NotEnoughPlayers extends Component {
  render() {
      return(
            <Subscription subscription={WATCH_PLAYERS}>
             {({ loading, error, data }) => {
        	       if (loading) return <span>Loading...</span>;
        	       if (error) return <span>Error :</span>;
        	       return (
        		    <div id="notenoughplayers">
        		        <p>{data.enough_players.root.enough_players}</p>
        		    </div>);
        	}}
        	</Subscription>
        );
  }
}

export default NotEnoughPlayers;
