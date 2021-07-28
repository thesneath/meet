import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../App';
import NumberOfEvents from '../NumberOfEvents/NumberOfEvents'
import { mockData } from '../mock-data';

const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => {
  test('When user hasn’t specified a number, 20 is the default number', ({ given, when, then }) => {
    given('user has not specified a number', () => {

    });
    let AppWrapper
    when('user opens the app', () => {
      AppWrapper = mount(<App />);
    });

    then(/^the default number of events is (\d+)$/, (arg0) => {
      expect(AppWrapper.state('numberOfEvents')).toEqual(20);
    });
  });

  test('User can change the number of events they want to see', ({ given, when, then }) => {
    let AppWrapper, NumberWrapper
    given('app is open', () => {
      AppWrapper = mount(<App />)
    });

    when('user specifies a number of events', async () => {
      NumberWrapper = (AppWrapper.find(NumberOfEvents));
      await NumberWrapper.find('.number').simulate('change', { target: { value: 1 }});
    });

    then('the number of events in the list matches the user defined number', () => {
      AppWrapper.update();
      expect(AppWrapper.state('events').length).toEqual(1);
    });
  });
});