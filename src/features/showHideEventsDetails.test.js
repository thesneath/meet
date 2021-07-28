import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import Event from '../Event/Event'
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/showHideEventsDetails.feature');

defineFeature(feature, test => {

  test('An event element is collapsed by default', ({ given, when, then }) => {
    given('user has not opened element', () => {
  
    });

    let AppWrapper
    when('user opens app', () => {
      AppWrapper = mount(<App />)
    });

    then('event element is collapsed', () => {
      expect(AppWrapper.find('.event event__Details')).toHaveLength(0);
    });
  });

  test('User can expand an event to see its details', ({ given, and, when, then }) => {
    let EventWrapper
    given('main page is open', () => {
      EventWrapper = shallow(<Event event={mockData} />);
    });

    and('user has not expanded an element', () => {
      expect(EventWrapper.find('.event event__Details')).toHaveLength(0);
    });

    when('user clicks show details', () => {
      EventWrapper.find('.event button').simulate('click');
    });

    then('event element expands', () => {
      expect(EventWrapper.find('.event button')).toHaveLength(1)
    });
  });

  test('User can collapse an event to hide its details', ({ given, when, then }) => {
    let EventWrapper
    given('user has expanded event element', () => {
      EventWrapper = shallow(<Event event={mockData}/>)
      EventWrapper.find('.event button').simulate('click'); 
    });

    when('user clicks hide', () => {
      EventWrapper.find('.event button').simulate('click');
    });

    then('event element collapses', () => {
      expect(EventWrapper.find('.event event__Details')).toHaveLength(0);
    });
  });
});