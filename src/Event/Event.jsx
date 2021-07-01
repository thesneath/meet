import React, { Component } from "react";
import { mockData } from "../mock-data";

class Event extends Component {
  state = {
    hidden: true,
  };

  handleShow = () => {
    this.setState({
      hidden: !this.state.hidden,
    });
  };

  render() {
    return (
      <div className="event">
        <div>{mockData.summary}</div>
        <div className="details">{mockData.description}</div>
        {this.state.hidden ? <div></div> : <div className="show-details">{mockData.location}</div>}
        <button className="button-details" onClick={() => this.handleShow()}>
          Show Details
        </button>
      </div>
    );
  }
}

export default Event;
