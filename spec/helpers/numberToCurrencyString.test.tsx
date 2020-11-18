import { numberToCurrencyString } from '../../src/helpers';

describe('numberToCurrencyString', () => {
  it('return a string when given a number', () => {
    const response = numberToCurrencyString(123);

    expect(response).toMatch('123');
  });

  describe('when number is bigger than 1000', () => {
    it('return a string with proper commas', () => {
      const response = numberToCurrencyString(1234567);

      expect(response).toMatch('1,234,567');
    });
  });

  describe('when number is decimal', () => {
    it('return a string with pad right 2', () => {
      const response = numberToCurrencyString(1.2);

      expect(response).toMatch('1.20');
    });
  });
});
