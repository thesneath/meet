import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents/NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

  let NumberWrapper;
  
  beforeAll(() => {
    NumberWrapper = shallow(<NumberOfEvents updateNumberOfEvents={() => {}} />);
  })

  test('renders number input',() => {
    expect(NumberWrapper.find('.number')).toHaveLength(1);
  })

})
