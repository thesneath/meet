import React, { Component } from "react";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList/EventList";
import CitySearch from "./CitySearch/CitySearch";
import NumberOfEvents from "./NumberOfEvents/NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen/WelcomeScreen";
import { OfflineAlert } from "./Alert";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 20,
    currentLocation: "",
    infoText: navigator.onLine
      ? ""
      : "You are not connected to the internet. Some events may not be up to date.",
    showWelcomeScreen: undefined,
  };

  async componentDidMount() {
    this.mounted = true;
    const accessToken = localStorage.getItem('access_token');
    const isTokenValid = (await checkToken(accessToken)).error ? false : true;
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");
    this.setState({ showWelcomeScreen: !(code || isTokenValid) });
    if ((code || isTokenValid) && this.mounted) {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({ events, locations: extractLocations(events) });
        }
      });
    }
  }

  updateEvents = (location, eventCount = null) => {
    let numberOfEvents = this.state.numberOfEvents || eventCount;
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events.slice(0, numberOfEvents)
          : events
              .filter((event) => event.location === location)
              .slice(0, numberOfEvents);
      if (this.mounted) {
        this.setState({
          events: locationEvents,
          currentLocation: location,
        });
      }
    });
  };

  updateNumberOfEvents = (number) => {
    let currentLocation = this.state.currentLocation || "all";
    this.setState({ numberOfEvents: number }, () => {
      this.updateEvents(currentLocation, number);
    });
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
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
        <WelcomeScreen
          showWelcomeScreen={this.state.showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      </div>
    );
  }
}

export default App;
