import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { add, format } from 'date-fns';

import DateInput from '../../src/components/DateInput';

const startDate = add(new Date(), { months: 1 });

const mountComponent = (startDate: Date) => {
  return mount(<DateInput startDate={startDate} />);
};

describe('DateInput', () => {
  it('renders', () => {
    const component = shallow(
      <DateInput startDate={add(new Date(), { months: 1 })} />
    );

    expect(component.exists()).toEqual(true);
  });

  it('left button must be disabled', () => {
    const component = mountComponent(startDate);
    const leftButton = component.find('button').at(0);

    expect(leftButton.props().disabled).toBe(true);
  });

  describe('increase month', () => {
    it('adds a month when right button is cliked', () => {
      const component = mountComponent(startDate);
      const rightButton = component.find('button').at(1);
      rightButton.simulate('click');
      const paragraph = component.find('.DateInput__date');

      expect(paragraph.text()).toBe(
        format(add(startDate, { months: 1 }), 'MMMMyyyy')
      );
    });

    it('adds a month when right arrow is pressed', () => {
      const component = mountComponent(startDate);

      const event = new KeyboardEvent('keydown', { key: 'ArrowRight' });
      document.dispatchEvent(event);

      const paragraph = component.find('.DateInput__date');

      expect(paragraph.text()).toBe(
        format(add(startDate, { months: 1 }), 'MMMMyyyy')
      );
    });
  });

  describe('decrease month', () => {
    it('subtract a month when left button is clicked', () => {
      const component = mountComponent(add(new Date(), { months: 2 }));
      const leftButton = component.find('button').at(0);
      leftButton.simulate('click');
      const paragraph = component.find('.DateInput__date');

      expect(paragraph.text()).toBe(format(startDate, 'MMMMyyyy'));
    });

    it('subtracts a month when left arrow is pressed', () => {
      const component = mountComponent(add(new Date(), { months: 2 }));

      const event = new KeyboardEvent('keydown', { key: 'ArrowLeft' });
      document.dispatchEvent(event);

      const paragraph = component.find('.DateInput__date');

      expect(paragraph.text()).toBe(format(startDate, 'MMMMyyyy'));
    });
  });
});
