const numberToCurrencyString = (value: number) => {
  let currencyString = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
  }).format(value);

  // ensuring when there is a decimal it always two numbers
  const [, decimal] = currencyString.split('.');
  if (decimal && decimal.length === 1) {
    currencyString = currencyString.padEnd(currencyString.length + 1, '0');
  }

  return currencyString;
};

export { numberToCurrencyString };
