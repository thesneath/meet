import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList/EventList";
import CitySearch from "./CitySearch/CitySearch";
import NumberOfEvents from "./NumberOfEvents/NumberOfEvents";
import { OfflineAlert } from './Alert'
import { getEvents, extractLocations } from "./api";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 20,
    currentLocation: '',
    infoText: ''
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ 
          events: events, 
          locations: extractLocations(events),
          infoText: ''
         });
      } else if (!navigator.onLine) {
        this.setState({
          infoText: 'You are not connected to the internet. Some events may not be up to date.'
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
        infoText: ''
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
        <h1>Meet App</h1>
        <h2>Choose your nearest city</h2>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />
        <h3>Number of Events:</h3>
        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <OfflineAlert text={this.state.infoText} />
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
