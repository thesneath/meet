import React, { Component } from "react";
import { ErrorAlert } from '../Alert';

class NumberOfEvents extends Component {
  state = {
    errorText: ''
  }

  handleChange = (event) => {
    this.props.updateNumberOfEvents(event.target.value);
    if(event.target.value < 0 || isNaN(event.target.value)) {
      this.setState({
        errorText: 'Invalid entry. Please choose a number of events to display.'
      })
    } else{
    this.setState({ errorText: '' })
    };
  };

  render() {
    return (
      <>
        <input
          className="number"
          value={this.props.numberOfEvents}
          onChange={this.handleChange}
        />
        <ErrorAlert text={this.state.errorText}/>
      </>
    );
  }
}

export default NumberOfEvents;
