import React from 'react';

import { SavingGoalProps as Props } from './types';

import './SavingGoal.scss';

const SavingGoal = (props: Props): JSX.Element => {
  const { icon: Icon, name } = props;

  return (
    <div className="SavingGoal">
      <form className="SavingGoal__form">
        <div className="SavingGoal__formHeader">
          <Icon className="SavingGoal__icon" />
          <div className="SavingGoal__formHeaderText">
            <h4 className="SavingGoal__formHeaderText--heading">{name}</h4>
            <p className="SavingGoal__formHeaderText--paragraph">Saving goal</p>
          </div>
        </div>
        <div className="SavingGoal__formInputs" />
        <div className="SavingGoal__formInfo">
          <section className="SavingGoal__formInfoAmount">
            <p className="SavingGoal__formInfoAmount--subtitle">
              Monthly amount
            </p>
            <h4 className="SavingGoal__formInfoAmount--heading">$521</h4>
          </section>
          <section className="SavingGoal__formInfoDeposits">
            <p className="SavingGoal__formInfoDeposits--caption">
              You&apos;re planning{' '}
              <span className="SavingGoal__formInfoDeposits--captionBold">
                48 monthly deposits{' '}
              </span>
              to reach your{' '}
              <span className="SavingGoal__formInfoDeposits--captionBold">
                $25,000{' '}
              </span>
              goal by{' '}
              <span className="SavingGoal__formInfoDeposits--captionBold">
                October 2020.
              </span>
            </p>
          </section>
        </div>
      </form>

      <button className="SavingGoal__submitButton" type="submit">
        Confirm
      </button>
    </div>
  );
};

export { SavingGoal };
