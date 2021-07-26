import React, { Component } from "react";
import "./App.css";
import "./nprogress.css"
import EventList from "./EventList/EventList";
import CitySearch from "./CitySearch/CitySearch";
import NumberOfEvents from "./NumberOfEvents/NumberOfEvents";
import { getEvents, extractLocations } from "./api";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 20
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
      this.setState({ 
        events: events.slice(0, this.state.numberOfEvents), 
        locations: extractLocations(events),
      });
      }
    });
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events.slice(0, this.state.numberOfEvents)
          : events.filter((event) => event.location === location).slice(0, this.state.numberOfEvents);
      this.setState({
        events: locationEvents
      });
    });
  };

  updateNumberOfEvents = (input) => {
    this.setState({ numberOfEvents: input});
  };

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <NumberOfEvents updateNumberOfEvents={this.updateNumberOfEvents} />
      </div>
    );
  }
}

export default App;
