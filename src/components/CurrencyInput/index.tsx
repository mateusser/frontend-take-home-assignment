import React, { ChangeEvent, useState } from 'react';
import MaskedInput from 'react-text-mask';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

import CurrencyIcon from '~/assets/icons/currency.svg';

import { CurrencyInputProps as Props } from './types';

import './CurrencyInput.scss';

const CurrencyInput = (props: Props): JSX.Element => {
  const [amount, setAmount] = useState('');
  const currencyMask = createNumberMask({
    allowDecimal: true,
    allowLeadingZeroes: false,
    allowNegative: false,
    decimalLimit: 2,
    decimalSymbol: '.',
    includeThousandsSeparator: true,
    inputMode: 'decimal',
    integerLimit: 8,
    prefix: '',
    thousandsSeparatorSymbol: ','
  });

  return (
    <label className="CurrencyInput">
      Total amount
      <MaskedInput
        autoFocus
        className="CurrencyInput__input"
        mask={currencyMask}
        onChange={(event: ChangeEvent<HTMLInputElement>): void => {
          const stringValue = event.target.value;
          setAmount(stringValue);

          const floatValue = parseFloat(stringValue.replace(/,/gi, '')) || 0;
          props.onChange && props.onChange(floatValue);
        }}
        onFocus={() => {
          // no padding left, so the user can start typing without deleting the zero
          if (amount === '0') {
            setAmount('');
          }
        }}
        type="tel" // workaround since type="number" has a known issue
        // https://github.com/text-mask/text-mask/blob/master/componentDocumentation.md#supported-input-types
        value={amount}
      />
      <CurrencyIcon className="CurrencyInput__icon" />
    </label>
  );
};

export default CurrencyInput;
