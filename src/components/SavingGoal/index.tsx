import React, { FormEvent, useEffect, useState } from 'react';
import { add, differenceInCalendarMonths, format } from 'date-fns';

import CurrencyInput from '~components/CurrencyInput';
import DateInput from '~components/DateInput';

import { SavingGoalProps as Props } from './types';

import './SavingGoal.scss';

const SavingGoal = (props: Props): JSX.Element => {
  const { icon: Icon, name } = props;

  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [amountNumber, setAmountNumber] = useState(0);
  const [amountString, setAmountString] = useState(amountNumber.toString());
  const [date, setDate] = useState(add(new Date(), { months: 1 }));

  const months = differenceInCalendarMonths(date, new Date());

  useEffect((): void => {
    setMonthlyAmount(amountNumber / months);
  }, [amountNumber, months]);

  let monthlyAmountString = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 2
  }).format(monthlyAmount);

  // ensuring when there is a decimal it always two numbers
  const [, decimal] = monthlyAmountString.split('.');
  if (decimal && decimal.length === 1) {
    monthlyAmountString = monthlyAmountString.padEnd(
      monthlyAmountString.length + 1,
      '0'
    );
  }

  return (
    <div className="SavingGoal">
      <header className="SavingGoal__header">
        <Icon className="SavingGoal__icon" />
        <div className="SavingGoal__headerText">
          <h4 className="SavingGoal__headerText--heading">{name}</h4>
          <p className="SavingGoal__headerText--paragraph">Saving goal</p>
        </div>
      </header>

      <main className="SavingGoal__main">
        <form
          className="SavingGoal__form"
          id="saving-goal"
          onSubmit={(e: FormEvent): void => e.preventDefault()}
        >
          <CurrencyInput
            onChange={(amountNumber: number, amountString: string): void => {
              setAmountNumber(amountNumber);
              setAmountString(amountString);
            }}
            startAmount={amountString}
          />
          <DateInput
            onChange={(value: Date): void => setDate(value)}
            startDate={date}
          />
        </form>

        <div className="SavingGoal__monthly">
          <section className="SavingGoal__monthlyAmount">
            <p className="SavingGoal__monthlyAmount--subtitle">
              Monthly amount
            </p>
            <h4 className="SavingGoal__monthlyAmount--heading">
              ${monthlyAmountString}
            </h4>
          </section>
          <section className="SavingGoal__monthlyDeposits">
            <p className="SavingGoal__monthlyDeposits--caption">
              You&apos;re planning{' '}
              <span className="SavingGoal__monthlyDeposits--captionBold">
                {months} monthly deposit{months > 1 && 's'}{' '}
              </span>
              to reach your{' '}
              <span className="SavingGoal__monthlyDeposits--captionBold">
                ${amountString}{' '}
              </span>
              goal by{' '}
              <span className="SavingGoal__monthlyDeposits--captionBold">
                {format(date, 'MMMM yyyy')}.
              </span>
            </p>
          </section>
        </div>
      </main>

      <button
        className="SavingGoal__submitButton"
        form="saving-goal"
        type="submit"
      >
        Confirm
      </button>
    </div>
  );
};

export default SavingGoal;
