import * as React from 'react';
import { mount, shallow } from 'enzyme';
import CurrencyInput from '../../src/components/CurrencyInput';

describe('CurrencyInput', () => {
  // no need for more tests since it uses an already tested component for mask
  it('renders', () => {
    const component = shallow(<CurrencyInput />);

    expect(component.exists()).toEqual(true);
  });

  it('call callback when input is given', () => {
    const mockFunction = jest.fn();
    const component = mount(<CurrencyInput onChange={mockFunction} />);
    const input = component.find('input');
    input.simulate('change', { target: { value: '1.00' } });

    expect(mockFunction).toHaveBeenCalled();
  });
});
