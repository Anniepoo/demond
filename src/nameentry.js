import React, { Component } from 'react';

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

  handleSubmit(event) {
      console.log('A name was submitted: ' + this.state.name);
      this.setState({classhide: 'dismissed'});
    event.preventDefault();
  }

  render() {
      return (
      <div id="nameentry" className={this.state.classhide}
           onSubmit={this.handleSubmit}>
        <div className="dialogbox">
          <form name="getname">
              <label htmlFor="name">Player Name</label>
              <input type="text" name="name" value={this.state.name}
                   placeholder="Name"
                   onChange={this.handleChange}/>
              <input type="submit" name="join" value="Join!" />
          </form>
        </div>
      </div>
    );
  }
}

export default NameEntry;
