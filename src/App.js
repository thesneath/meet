import React from 'react';
import './App.css';
import EventList from './EventList/EventList';
import CitySearch from './CitySearch/CitySearch';
import NumberOfEvents from './NumberOfEvents/NumberOfEvents'

function App() {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
      <NumberOfEvents />
    </div>
  );
}

export default App;
