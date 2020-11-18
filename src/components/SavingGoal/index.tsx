import React, { FormEvent, useEffect, useState } from 'react';
import { add, differenceInCalendarMonths, format } from 'date-fns';

// COMPONENTS
import CurrencyInput from '~components/CurrencyInput';
import DateInput from '~components/DateInput';

// HELPERS
import { numberToCurrencyString } from '~/helpers';

// TYPES
import { SavingGoalProps as Props } from './types';

// STYLES
import './SavingGoal.scss';

const SavingGoal = (props: Props): JSX.Element => {
  const { icon: Icon, name } = props;

  const [monthlyAmount, setMonthlyAmount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState(add(new Date(), { months: 1 }));

  const months = differenceInCalendarMonths(date, new Date());

  useEffect((): void => {
    setMonthlyAmount(amount / months);
  }, [amount, months]);

  return (
    <div className="SavingGoal">
      <header className="SavingGoal__header">
        {Icon && <Icon className="SavingGoal__icon" />}
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
            onChange={(amount: number): void => {
              setAmount(amount);
            }}
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
              ${numberToCurrencyString(monthlyAmount)}
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
                ${numberToCurrencyString(amount)}{' '}
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
