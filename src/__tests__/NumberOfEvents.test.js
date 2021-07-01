import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

  let NumberWrapper;
  
  beforeAll(() => {
    NumberWrapper = shallow(<NumberOfEvents />);
  })


  test('renders number input',() => {
    expect(NumberWrapper.find('.number')).toHaveLength(1);
  })

  test('renders number input correctly', () => {
    const number = NumberWrapper.state('numberOfEvents');
    expect(NumberWrapper.find('.number').prop('value')).toBe(number);
  })

  test('changes state when number input changes', () => {
    NumberWrapper.setState({ numberOfEvents: 32 });
    const eventObject = { target: { value: 1 }};
    NumberWrapper.find('.number').simulate('change', eventObject);
    expect(NumberWrapper.state('numberOfEvents')).toBe(1);
  })

  test('renders the correct number of events', () => {

  })

})
