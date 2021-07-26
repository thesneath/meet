import React, { Component } from "react";

class NumberOfEvents extends Component {
  handleChange = (event) => {
    this.props.updateNumberOfEvents(event.target.value);
  };

  render() {
    return (
      <input
        className="number"
        value={this.props.numberOfEvents}
        onChange={this.handleChange}
      />
    );
  }
}

export default NumberOfEvents;
