import React, { Component } from "react";
import "./normalize.css";
import "./App.css";
import "./nprogress.css";
import EventList from "./EventList/EventList";
import CitySearch from "./CitySearch/CitySearch";
import NumberOfEvents from "./NumberOfEvents/NumberOfEvents";
import WelcomeScreen from "./WelcomeScreen/WelcomeScreen";
import EventGenre from "./EventGenre/EventGenre"
import { OfflineAlert } from "./Alert";
import { getEvents, extractLocations, checkToken, getAccessToken } from "./api";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

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
    const accessToken = localStorage.getItem("access_token");
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

  getData = () => {
    const { locations, events } = this.state;
    const data = locations.map((location) => {
      const number = events.filter((event) => event.location === location)
        .length;
      const city = location.split(", ").shift();
      return { city, number };
    });
    return data;
  };

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    if (this.state.showWelcomeScreen === undefined)
      return <div className="App" />;
    const {locations, numberOfEvents, events} = this.state;
    return (
      <div className="App">
        <h1>Meet App</h1>
        <h2>Choose your nearest city</h2>
        <CitySearch
          locations={locations}
          updateEvents={this.updateEvents}
        />
        <h3>Number of Events:</h3>
        <NumberOfEvents
          numberOfEvents={numberOfEvents}
          updateNumberOfEvents={this.updateNumberOfEvents}
        />
        <div className="data-vis-wrapper">
          <EventGenre events={events} />
          <ResponsiveContainer height={400} >
            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
              <CartesianGrid />
              <XAxis type="category" dataKey="city" name="city" />
              <YAxis
                allowDecimals={false}
                type="number"
                dataKey="number"
                name="number of events"
              />
              <Tooltip cursor={{ strokeDasharray: "3 3" }} />
              <Scatter data={this.getData()} fill="#8884d8" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <OfflineAlert text={this.state.infoText} />
        <EventList events={events} />
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
