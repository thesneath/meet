import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList/EventList";
import CitySearch from "./CitySearch/CitySearch";
import NumberOfEvents from "./NumberOfEvents/NumberOfEvents";
import { getEvents, extractLocations } from "./api";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 20,
    currentLocation: '',
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events, 
          locations: extractLocations(events),
         });
      }
    });
  }

  updateEvents = (location, eventCount = null) => {
    let numberOfEvents = this.state.numberOfEvents || eventCount;
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events.slice(0, numberOfEvents)
          : events.filter((event) => event.location === location).slice(0, numberOfEvents);
      if(this.mounted) {
        this.setState({
        events: locationEvents,
        currentLocation: location,
      });
    }});
  };

  updateNumberOfEvents = (number) => {
    let currentLocation = this.state.currentLocation || 'all'
    this.setState({ numberOfEvents: number }, () => {
      this.updateEvents(currentLocation, number);
    });
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className="App">
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <EventList events={this.state.events} />
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
      </div>
    );
  }
}

export default App;
