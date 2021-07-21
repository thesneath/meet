import React from 'react';
import { shallow } from 'enzyme';
import { mockData } from '../mock-data';
import Event from '../Event/Event';

describe('<Event /> component', () => {
  
  let EventWrapper;

  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData}/>);
  })

  beforeEach(() => {
    EventWrapper.setState({ hidden: true })
  })

  test('renders an event', () => {
    expect(EventWrapper.find('.event')).toHaveLength(1);
  })

  test('renders event information', () => {
    expect(EventWrapper.find('.details')).toHaveLength(1);
  })

  test('renders a show details button', () => {
    expect(EventWrapper.find('.event button')).toHaveLength(1);
  })

  test('details button changes state of hidden from true to false', () => {
    EventWrapper.setState({ hidden: true });
    EventWrapper.find('.event button').simulate('click');
    expect(EventWrapper.state('hidden')).toBe(false);
  })

  test('details button changes state of hidden from false to true', () => {
    EventWrapper.setState({ hidden: false });
    EventWrapper.find('.event button').simulate('click');
    expect(EventWrapper.state('hidden')).toBe(true);
  })

  test('clicking show details actually shows details', () => {
    EventWrapper.setState({ hidden: true })
    EventWrapper.find('.event button').simulate('click');
    expect(EventWrapper.find('.details')).toHaveLength(1);
  })

  test('nothing displayed if hidden state is true', () => {
    EventWrapper.setState({ hidden: true });
    expect(EventWrapper.find('.show-details')).toHaveLength(0);
  })

})