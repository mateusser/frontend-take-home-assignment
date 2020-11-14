import React, { ChangeEvent, useState } from 'react';
import Input from 'react-currency-input';

import CurrencyIcon from '~/assets/icons/currency.svg';

import { CurrencyInputProps as Props } from './types';

import './CurrencyInput.scss';

const CurrencyInput = (props: Props): JSX.Element => {
  const [amount, setAmount] = useState('0.00');

  return (
    <label className="CurrencyInput">
      Total amount
      <Input
        className="CurrencyInput__input"
        autoFocus
        onChangeEvent={(
          _event: ChangeEvent<HTMLInputElement>,
          maskedValue: string,
          floatValue: number
        ): void => {
          setAmount(maskedValue);
          props.onChange(floatValue);
        }}
        value={amount}
      />
      <CurrencyIcon className="CurrencyInput__icon" />
    </label>
  );
};

export default CurrencyInput;
