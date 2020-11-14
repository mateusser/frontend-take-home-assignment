import React, { FormEvent } from 'react';

import CurrencyInput from '~components/CurrencyInput';
import DateInput from '~components/DateInput';

import { SavingGoalProps as Props } from './types';

import './SavingGoal.scss';

const SavingGoal = (props: Props): JSX.Element => {
  const { icon: Icon, name } = props;

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
            onChange={(value: number): void => console.log(value)}
          />
          <DateInput />
        </form>
      </main>

      <footer className="SavingGoal__monthly">
        <section className="SavingGoal__monthlyAmount">
          <p className="SavingGoal__monthlyAmount--subtitle">Monthly amount</p>
          <h4 className="SavingGoal__monthlyAmount--heading">$521</h4>
        </section>
        <section className="SavingGoal__monthlyDeposits">
          <p className="SavingGoal__monthlyDeposits--caption">
            You&apos;re planning{' '}
            <span className="SavingGoal__monthlyDeposits--captionBold">
              48 monthly deposits{' '}
            </span>
            to reach your{' '}
            <span className="SavingGoal__monthlyDeposits--captionBold">
              $25,000{' '}
            </span>
            goal by{' '}
            <span className="SavingGoal__monthlyDeposits--captionBold">
              October 2020.
            </span>
          </p>
        </section>
      </footer>

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
