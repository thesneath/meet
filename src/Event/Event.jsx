import React, { Component } from "react";

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
        <h2>{this.props.event.summary}</h2>
        <p className="details">{this.props.event.location}</p>
        {this.state.hidden ? (
          <div></div>
        ) : (
          <p className="show-details">{this.props.event.description}</p>
        )}
        {this.state.hidden ? (
          <button className="details-btn" onClick={() => this.handleShow()}>
            Show Details
          </button>
        ) : (
          <button className="details-btn" onClick={() => this.handleShow()}>
            Hide Details
          </button>
        )}
      </div>
    );
  }
}

export default Event;
