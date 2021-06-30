import React from 'react';
import './App.css';
import EventList from './EventList/EventList';
import CitySearch from './CitySearch/CitySearch';

function App() {
  return (
    <div className="App">
      <CitySearch />
      <EventList />
    </div>
  );
}

export default App;
