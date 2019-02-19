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
      this.state = {name: '', classhide: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
      this.setState({name: event.target.value});
  }

  render() {
    {({ loading, error, data }) => {
         if (loading){ return <p>Loading...</p>};
         if (error) return <p>Error 8c/</p>;
         console.log(data);

        const handleSubmit = (e) => {
            console.log('A name was submitted: ' + this.state.name);
            this.setState({classhide: 'dismissed'});
            e.preventDefault();
            mutate();
        }

        return (
                <Mutation mutation={ADD_NAME}
                          variables={{p: { name: this.state.name}} >

                    <div id="nameentry" className={this.state.classhide}
                        onSubmit={this.handleSubmit}>
                        <div className="dialogbox">
                             <form name="getname">
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
                </Mutation>
          );
     }
}

export default NameEntry;
