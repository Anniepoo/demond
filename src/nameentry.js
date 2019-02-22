import React, { Component } from 'react';
import gql from "graphql-tag";
import { Mutation } from "react-apollo";


const ADD_NAME = gql`
mutation addOnePlayer($p: players_insert_input!) {
  insert_players(
    objects: [$p]
  ) {
    returning {
      id
    }
  }
}
`;

class NameEntry extends Component {
  constructor(props) {
    super(props);
      this.state = {name: '',
                    classhide: '',
                    playerid: undefined};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({name: event.target.value});
  }

  handleSubmit(e, mutatefn) {
	console.log('A name was submitted: ' + this.state.name);
	mutatefn();
	e.preventDefault();
  }

  handleData(data) {
    if(data == undefined) return;
    var newid = data["insert_players"].returning[0].id;
    this.setState({ playerid: newid,
                    classhide: 'dismissed'});
    this.forceUpdate();
  }

  render() {
    return (
      <Mutation mutation={ADD_NAME}
              variables={{p: { name: this.state.name}}}
              onCompleted={this.handleData.bind(this)}>
        {(addOnePlayer, data) => {
            return(
            <div>
                    { this.props.children }
                    <div id="nameentry" className={this.state.classhide}>
                        <div className="dialogbox">
                             <form name="getname"
            onSubmit={e => {
                this.handleSubmit(e, addOnePlayer);
            }}>
                                 <label htmlFor="name">Player Name</label>
                                 <input type="text" name="name"
                                        value={this.state.name}
                                        placeholder="Name"
                                        onChange={this.handleChange}/>
                                 <input type="submit" name="join"
                                        value="Join!" />
                             </form>
                        </div>
                    </div>

            </div>
        );
    }}
      </Mutation>
    );
  }
}

export default NameEntry;
