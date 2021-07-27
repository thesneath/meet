import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import EventList from '../EventList/EventList';
import CitySearch from  '../CitySearch/CitySearch';
import NumberOfEvents from '../NumberOfEvents/NumberOfEvents';
import { mockData } from '../mock-data';
import { extractLocations, getEvents } from '../api';

describe('<App /> component', () => {

  let AppWrapper
  beforeAll(() => {
    AppWrapper = shallow(<App />);
  })

  test('render a list of events', () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test('render CitySearch', () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });

  test('render NumberOfEvents', () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  })

});

describe('<App /> integration', () => {
  
  test('App passes "events" state as prop to EventList', () => {
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state('events');
    expect(AppEventsState).not.toEqual(undefined);
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);
    AppWrapper.unmount();
  });

  test('App passes "locations" state as prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state('locations');
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(AppLocationsState);
    AppWrapper.unmount();
  });

  test('gets a list of events matching the city selected by the user', async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state('suggestions');
    const selectedIndex = Math.floor(Math.random() * (suggestions.length));
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(event => event.location === selectedCity);
    expect(AppWrapper.state('events')).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find('.suggestions li');
    await suggestionItems.at(suggestionItems.length - 1).simulate('click');
    const allEvents = await getEvents();
    expect(AppWrapper.state('events')).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('App numberOfEvents state is updated when input changes in NumberOfEvents', () => {
    const AppWrapper = mount(<App />);
    AppWrapper.setState({ numberOfEvents: 32 });
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
    NumberOfEventsWrapper.setState({ numberOfEvents: 32 });
    const eventObject = { target: { value: 12 }}
    NumberOfEventsWrapper.find('.number').simulate('change', eventObject);
    expect(AppWrapper.state('numberOfEvents')).toBe(12)
    AppWrapper.unmount();
  });

  // test('List of events displays the correct amount of events when input changes in NumberOfEvents', async () => {
  //   const AppWrapper = mount(<App />);
  //   const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);
  //   AppWrapper.setState({ numberOfEvents: 32 });
  //   const allEvents = await getEvents();
  //   const eventsToShow = allEvents.slice(0, 1)
  //   const eventObject = { target: { value: 1 }}
  //   NumberOfEventsWrapper.find('.number').simulate('change', eventObject);
  //   expect(AppWrapper.state('numberOfEvents')).toBe(1);
  //   expect(AppWrapper.state('events')).toEqual(eventsToShow);
  //   AppWrapper.unmount();
  // })
});