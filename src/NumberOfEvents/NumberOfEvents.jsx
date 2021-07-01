import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  }

  handleChange = (event) => {
    const value = event.target.value;
    this.setState({
      numberOfEvents: value
    });
  }

  render() {
    return <input className="number" value={this.state.numberOfEvents} onChange={this.handleChange}/>
  }
}

export default NumberOfEvents