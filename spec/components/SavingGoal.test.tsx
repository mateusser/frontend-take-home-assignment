import * as React from 'react';
import { mount, shallow } from 'enzyme';
import SavingGoal from '../../src/components/SavingGoal';

describe('SavingGoal', () => {
  it('renders', () => {
    const component = shallow(<SavingGoal name="Buy a house" />);

    expect(component.exists()).toEqual(true);
  });

  it('calculates the correct value of monthly savings', () => {
    const component = mount(<SavingGoal name="Buy a house" />);
    const input = component.find('input');
    input.simulate('change', { target: { value: '800' } });
    const rightButton = component.find('button').at(1);
    rightButton.simulate('click');

    const calculatedValue = component.find(
      '.SavingGoal__monthlyAmount--heading'
    );

    expect(calculatedValue.text()).toMatch('$400');
  });

  describe('month count', () => {
    it('show by default 1 month', () => {
      const component = mount(<SavingGoal name="Buy a house" />);

      const calculatedValue = component
        .find('.SavingGoal__monthlyDeposits--captionBold')
        .at(0);

      expect(calculatedValue.text()).toMatch('1 monthly deposit');
    });

    it('increases the month count', () => {
      const component = mount(<SavingGoal name="Buy a house" />);
      const rightButton = component.find('button').at(1);
      rightButton.simulate('click');

      const calculatedValue = component
        .find('.SavingGoal__monthlyDeposits--captionBold')
        .at(0);

      expect(calculatedValue.text()).toMatch('2 monthly deposits');
    });
  });
});
